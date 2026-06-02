"use client";

import { useState } from "react";

type FormData = {
  // Krok 2
  produkt: string;
  cena: string;
  data_zakupu: string;
  numer_zamowienia: string;
  opis: string;
  podjete_kroki: string;
  zadanie: string;
  // Krok 3
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
      <div className="flex items-center gap-0">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i < step ? "bg-gray-900 text-white" : i === step ? "bg-gray-900 text-white ring-4 ring-gray-200" : "bg-gray-100 text-gray-400"}`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs mt-1.5 whitespace-nowrap ${i === step ? "text-gray-900 font-medium" : "text-gray-400"}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 mb-5 transition-colors ${i < step ? "bg-gray-900" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-300";
const textareaCls = inputCls + " resize-none";

export function FormWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData(prev => ({ ...prev, [field]: e.target.value }));

  function validateStep2() {
    const e: Partial<FormData> = {};
    if (!data.produkt.trim()) e.produkt = "Podaj nazwę produktu";
    if (!data.cena.trim()) e.cena = "Podaj kwotę";
    if (!data.opis.trim()) e.opis = "Opisz co się stało";
    if (!data.zadanie.trim()) e.zadanie = "Podaj czego żądasz";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3() {
    const e: Partial<FormData> = {};
    if (!data.imie_nazwisko.trim()) e.imie_nazwisko = "Podaj imię i nazwisko";
    if (!data.adres.trim()) e.adres = "Podaj adres";
    if (!data.email.trim()) e.email = "Podaj adres email";
    if (!data.nazwa_sklepu.trim()) e.nazwa_sklepu = "Podaj nazwę sklepu";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handlePay() {
    if (!validateStep3()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.url) window.location.href = json.url;
    } catch {
      alert("Coś poszło nie tak. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <ProgressBar step={step} />

      {/* Krok 0 — Typ pisma */}
      {step === 0 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Jaki masz problem?</h1>
          <p className="text-gray-500 text-sm mb-8">Wybierz typ pisma które chcesz napisać</p>
          <div className="space-y-3">
            <button
              onClick={() => setStep(1)}
              className="w-full text-left border-2 border-gray-900 rounded-xl px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="font-semibold text-sm">Reklamacja do sklepu internetowego</div>
              <div className="text-xs text-gray-500 mt-1">Produkt nie dotarł, uszkodzony, niezgodny z opisem, odmowa zwrotu</div>
            </button>
            {["Reklamacja do banku / ubezpieczyciela", "Odwołanie od decyzji ZUS", "Wypowiedzenie umowy", "Skarga do UOKiK"].map((label) => (
              <div key={label} className="w-full text-left border border-gray-100 rounded-xl px-5 py-4 opacity-40 cursor-not-allowed">
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-gray-400 mt-1">Wkrótce dostępne</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Krok 1 — Co się stało */}
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Co się stało?</h1>
          <p className="text-gray-500 text-sm mb-8">Opisz sytuację — im więcej szczegółów, tym mocniejsze pismo</p>
          <div className="space-y-5">
            <Field label="Nazwa produktu" required>
              <input className={inputCls} placeholder="np. Słuchawki Sony WH-1000XM5" value={data.produkt} onChange={set("produkt")} />
              {errors.produkt && <p className="text-xs text-red-400 mt-1">{errors.produkt}</p>}
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Cena (zł)" required>
                <input className={inputCls} placeholder="np. 1299" type="number" value={data.cena} onChange={set("cena")} />
                {errors.cena && <p className="text-xs text-red-400 mt-1">{errors.cena}</p>}
              </Field>
              <Field label="Data zakupu" required>
                <input className={inputCls} type="date" value={data.data_zakupu} onChange={set("data_zakupu")} />
              </Field>
            </div>
            <Field label="Numer zamówienia" hint="Opcjonalnie — jeśli masz">
              <input className={inputCls} placeholder="np. TS/2026/05/44821" value={data.numer_zamowienia} onChange={set("numer_zamowienia")} />
            </Field>
            <Field label="Co się stało?" required>
              <textarea className={textareaCls} rows={4} placeholder="Opisz dokładnie co się wydarzyło — kiedy, co kupiłeś, co poszło nie tak, jak zachował się sklep..." value={data.opis} onChange={set("opis")} />
              {errors.opis && <p className="text-xs text-red-400 mt-1">{errors.opis}</p>}
            </Field>
            <Field label="Co już próbowałeś?" hint="Opcjonalnie">
              <textarea className={textareaCls} rows={2} placeholder="np. Kontaktowałem się przez czat 3 razy, sklep nie odpowiada..." value={data.podjete_kroki} onChange={set("podjete_kroki")} />
            </Field>
            <Field label="Czego żądasz?" required>
              <input className={inputCls} placeholder="np. Zwrotu 1299 zł / Wymiany na nowy produkt / Odszkodowania" value={data.zadanie} onChange={set("zadanie")} />
              {errors.zadanie && <p className="text-xs text-red-400 mt-1">{errors.zadanie}</p>}
            </Field>
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep(0)} className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">← Wróć</button>
            <button onClick={() => { if (validateStep2()) setStep(2); }} className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
              Dalej →
            </button>
          </div>
        </div>
      )}

      {/* Krok 2 — Dane */}
      {step === 2 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Twoje dane i dane sklepu</h1>
          <p className="text-gray-500 text-sm mb-8">Potrzebujemy ich do wygenerowania pisma</p>
          <div className="space-y-5">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Twoje dane</h3>
              <div className="space-y-4">
                <Field label="Imię i nazwisko" required>
                  <input className={inputCls} placeholder="Anna Kowalska" value={data.imie_nazwisko} onChange={set("imie_nazwisko")} />
                  {errors.imie_nazwisko && <p className="text-xs text-red-400 mt-1">{errors.imie_nazwisko}</p>}
                </Field>
                <Field label="Adres zamieszkania" required hint="Ulica, numer, kod pocztowy, miasto">
                  <input className={inputCls} placeholder="ul. Kwiatowa 5/12, 00-001 Warszawa" value={data.adres} onChange={set("adres")} />
                  {errors.adres && <p className="text-xs text-red-400 mt-1">{errors.adres}</p>}
                </Field>
                <Field label="Adres email" required hint="Na ten adres wyślemy PDF">
                  <input className={inputCls} type="email" placeholder="anna@example.com" value={data.email} onChange={set("email")} />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </Field>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Dane sklepu</h3>
              <div className="space-y-4">
                <Field label="Nazwa sklepu" required>
                  <input className={inputCls} placeholder="np. TechShop Sp. z o.o. / Allegro.pl" value={data.nazwa_sklepu} onChange={set("nazwa_sklepu")} />
                  {errors.nazwa_sklepu && <p className="text-xs text-red-400 mt-1">{errors.nazwa_sklepu}</p>}
                </Field>
                <Field label="Adres sklepu" hint="Opcjonalnie — znajdziesz w regulaminie lub stopce strony">
                  <input className={inputCls} placeholder="ul. Handlowa 10, 02-001 Warszawa" value={data.adres_sklepu} onChange={set("adres_sklepu")} />
                </Field>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep(1)} className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">← Wróć</button>
            <button onClick={() => setStep(3)} className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
              Sprawdź zamówienie →
            </button>
          </div>
        </div>
      )}

      {/* Krok 3 — Podsumowanie i płatność */}
      {step === 3 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Podsumowanie</h1>
          <p className="text-gray-500 text-sm mb-8">Sprawdź dane i opłać — PDF dostaniesz na maila od razu po płatności</p>

          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 mb-6">
            <div className="px-5 py-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Pismo</div>
              <div className="text-sm font-medium">Reklamacja do sklepu internetowego</div>
              <div className="text-sm text-gray-500 mt-1">{data.produkt} · {data.cena} zł</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Dotyczy</div>
              <div className="text-sm text-gray-700 leading-relaxed">{data.opis.slice(0, 120)}{data.opis.length > 120 ? "..." : ""}</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">PDF wyślemy na</div>
              <div className="text-sm font-medium">{data.email}</div>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="font-semibold">Do zapłaty</div>
              <div className="text-xl font-bold">29 zł</div>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-base hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Przekierowuję do płatności..." : "Opłać i pobierz pismo — 29 zł"}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Bezpieczna płatność przez Stripe · PDF na maila od razu po opłaceniu
          </p>
          <button onClick={() => setStep(2)} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors mt-4">
            ← Popraw dane
          </button>
        </div>
      )}
    </div>
  );
}
