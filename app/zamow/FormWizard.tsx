"use client";

import { useState, useRef, useEffect } from "react";

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
  {
    id: "skarga",
    label: "Skarga konsumencka",
    desc: "Kurier, internet, energia, telefon, inne — firma nie reaguje",
    subjectLabel: "Czego dotyczy",
    subjectPlaceholder: "np. Zagubiona paczka / awaria internetu / zawyżony rachunek",
    kwotaLabel: "Wartość sporu (zł)",
    kwotaPlaceholder: "500",
    dataLabel: "Data zdarzenia",
    refLabel: "Numer referencyjny / umowy / przesyłki",
    refPlaceholder: "Opcjonalnie",
    orgLabel: "Firma / instytucja",
    orgPlaceholder: "np. InPost Sp. z o.o. / Orange Polska S.A.",
    orgAdresLabel: "Adres firmy",
    orgAdresHint: "Opcjonalnie",
    opisPlaceholder: "Opisz dokładnie co się stało...",
    podjeteLabel: "Kontakt z firmą",
    podjetePlaceholder: "np. Dzwoniłem na infolinię, odpisali że sprawa w trakcie...",
    zadaniePlaceholder: "np. Odszkodowania / zwrotu pieniędzy / usunięcia awarii",
    summaryOrg: "Firma",
    summarySubject: "Przedmiot skargi",
  },
] as const;

type SkargaSubtype = "kurier" | "telecom" | "energia" | "inne";

const SKARGA_SUBTYPES: Record<SkargaSubtype, {
  label: string;
  icon: React.ReactNode;
  fields: {
    subjectLabel: string; subjectPlaceholder: string;
    kwotaLabel: string; kwotaPlaceholder: string;
    dataLabel: string; refLabel: string; refPlaceholder: string;
    orgLabel: string; orgPlaceholder: string;
    opisPlaceholder: string; podjetePlaceholder: string; zadaniePlaceholder: string;
  };
}> = {
  kurier: {
    label: "Kurier / dostawa",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    fields: {
      subjectLabel: "Opis przesyłki / zamówienia",
      subjectPlaceholder: "np. Laptop Dell XPS 15, zamówiony w x-kom",
      kwotaLabel: "Wartość przesyłki (zł)", kwotaPlaceholder: "1500",
      dataLabel: "Data przewidywanej dostawy",
      refLabel: "Numer przesyłki / tracking", refPlaceholder: "np. 600123456789 / 1Z999AA1...",
      orgLabel: "Do kogo piszesz (kurier lub sklep)",
      orgPlaceholder: "np. InPost Sp. z o.o. / x-kom Sp. z o.o.",
      opisPlaceholder: "Opisz co się stało — paczka zaginęła, dotarła uszkodzona, kurier zostawił bez podpisu, nie próbował doręczyć...",
      podjetePlaceholder: "np. Dzwoniłem na infolinię InPost — powiedzieli że paczka w magazynie; sklep odpisał że nie ich wina...",
      zadaniePlaceholder: "np. Dostarczenia przesyłki / zwrotu 1500 zł / odszkodowania za uszkodzony towar",
    },
  },
  telecom: {
    label: "Internet / telefon",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg>,
    fields: {
      subjectLabel: "Usługa / umowa",
      subjectPlaceholder: "np. Internet światłowodowy 600 Mb/s, abonament telefoniczny",
      kwotaLabel: "Miesięczna opłata (zł)", kwotaPlaceholder: "89",
      dataLabel: "Data zdarzenia / zawarcia umowy",
      refLabel: "Numer umowy / zgłoszenia serwisowego", refPlaceholder: "Opcjonalnie",
      orgLabel: "Operator",
      orgPlaceholder: "np. Orange Polska S.A., Play, T-Mobile, Polsat Box",
      opisPlaceholder: "Opisz problem — prędkość poniżej umowy, awaria nieusuwana tygodniami, bezprawna podwyżka cen, utrudnianie wypowiedzenia...",
      podjetePlaceholder: "np. Zgłaszałem awarię 3 razy — każdorazowo obiecywali poprawę; infolinia odsyła do BOK...",
      zadaniePlaceholder: "np. Usunięcia awarii / obniżenia opłaty / rozwiązania umowy bez kar",
    },
  },
  energia: {
    label: "Energia / gaz",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    fields: {
      subjectLabel: "Rodzaj usługi",
      subjectPlaceholder: "np. Energia elektryczna, gaz ziemny",
      kwotaLabel: "Zawyżona kwota / spór (zł)", kwotaPlaceholder: "350",
      dataLabel: "Data faktury / zdarzenia",
      refLabel: "Numer faktury / umowy / PPE", refPlaceholder: "Opcjonalnie",
      orgLabel: "Dostawca energii / gazu",
      orgPlaceholder: "np. Enea S.A., PGNiG, Tauron, Energa",
      opisPlaceholder: "Opisz problem — zawyżony rachunek, błędny odczyt licznika, bezprawne opłaty, odcięcie bez podstawy, zmiana taryfy bez zgody...",
      podjetePlaceholder: "np. Wysłałem pismo do BOK — odpowiedzieli że odczyt prawidłowy, ale nie wyjaśnili rozbieżności...",
      zadaniePlaceholder: "np. Korekty faktury i zwrotu 350 zł / wyjaśnienia podstawy naliczeń",
    },
  },
  inne: {
    label: "Inne",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    fields: {
      subjectLabel: "Czego dotyczy skarga",
      subjectPlaceholder: "np. Serwis nie wykonał naprawy, siłownia nie honoruje karnetu",
      kwotaLabel: "Wartość sporu (zł)", kwotaPlaceholder: "200",
      dataLabel: "Data zdarzenia",
      refLabel: "Numer umowy / referencyjny", refPlaceholder: "Opcjonalnie",
      orgLabel: "Firma / instytucja",
      orgPlaceholder: "np. Nazwa firmy Sp. z o.o.",
      opisPlaceholder: "Opisz dokładnie co się stało, kiedy i jakie były konsekwencje...",
      podjetePlaceholder: "np. Kontaktowałem się mailowo i telefonicznie — brak reakcji...",
      zadaniePlaceholder: "np. Wykonania usługi / zwrotu zapłaconej kwoty / odszkodowania",
    },
  },
};

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
  skarga_subtype: string;
};

const EMPTY: FormData = {
  produkt: "", cena: "", data_zakupu: "", numer_zamowienia: "",
  opis: "", podjete_kroki: "", zadanie: "",
  imie_nazwisko: "", adres: "", email: "",
  nazwa_sklepu: "", adres_sklepu: "",
  skarga_subtype: "",
};

const STEPS = ["Typ pisma", "Co się stało", "Twoje dane", "Podgląd", "Płatność"];

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
const inputErrCls = "w-full border border-red-400 rounded-lg px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all bg-white";
const textareaCls = inputCls + " resize-none";
const textareaErrCls = inputErrCls + " resize-none";
const ic = (err?: string) => err ? inputErrCls : inputCls;
const tc = (err?: string) => err ? textareaErrCls : textareaCls;

const MONTHS_SHORT = ["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"];
const MONTHS_FULL = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
const CUR_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 8 }, (_, i) => CUR_YEAR - i);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

function DateSelect({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [selDay, setSelDay] = useState(() => value ? value.split("-")[2] : "");
  const [selMonth, setSelMonth] = useState(() => value ? value.split("-")[1] : "");
  const [selYear, setSelYear] = useState(() => value ? value.split("-")[0] : "");

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function pick(newDay: string, newMonth: string, newYear: string) {
    setSelDay(newDay);
    setSelMonth(newMonth);
    setSelYear(newYear);
    if (newDay && newMonth && newYear) {
      onChange(`${newYear}-${newMonth.padStart(2,"0")}-${newDay.padStart(2,"0")}`);
      setOpen(false);
    }
  }

  const display = selDay && selMonth && selYear
    ? `${parseInt(selDay)} ${MONTHS_SHORT[parseInt(selMonth)-1]} ${selYear}`
    : "Wybierz datę";

  const btnCls = `w-full flex items-center justify-between px-3.5 py-3 text-sm rounded-lg border transition-all bg-white ${
    error ? "border-red-400" : "border-gray-300 hover:border-gray-400"
  } ${!(selDay && selMonth && selYear) ? "text-gray-400" : "text-gray-900"}`;

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)} className={btnCls}>
        <span>{display}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-transform ${open ? "rotate-180" : ""} text-gray-400`}>
          <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {/* Day */}
            <div className="max-h-48 overflow-y-auto py-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider sticky top-0 bg-white">Dzień</div>
              {DAYS.map(n => (
                <button key={n} type="button"
                  onClick={() => pick(String(n), selMonth, selYear)}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${parseInt(selDay) === n ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >{n}</button>
              ))}
            </div>
            {/* Month */}
            <div className="max-h-48 overflow-y-auto py-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider sticky top-0 bg-white">Miesiąc</div>
              {MONTHS_FULL.map((name, i) => (
                <button key={i} type="button"
                  onClick={() => pick(selDay, String(i+1), selYear)}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${parseInt(selMonth) === i+1 ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >{name}</button>
              ))}
            </div>
            {/* Year */}
            <div className="max-h-48 overflow-y-auto py-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider sticky top-0 bg-white">Rok</div>
              {YEARS.map(yr => (
                <button key={yr} type="button"
                  onClick={() => pick(selDay, selMonth, String(yr))}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${parseInt(selYear) === yr ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                >{yr}</button>
              ))}
            </div>
          </div>
          {!(selDay && selMonth && selYear) && (
            <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 text-center">
              Wybierz dzień, miesiąc i rok
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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

export function FormWizard({ lang }: { lang?: string }) {
  const [step, setStep] = useState(0);
  const [docType, setDocType] = useState<DocTypeId | null>(null);
  const [data, setData] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [consentDigital, setConsentDigital] = useState(false);
  const [consentDigitalError, setConsentDigitalError] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageExtracted, setImageExtracted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewPoints, setPreviewPoints] = useState<string[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const baseType = DOC_TYPES.find(t => t.id === docType) ?? DOC_TYPES[0];
  const skargaSub = data.skarga_subtype as SkargaSubtype | "";
  const type = docType === "skarga" && skargaSub
    ? { ...baseType, ...SKARGA_SUBTYPES[skargaSub].fields }
    : baseType;

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [field]: e.target.value }));

  function validateStep2() {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (docType === "skarga" && !data.skarga_subtype) e.skarga_subtype = "Wybierz typ skargi";
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
    else if (!/\d{2}-\d{3}/.test(data.adres)) e.adres = "Wpisz pełny adres z kodem pocztowym (np. ul. Kwiatowa 5/12, 00-001 Warszawa)";
    if (!data.email.trim()) e.email = "Wpisz adres email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Nieprawidłowy adres email";
    if (!data.nazwa_sklepu.trim()) e.nazwa_sklepu = "To pole jest wymagane";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function fetchPreview() {
    setPreviewLoading(true);
    setPreviewError(false);
    const body = JSON.stringify({ ...data, doc_type: docType });
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch("/api/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
        if (res.ok) {
          const json = await res.json();
          const pts = json.points ?? [];
          if (pts.length > 0) {
            setPreviewPoints(pts);
            setPreviewLoading(false);
            return;
          }
        }
      } catch {}
      if (attempt === 0) await new Promise(r => setTimeout(r, 1200));
    }
    setPreviewError(true);
    setPreviewLoading(false);
  }

  async function handlePay() {
    if (!validateStep3()) return;
    if (!consent) { setConsentError(true); return; }
    if (!consentDigital) { setConsentDigitalError(true); return; }
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
      {lang === "en" && (
        <div className="mb-6 flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-sm text-indigo-800">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5"><circle cx="8" cy="8" r="6.5" stroke="#4f46e5" strokeWidth="1.3"/><path d="M8 7v4" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="#4f46e5"/></svg>
          <span><strong>You can fill this form in English.</strong> Describe your situation in English — we'll generate the Polish letter for you.</span>
        </div>
      )}
      <ProgressBar step={step} />

      {/* Krok 0 — Typ pisma */}
      {step === 0 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Jaki masz problem?</h1>
          <p className="text-gray-500 text-sm mb-8">Wybierz typ pisma — dopasujemy przepisy do Twojej sytuacji</p>
          <div className="space-y-2.5">
            {DOC_TYPES.map((t) => {
              const ICONS: Record<string, React.ReactNode> = {
                sklep: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
                bank: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
                zus: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 11h2v4H9zM13 11h2v4h-2z"/></svg>,
                umowa: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
                uokik: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                skarga: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/></svg>,
              };
              return (
                <button
                  key={t.id}
                  onClick={() => selectType(t.id)}
                  className="w-full text-left border border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-md hover:shadow-indigo-100 hover:-translate-y-0.5 rounded-2xl px-5 py-4 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-indigo-100">
                      {ICONS[t.id]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">{t.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{t.desc}</div>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-gray-300 group-hover:text-indigo-500 transition-all duration-200 group-hover:translate-x-0.5">
                      <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Krok 1 — Co się stało */}
      {step === 1 && (
        <div>
          <button onClick={() => setStep(0)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors mb-4">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Zmień typ pisma
          </button>
          <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-indigo-100">
            {type.label}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Co się stało?</h1>
          <p className="text-gray-600 text-sm mb-8">Im więcej szczegółów, tym mocniejsze pismo</p>
          <div className="space-y-5">
            {/* Upload zdjęcia */}
            {docType === "skarga" && (
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  Typ skargi<span className="text-red-500 ml-0.5">*</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(SKARGA_SUBTYPES) as [SkargaSubtype, typeof SKARGA_SUBTYPES[SkargaSubtype]][]).map(([id, sub]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setData(p => ({ ...p, skarga_subtype: id }))}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                        data.skarga_subtype === id
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/40"
                      }`}
                    >
                      <span className={data.skarga_subtype === id ? "text-indigo-600" : "text-gray-400"}>{sub.icon}</span>
                      {sub.label}
                    </button>
                  ))}
                </div>
                {errors.skarga_subtype && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.skarga_subtype}</p>
                )}
              </div>
            )}

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
              <input className={ic(errors.produkt)} placeholder={type.subjectPlaceholder} value={data.produkt} onChange={set("produkt")} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label={type.kwotaLabel} required={docType !== "zus"} error={errors.cena}>
                <input className={ic(errors.cena)} placeholder={type.kwotaPlaceholder} type={docType !== "zus" ? "number" : "text"} min="0" value={data.cena} onChange={set("cena")} />
              </Field>
              <Field label={type.dataLabel} required error={errors.data_zakupu}>
                <DateSelect value={data.data_zakupu} onChange={v => setData(p => ({ ...p, data_zakupu: v }))} error={errors.data_zakupu} />
              </Field>
            </div>
            <Field label={type.refLabel} hint="Opcjonalnie">
              <input className={inputCls} placeholder={type.refPlaceholder} value={data.numer_zamowienia} onChange={set("numer_zamowienia")} />
            </Field>
            <Field label="Co się stało?" required error={errors.opis}>
              <textarea className={tc(errors.opis)} rows={4} placeholder={type.opisPlaceholder} value={data.opis} onChange={set("opis")} />
            </Field>
            <Field label={type.podjeteLabel} hint="Opcjonalnie">
              <textarea className={textareaCls} rows={2} placeholder={type.podjetePlaceholder} value={data.podjete_kroki} onChange={set("podjete_kroki")} />
            </Field>
            <Field label="Czego żądasz?" required error={errors.zadanie}>
              <input className={ic(errors.zadanie)} placeholder={type.zadaniePlaceholder} value={data.zadanie} onChange={set("zadanie")} />
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
          <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors mb-4">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Wróć
          </button>
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
                  <input className={ic(errors.imie_nazwisko)} placeholder="Anna Kowalska" value={data.imie_nazwisko} onChange={set("imie_nazwisko")} />
                </Field>
                <Field label="Adres zamieszkania" required error={errors.adres} hint="Format: ul. Nazwa XX/YY, XX-XXX Miasto — wymagany kod pocztowy">
                  <input className={ic(errors.adres)} placeholder="ul. Kwiatowa 5/12, 00-001 Warszawa" value={data.adres} onChange={set("adres")} />
                </Field>
                <Field label="Adres email" required error={errors.email} hint="Na ten adres wyślemy PDF z pismem">
                  <input className={ic(errors.email)} type="email" placeholder="anna@example.com" value={data.email} onChange={set("email")} />
                </Field>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">Dane adresata</h3>
              <div className="space-y-4">
                <Field label={type.orgLabel} required error={errors.nazwa_sklepu}>
                  <input className={ic(errors.nazwa_sklepu)} placeholder={type.orgPlaceholder} value={data.nazwa_sklepu} onChange={set("nazwa_sklepu")} />
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
              disabled={previewLoading}
              onClick={async () => {
                if (!validateStep3()) return;
                setPreviewPoints([]);
                setPreviewError(false);
                setStep(3);
                await fetchPreview();
              }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Sprawdź podgląd pisma →
            </button>
          </div>
        </div>
      )}

      {/* Krok 3 — Podgląd pisma */}
      {step === 3 && (
        <div>
          <button onClick={() => setStep(2)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors mb-4">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Wróć
          </button>
          <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4 border transition-all ${
            previewLoading
              ? "bg-indigo-50 text-indigo-600 border-indigo-100"
              : previewPoints.length > 0
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-indigo-50 text-indigo-700 border-indigo-100"
          }`}>
            {previewLoading ? (
              <>
                <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Analizuję sprawę…
              </>
            ) : previewPoints.length > 0 ? (
              <>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Analiza gotowa
              </>
            ) : type.label}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {previewLoading ? "Analizuję Twoją sprawę…" : "Czy dobrze rozumiemy sprawę?"}
          </h1>
          <p className="text-gray-500 text-sm mb-6">Sprawdź co znajdzie się w Twoim piśmie — zatwierdź lub popraw dane</p>

          {previewLoading ? (
            <div className="bg-white border border-indigo-200 rounded-2xl overflow-hidden mb-5 shadow-sm">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3.5 flex items-center gap-2">
                <svg className="animate-spin w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Generuję podgląd pisma…</span>
              </div>
              <ul className="divide-y divide-gray-50">
                {[72, 55, 80, 63].map((w, i) => (
                  <li key={i} className="flex items-start gap-3 px-5 py-4">
                    <div className="w-6 h-6 rounded-full bg-gray-100 shrink-0 mt-0.5 animate-pulse" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 bg-gray-100 rounded animate-pulse" style={{ width: `${w}%` }} />
                      {i % 2 === 0 && <div className="h-3.5 bg-gray-100 rounded animate-pulse" style={{ width: `${w - 20}%` }} />}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : previewPoints.length > 0 ? (
            <div className="bg-white border border-indigo-200 rounded-2xl overflow-hidden mb-5 shadow-sm">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3.5 flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Twoje pismo będzie zawierać</span>
              </div>
              <ul className="divide-y divide-gray-50">
                {previewPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 px-5 py-4 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M2 5.5l2.5 2.5L9 3" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : previewError ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-6 mb-5 text-center">
              <p className="text-sm text-amber-800 mb-3">Nie udało się wygenerować podglądu.</p>
              <button onClick={fetchPreview} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors">
                Spróbuj ponownie →
              </button>
            </div>
          ) : null}

          {/* Podsumowanie danych */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Twoje dane</span>
              <button onClick={() => setStep(1)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                Popraw →
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs text-gray-400 w-16 shrink-0 pt-0.5">{type.summarySubject}</span>
                <span className="text-xs font-medium text-gray-800 leading-relaxed">{data.produkt}{data.cena ? <span className="text-gray-500"> · {data.cena} zł</span> : ""}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs text-gray-400 w-16 shrink-0 pt-0.5">{type.summaryOrg}</span>
                <span className="text-xs font-medium text-gray-800">{data.nazwa_sklepu}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs text-gray-400 w-16 shrink-0 pt-0.5">Żądanie</span>
                <span className="text-xs font-medium text-gray-800 leading-relaxed">{data.zadanie}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs text-gray-400 w-16 shrink-0 pt-0.5">PDF na</span>
                <span className="text-xs font-medium text-gray-800">{data.email}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-5 py-3 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              ← Popraw dane
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={previewLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
            >
              Wygląda dobrze — przejdź do płatności →
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">29 zł · BLIK · Karta · Przelewy24</p>
        </div>
      )}

      {/* Krok 4 — Podsumowanie i płatność */}
      {step === 4 && (
        <div>
          <button onClick={() => setStep(3)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 font-medium transition-colors mb-4">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Wróć do podglądu
          </button>
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

          <label className={`flex items-start gap-3 mb-2 cursor-pointer p-3 rounded-xl border transition-colors ${consentError ? "border-red-300 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`}>
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
              {" "}serwisu writeback.pl.
            </span>
          </label>
          {consentError && <p className="text-xs text-red-500 font-medium mb-2 ml-3">Musisz zaakceptować regulamin przed opłaceniem</p>}

          <label className={`flex items-start gap-3 mb-5 cursor-pointer p-3 rounded-xl border transition-colors ${consentDigitalError ? "border-red-300 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`}>
            <input
              type="checkbox"
              checked={consentDigital}
              onChange={e => { setConsentDigital(e.target.checked); setConsentDigitalError(false); }}
              className="mt-0.5 shrink-0 w-4 h-4 accent-indigo-600"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              Wyrażam zgodę na natychmiastowe dostarczenie treści cyfrowej (pisma PDF) i przyjmuję do wiadomości, że z chwilą dostarczenia tracę prawo odstąpienia od umowy zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta.
            </span>
          </label>
          {consentDigitalError && <p className="text-xs text-red-500 font-medium -mt-3 mb-4 ml-3">Musisz wyrazić zgodę na dostarczenie treści cyfrowej</p>}

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
          <button onClick={() => setStep(3)} className="w-full text-center text-sm text-gray-500 hover:text-gray-900 transition-colors mt-4">
            ← Wróć do podglądu
          </button>
        </div>
      )}
    </div>
  );
}
