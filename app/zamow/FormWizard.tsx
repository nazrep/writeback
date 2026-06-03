"use client";

import { useState } from "react";

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
                i < step
                  ? "bg-indigo-600 text-white"
                  : i === step
                  ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
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
  const [data, setData] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [field]: e.target.value }));

  function validateStep2() {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.produkt.trim()) e.produkt = "Wpisz nazwę produktu";
    if (!data.cena.trim()) e.cena = "Wpisz kwotę";
    if (!data.opis.trim()) e.opis = "Opisz co się stało";
    if (!data.zadanie.trim()) e.zadanie = "Wpisz czego żądasz";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3() {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.imie_nazwisko.trim()) e.imie_nazwisko = "Wpisz imię i nazwisko";
    if (!data.adres.trim()) e.adres = "Wpisz adres zamieszkania";
    if (!data.email.trim()) e.email = "Wpisz adres email";
    if (!data.nazwa_sklepu.trim()) e.nazwa_sklepu = "Wpisz nazwę sklepu";
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Jaki masz problem?</h1>
          <p className="text-gray-600 text-sm mb-8">Wybierz typ pisma które chcesz napisać</p>
          <div className="space-y-3">
            <button
              onClick={() => setStep(1)}
              className="w-full text-left border-2 border-indigo-600 bg-indigo-50 rounded-xl px-5 py-4 hover:bg-indigo-100 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-gray-900">Reklamacja do sklepu internetowego</div>
                  <div className="text-xs text-gray-600 mt-1">Produkt nie dotarł, uszkodzony, niezgodny z opisem, odmowa zwrotu</div>
                </div>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 ml-4 text-indigo-600">
                  <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            {[
              { label: "Reklamacja do banku / ubezpieczyciela", desc: "Nieautoryzowana transakcja, odmowa wypłaty" },
              { label: "Odwołanie od decyzji ZUS / US", desc: "Odmowa świadczenia, zawyżona składka" },
              { label: "Wypowiedzenie umowy", desc: "Internet, gym, prąd, telefon" },
              { label: "Skarga do UOKiK / Rzecznika", desc: "Gdy sklep nie odpowiada na reklamację" },
            ].map(({ label, desc }) => (
              <div key={label} className="border border-gray-100 rounded-xl px-5 py-4 bg-gray-50 cursor-not-allowed">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm text-gray-500">{label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md shrink-0 ml-4">Wkrótce</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Krok 1 — Co się stało */}
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Co się stało?</h1>
          <p className="text-gray-600 text-sm mb-8">Im więcej szczegółów, tym mocniejsze pismo</p>
          <div className="space-y-5">
            <Field label="Nazwa produktu" required error={errors.produkt}>
              <input className={inputCls} placeholder="np. Słuchawki Sony WH-1000XM5" value={data.produkt} onChange={set("produkt")} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Cena (zł)" required error={errors.cena}>
                <input className={inputCls} placeholder="1299" type="number" min="0" value={data.cena} onChange={set("cena")} />
              </Field>
              <Field label="Data zakupu" required>
                <input className={inputCls} type="date" value={data.data_zakupu} onChange={set("data_zakupu")} />
              </Field>
            </div>
            <Field label="Numer zamówienia" hint="Opcjonalnie — jeśli masz potwierdzenie">
              <input className={inputCls} placeholder="np. TS/2026/05/44821" value={data.numer_zamowienia} onChange={set("numer_zamowienia")} />
            </Field>
            <Field label="Co się stało?" required error={errors.opis}>
              <textarea
                className={textareaCls}
                rows={4}
                placeholder="Opisz dokładnie co się wydarzyło — kiedy zamówiłeś, co poszło nie tak, jak zareagował sklep..."
                value={data.opis}
                onChange={set("opis")}
              />
            </Field>
            <Field label="Co już próbowałeś?" hint="Opcjonalnie">
              <textarea
                className={textareaCls}
                rows={2}
                placeholder="np. Kontaktowałem się przez czat 3 razy, sklep nie odpowiada..."
                value={data.podjete_kroki}
                onChange={set("podjete_kroki")}
              />
            </Field>
            <Field label="Czego żądasz?" required error={errors.zadanie}>
              <input
                className={inputCls}
                placeholder="np. Zwrotu 1299 zł / Wymiany na nowy produkt"
                value={data.zadanie}
                onChange={set("zadanie")}
              />
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Twoje dane i dane sklepu</h1>
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
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">Dane sklepu</h3>
              <div className="space-y-4">
                <Field label="Nazwa sklepu" required error={errors.nazwa_sklepu}>
                  <input className={inputCls} placeholder="np. TechShop Sp. z o.o. / Allegro.pl" value={data.nazwa_sklepu} onChange={set("nazwa_sklepu")} />
                </Field>
                <Field label="Adres sklepu" hint="Opcjonalnie — znajdziesz w regulaminie lub stopce strony">
                  <input className={inputCls} placeholder="ul. Handlowa 10, 02-001 Warszawa" value={data.adres_sklepu} onChange={set("adres_sklepu")} />
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
              <div className="text-sm font-semibold text-gray-900">Reklamacja do sklepu internetowego</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Produkt i sklep</div>
              <div className="text-sm text-gray-900">{data.produkt}</div>
              <div className="text-xs text-gray-500 mt-0.5">{data.nazwa_sklepu} · {data.cena} zł</div>
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
          <button
            onClick={() => setStep(2)}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-900 transition-colors mt-4"
          >
            ← Popraw dane
          </button>
        </div>
      )}
    </div>
  );
}
