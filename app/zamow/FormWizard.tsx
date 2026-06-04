"use client";

import { useState, useRef } from "react";

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 1200;
      let w = img.width, h = img.height;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
        else { w = Math.round(w * MAX / h); h = MAX; }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.75).split(",")[1]);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("load")); };
    img.src = url;
  });
}

const DOC_TYPES = [
  {
    id: "sklep",
    label: "Reklamacja do sklepu internetowego",
    desc: "Produkt nie dotarł, uszkodzony, niezgodny z opisem, odmowa zwrotu",
    subjectLabel: "Nazwa produktu",
    subjectPlaceholder: "np. Słuchawki Sony WH-1000XM5",
    kwotaLabel: "Cena (zł)",
    kwotaPlaceholder: "1299",
    dataLabel: "Data zakupu",
    refLabel: "Numer zamówienia",
    refPlaceholder: "np. TS/2026/05/44821",
    orgLabel: "Nazwa sklepu",
    orgPlaceholder: "np. TechShop Sp. z o.o. / Allegro.pl",
    orgAdresLabel: "Adres sklepu",
    orgAdresHint: "Opcjonalnie — znajdziesz w regulaminie lub stopce strony",
    opisPlaceholder: "Opisz dokładnie co się wydarzyło — kiedy zamówiłeś, co poszło nie tak, jak zareagował sklep...",
    podjeteLabel: "Co już próbowałeś?",
    podjetePlaceholder: "np. Kontaktowałem się przez czat 3 razy, sklep nie odpowiada...",
    zadaniePlaceholder: "np. Zwrotu 1299 zł / Wymiany na nowy produkt",
    summaryOrg: "Sklep",
    summarySubject: "Produkt",
  },
  {
    id: "bank",
    label: "Reklamacja do banku / ubezpieczyciela",
    desc: "Nieautoryzowana transakcja, odmowa wypłaty, błędna opłata",
    subjectLabel: "Produkt / usługa",
    subjectPlaceholder: "np. Karta kredytowa, polisa NNW, konto oszczędnościowe",
    kwotaLabel: "Kwota sporu (zł)",
    kwotaPlaceholder: "500",
    dataLabel: "Data zdarzenia",
    refLabel: "Numer umowy / rachunku",
    refPlaceholder: "Opcjonalnie",
    orgLabel: "Nazwa banku / ubezpieczyciela",
    orgPlaceholder: "np. PKO BP S.A.",
    orgAdresLabel: "Adres banku / ubezpieczyciela",
    orgAdresHint: "Opcjonalnie",
    opisPlaceholder: "Opisz dokładnie co się stało — data, kwota, co bank odmówił i dlaczego...",
    podjeteLabel: "Kontakt z bankiem",
    podjetePlaceholder: "np. Dzwoniłem na infolinię, odpisali że sprawa zamknięta...",
    zadaniePlaceholder: "np. Zwrotu 500 zł za nieautoryzowaną transakcję",
    summaryOrg: "Bank / ubezpieczyciel",
    summarySubject: "Usługa",
  },
  {
    id: "zus",
    label: "Odwołanie od decyzji ZUS / US",
    desc: "Odmowa świadczenia, zawyżona składka, decyzja podatkowa",
    subjectLabel: "Czego dotyczy decyzja",
    subjectPlaceholder: "np. Odmowa zasiłku chorobowego",
    kwotaLabel: "Kwota sporu (zł)",
    kwotaPlaceholder: "Opcjonalnie",
    dataLabel: "Data decyzji",
    refLabel: "Numer decyzji",
    refPlaceholder: "np. ZUS/2026/05/12345",
    orgLabel: "Nazwa organu",
    orgPlaceholder: "np. ZUS Oddział w Warszawie, Urząd Skarbowy",
    orgAdresLabel: "Adres organu",
    orgAdresHint: "Opcjonalnie",
    opisPlaceholder: "Opisz decyzję — jakie świadczenie odmówiono, z jakiego powodu według organu...",
    podjeteLabel: "Wcześniejsze kroki",
    podjetePlaceholder: "np. Złożyłem wniosek 3 maja, decyzja odmowna z 20 maja...",
    zadaniePlaceholder: "np. Uchylenia decyzji i przyznania zasiłku chorobowego za okres...",
    summaryOrg: "Organ",
    summarySubject: "Przedmiot odwołania",
  },
  {
    id: "umowa",
    label: "Wypowiedzenie umowy",
    desc: "Internet, gym, prąd, telefon — bez kar umownych",
    subjectLabel: "Typ umowy",
    subjectPlaceholder: "np. Umowa o internet światłowodowy, karnety na siłownię",
    kwotaLabel: "Miesięczna opłata (zł)",
    kwotaPlaceholder: "89",
    dataLabel: "Data zawarcia umowy",
    refLabel: "Numer umowy",
    refPlaceholder: "Opcjonalnie",
    orgLabel: "Nazwa firmy",
    orgPlaceholder: "np. Orange Polska S.A.",
    orgAdresLabel: "Adres firmy",
    orgAdresHint: "Opcjonalnie",
    opisPlaceholder: "Opisz umowę — na jaki czas zawarta, czy minął okres wypowiedzenia, dlaczego wypowiadasz...",
    podjeteLabel: "Kontakt z firmą",
    podjetePlaceholder: "np. Dzwoniłem na infolinię, zastraszali karą umowną...",
    zadaniePlaceholder: "np. Rozwiązania umowy bez opłat dodatkowych z dniem...",
    summaryOrg: "Firma",
    summarySubject: "Umowa",
  },
  {
    id: "uokik",
    label: "Skarga do UOKiK / Rzecznika Praw Konsumentów",
    desc: "Gdy sklep nie odpowiada na reklamację, nieuczciwe praktyki",
    subjectLabel: "Przedmiot skargi",
    subjectPlaceholder: "np. Sklep ignoruje reklamację od 2 miesięcy",
    kwotaLabel: "Wartość sporu (zł)",
    kwotaPlaceholder: "1299",
    dataLabel: "Data wysłania reklamacji do firmy",
    refLabel: "Numer poprzedniej reklamacji",
    refPlaceholder: "Opcjonalnie",
    orgLabel: "Firma której dotyczy skarga",
    orgPlaceholder: "np. TechShop Sp. z o.o.",
    orgAdresLabel: "Adres firmy",
    orgAdresHint: "Opcjonalnie",
    opisPlaceholder: "Opisz co się stało — kiedy wysłałeś reklamację do sklepu, jak reagował, co próbowałeś...",
    podjeteLabel: "Historia kontaktu z firmą",
    podjetePlaceholder: "np. Wysłałem reklamację 1 maja, sklep milczy; ponowiłem 15 maja...",
    zadaniePlaceholder: "np. Wszczęcia postępowania i nakazania zwrotu 1299 zł",
    summaryOrg: "Firma",
    summarySubject: "Przedmiot skargi",
  },
] as const;

type DocTypeId = typeof DOC_TYPES[number]["id"];

type FormData = {
  produkt: string;
  cena: string;
  data_zakupu: string;
  numer_zamowienia: string;
  opis: string;
  podjete_kroki: string;
  zadanie: string;
  imie_nazwisko: string;
  adres: string;
  email: string;
  nazwa_sklepu: string;
  adres_sklepu: string;
};

const EMPTY: FormData = {
  produkt: "", cena: "", data_zakupu: "", numer_zamowienia: "",
  opis: "", podjete_kroki: "", zadanie: "",
  imie_nazwisko: "", adres: "", email: "",
  nazwa_sklepu: "", adres_sklepu: "",
};

const STEPS = ["Typ pisma", "Co się stało", "Twoje dane", "Płatność"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-start">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-start flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? "bg-indigo-600 text-white"
                  : i === step ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                  : "bg-gray-100 text-gray-400"
              }`}>
                {i < step ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-xs mt-2 whitespace-nowrap font-medium ${
                i === step ? "text-gray-900" : i < step ? "text-indigo-600" : "text-gray-400"
              }`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mt-4 mx-2 transition-colors ${i < step ? "bg-indigo-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const inputCls = "w-full border border-gray-300 rounded-lg px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white";
const textareaCls = inputCls + " resize-none";

function Field({ label, required, hint, error, children }: {
  label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-500 mt-1.5">{hint}</p>}
      {error && <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>}
    </div>
  );
}

export function FormWizard() {
  const [step, setStep] = useState(0);
  const [docType, setDocType] = useState<DocTypeId | null>(null);
  const [data, setData] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageExtracted, setImageExtracted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const type = DOC_TYPES.find(t => t.id === docType) ?? DOC_TYPES[0];

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [field]: e.target.value }));

  function validateStep2() {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.produkt.trim()) e.produkt = "To pole jest wymagane";
    if (!data.cena.trim() && docType !== "zus") e.cena = "Wpisz kwotę";
    if (!data.data_zakupu) e.data_zakupu = "Wybierz datę";
    if (!data.opis.trim()) e.opis = "Opisz sytuację";
    if (!data.zadanie.trim()) e.zadanie = "Wpisz czego żądasz";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3() {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.imie_nazwisko.trim()) e.imie_nazwisko = "Wpisz imię i nazwisko";
    if (!data.adres.trim()) e.adres = "Wpisz adres zamieszkania";
    if (!data.email.trim()) e.email = "Wpisz adres email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Nieprawidłowy adres email";
    if (!data.nazwa_sklepu.trim()) e.nazwa_sklepu = "To pole jest wymagane";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePay() {
    if (!validateStep3()) return;
    if (!consent) { setConsentError(true); return; }
    setConsentError(false);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, doc_type: docType, image_base64: imageBase64 }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      if (json.url) window.location.href = json.url;
      else throw new Error();
    } catch {
      alert("Coś poszło nie tak. Spróbuj ponownie lub napisz na hello@writeback.pl");
    } finally {
      setLoading(false);
    }
  }

  async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileInputRef.current) fileInputRef.current.value = "";
    setImageLoading(true);
    setImageExtracted(false);
    try {
      const b64 = await compressImage(file);
      setImageBase64(b64);
      setImagePreview("data:image/jpeg;base64," + b64);
      const res = await fetch("/api/extract-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_base64: b64, doc_type: docType }),
      });
      if (res.ok) {
        const ex = await res.json();
        setData(prev => ({
          ...prev,
          ...(ex.produkt && !prev.produkt ? { produkt: String(ex.produkt).slice(0, 100) } : {}),
          ...(ex.cena && !prev.cena ? { cena: String(ex.cena) } : {}),
          ...(ex.data_zakupu && !prev.data_zakupu ? { data_zakupu: ex.data_zakupu } : {}),
          ...(ex.numer_zamowienia && !prev.numer_zamowienia ? { numer_zamowienia: String(ex.numer_zamowienia) } : {}),
          ...(ex.nazwa_sklepu && !prev.nazwa_sklepu ? { nazwa_sklepu: String(ex.nazwa_sklepu) } : {}),
          ...(ex.adres_sklepu && !prev.adres_sklepu ? { adres_sklepu: String(ex.adres_sklepu) } : {}),
          ...(ex.opis_extra && !prev.opis ? { opis: String(ex.opis_extra) } : {}),
        }));
        setImageExtracted(true);
      }
    } catch {
      // obraz zapisany, bez auto-uzupełnienia
    } finally {
      setImageLoading(false);
    }
  }

  function selectType(id: DocTypeId) {
    setDocType(id);
    setData(EMPTY);
    setErrors({});
    setImageBase64(null);
    setImagePreview(null);
    setImageExtracted(false);
    setStep(1);
  }

  return (
    <div>
      <ProgressBar step={step} />

      {/* Krok 0 — Typ pisma */}
      {step === 0 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Jaki masz problem?</h1>
          <p className="text-gray-600 text-sm mb-8">Wybierz typ pisma które chcesz napisać</p>
          <div className="space-y-3">
            {DOC_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => selectType(t.id)}
                className="w-full text-left border-2 border-transparent bg-gray-50 hover:border-indigo-600 hover:bg-indigo-50 rounded-xl px-5 py-4 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 ml-4 text-gray-400 group-hover:text-indigo-600 transition-colors">
                    <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Krok 1 — Co się stało */}
      {step === 1 && (
        <div>
          <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-indigo-100">
            {type.label}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Co się stało?</h1>
          <p className="text-gray-600 text-sm mb-8">Im więcej szczegółów, tym mocniejsze pismo</p>
          <div className="space-y-5">
            {/* Upload zdjęcia */}
            <div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-sm font-semibold text-gray-800">Dołącz zdjęcie dokumentu</span>
                <span className="text-xs text-gray-400">opcjonalnie · uzupełnimy dane automatycznie</span>
              </div>
              {!imagePreview ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageLoading}
                  className="w-full border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-xl py-5 text-center transition-colors disabled:opacity-60 group"
                >
                  <svg className="w-6 h-6 mx-auto mb-1.5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-sm text-gray-500 font-medium group-hover:text-indigo-700 transition-colors">Paragon, faktura, email z zamówieniem</div>
                  <div className="text-xs text-gray-400 mt-0.5">JPG, PNG, PDF — max 10 MB</div>
                </button>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <img src={imagePreview} alt="Podgląd" className="w-14 h-14 object-cover rounded-lg shrink-0 border border-gray-200" />
                  <div className="flex-1 min-w-0">
                    {imageLoading ? (
                      <div className="flex items-center gap-2 text-sm text-indigo-700 font-medium">
                        <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Analizuję dokument...
                      </div>
                    ) : imageExtracted ? (
                      <div className="flex items-center gap-1.5 text-sm text-green-700 font-semibold">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Dane uzupełnione ze zdjęcia
                      </div>
                    ) : (
                      <div className="text-sm text-gray-700 font-medium">Zdjęcie dodane</div>
                    )}
                    <button
                      type="button"
                      onClick={() => { setImageBase64(null); setImagePreview(null); setImageExtracted(false); }}
                      className="text-xs text-gray-400 hover:text-red-500 mt-1 transition-colors"
                    >
                      Usuń zdjęcie
                    </button>
                  </div>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={onImageChange} />
            </div>

            <Field label={type.subjectLabel} required error={errors.produkt}>
              <input className={inputCls} placeholder={type.subjectPlaceholder} value={data.produkt} onChange={set("produkt")} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label={type.kwotaLabel} required={docType !== "zus"} error={errors.cena}>
                <input className={inputCls} placeholder={type.kwotaPlaceholder} type={docType !== "zus" ? "number" : "text"} min="0" value={data.cena} onChange={set("cena")} />
              </Field>
              <Field label={type.dataLabel} required error={errors.data_zakupu}>
                <input className={`${inputCls} ${errors.data_zakupu ? "border-red-400 ring-1 ring-red-300" : ""}`} type="date" value={data.data_zakupu} onChange={set("data_zakupu")} />
              </Field>
            </div>
            <Field label={type.refLabel} hint="Opcjonalnie">
              <input className={inputCls} placeholder={type.refPlaceholder} value={data.numer_zamowienia} onChange={set("numer_zamowienia")} />
            </Field>
            <Field label="Co się stało?" required error={errors.opis}>
              <textarea className={textareaCls} rows={4} placeholder={type.opisPlaceholder} value={data.opis} onChange={set("opis")} />
            </Field>
            <Field label={type.podjeteLabel} hint="Opcjonalnie">
              <textarea className={textareaCls} rows={2} placeholder={type.podjetePlaceholder} value={data.podjete_kroki} onChange={set("podjete_kroki")} />
            </Field>
            <Field label="Czego żądasz?" required error={errors.zadanie}>
              <input className={inputCls} placeholder={type.zadaniePlaceholder} value={data.zadanie} onChange={set("zadanie")} />
            </Field>
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep(0)} className="px-5 py-3 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              ← Wróć
            </button>
            <button
              onClick={() => { if (validateStep2()) setStep(2); }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Dalej →
            </button>
          </div>
        </div>
      )}

      {/* Krok 2 — Dane */}
      {step === 2 && (
        <div>
          <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-indigo-100">
            {type.label}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Twoje dane i dane adresata</h1>
          <p className="text-gray-600 text-sm mb-8">Potrzebujemy ich żeby wygenerować pismo</p>
          <div className="space-y-5">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-4">Twoje dane</h3>
              <div className="space-y-4">
                <Field label="Imię i nazwisko" required error={errors.imie_nazwisko}>
                  <input className={inputCls} placeholder="Anna Kowalska" value={data.imie_nazwisko} onChange={set("imie_nazwisko")} />
                </Field>
                <Field label="Adres zamieszkania" required error={errors.adres} hint="Ulica i numer, kod pocztowy, miasto">
                  <input className={inputCls} placeholder="ul. Kwiatowa 5/12, 00-001 Warszawa" value={data.adres} onChange={set("adres")} />
                </Field>
                <Field label="Adres email" required error={errors.email} hint="Na ten adres wyślemy PDF z pismem">
                  <input className={inputCls} type="email" placeholder="anna@example.com" value={data.email} onChange={set("email")} />
                </Field>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">Dane adresata</h3>
              <div className="space-y-4">
                <Field label={type.orgLabel} required error={errors.nazwa_sklepu}>
                  <input className={inputCls} placeholder={type.orgPlaceholder} value={data.nazwa_sklepu} onChange={set("nazwa_sklepu")} />
                </Field>
                <Field label={type.orgAdresLabel} hint={type.orgAdresHint}>
                  <input className={inputCls} placeholder="ul. Przykładowa 1, 00-001 Warszawa" value={data.adres_sklepu} onChange={set("adres_sklepu")} />
                </Field>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep(1)} className="px-5 py-3 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              ← Wróć
            </button>
            <button
              onClick={() => { if (validateStep3()) setStep(3); }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Sprawdź zamówienie →
            </button>
          </div>
        </div>
      )}

      {/* Krok 3 — Podsumowanie */}
      {step === 3 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Podsumowanie zamówienia</h1>
          <p className="text-gray-600 text-sm mb-8">Sprawdź dane i opłać — PDF dostaniesz na maila od razu</p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6 divide-y divide-gray-100">
            <div className="px-5 py-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Typ pisma</div>
              <div className="text-sm font-semibold text-gray-900">{type.label}</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{type.summarySubject} · {type.summaryOrg}</div>
              <div className="text-sm text-gray-900">{data.produkt}</div>
              <div className="text-xs text-gray-500 mt-0.5">{data.nazwa_sklepu}{data.cena ? ` · ${data.cena} zł` : ""}</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Żądanie</div>
              <div className="text-sm text-gray-900">{data.zadanie}</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">PDF wyślemy na</div>
              <div className="text-sm font-semibold text-gray-900">{data.email}</div>
            </div>
            <div className="px-5 py-4 bg-gray-50 flex items-center justify-between">
              <div className="font-bold text-gray-900">Do zapłaty</div>
              <div className="text-2xl font-bold text-gray-900">29 zł</div>
            </div>
          </div>

          <label className={`flex items-start gap-3 mb-5 cursor-pointer p-3 rounded-xl border transition-colors ${consentError ? "border-red-300 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`}>
            <input
              type="checkbox"
              checked={consent}
              onChange={e => { setConsent(e.target.checked); setConsentError(false); }}
              className="mt-0.5 shrink-0 w-4 h-4 accent-indigo-600"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              Akceptuję{" "}
              <a href="/regulamin" target="_blank" className="text-indigo-600 underline underline-offset-2">Regulamin</a>
              {" "}i{" "}
              <a href="/polityka" target="_blank" className="text-indigo-600 underline underline-offset-2">Politykę prywatności</a>
              . Wyrażam zgodę na natychmiastowe dostarczenie treści cyfrowej i jestem świadomy/a, że z chwilą dostarczenia pisma tracę prawo odstąpienia od umowy zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta.
            </span>
          </label>
          {consentError && <p className="text-xs text-red-500 font-medium -mt-3 mb-4">Musisz zaakceptować regulamin przed opłaceniem</p>}

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-base transition-colors shadow-lg shadow-indigo-200"
          >
            {loading ? "Przekierowuję do płatności..." : "Opłać i pobierz pismo — 29 zł"}
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">
            Bezpieczna płatność przez Stripe · BLIK · Karta · Przelewy24
          </p>
          <button onClick={() => setStep(2)} className="w-full text-center text-sm text-gray-500 hover:text-gray-900 transition-colors mt-4">
            ← Popraw dane
          </button>
        </div>
      )}
    </div>
  );
}
