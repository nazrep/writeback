import Link from "next/link";
import type { Metadata } from "next";
import { EnNav } from "./EnNav";

export const metadata: Metadata = {
  title: "Writeback — Consumer Complaint Letters for Poland | PLN 29",
  description: "Got ignored by a Polish online store? Generate a professional complaint letter citing Polish consumer law (art. 43b) in 5 minutes. The store has 14 days to respond — no reply means your complaint is legally accepted.",
  alternates: { canonical: "https://writeback.pl/en" },
  openGraph: {
    locale: "en_US",
    title: "Polish store ignored you? Write a letter they must respond to.",
    description: "Professional complaint letter with Polish consumer law references. PDF ready in 5 minutes. PLN 29.",
  },
};

const STEPS = [
  {
    n: "01",
    title: "Describe the issue",
    desc: "Fill out the form in 3 minutes — what you bought, what went wrong, what you demand.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    n: "02",
    title: "We generate the letter",
    desc: "We create a formal complaint citing specific articles of Polish consumer law — in 30 seconds.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    n: "03",
    title: "Send and wait",
    desc: "PDF to your inbox immediately. The store has 14 days to respond under art. 7a of the Consumer Rights Act.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
      </svg>
    ),
  },
];

const PROBLEMS = [
  {
    before: "You write 'please refund me' — the store ignores you or refuses after 3 weeks",
    after: "You cite art. 43b of the Consumer Rights Act — they know no reply in 14 days = they lose",
  },
  {
    before: "Generic templates from Google don't fit your specific situation",
    after: "Letter tailored to your case with the exact law articles that apply",
  },
  {
    before: "You don't know what you can demand — refund, replacement, compensation?",
    after: "We show you what you're entitled to before you write a single word",
  },
  {
    before: "The store claims 'item was used' or 'deadline passed' without legal basis",
    after: "Your letter counters these arguments with references to Polish law",
  },
];

const TYPES_EN = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    label: "Store / Allegro complaint",
    desc: "Item not delivered, damaged, not as described, refund refused",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
    label: "Bank / insurer complaint",
    desc: "Unauthorised transaction, refused payout, incorrect charge",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    label: "ZUS / Tax authority appeal",
    desc: "Benefit refused, contribution overcharged, tax decision",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    label: "Consumer complaint",
    desc: "Courier, internet, phone, energy — company not responding",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    label: "Contract termination",
    desc: "Internet, gym, electricity, phone — without penalties",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    label: "UOKiK / Ombudsman complaint",
    desc: "Store ignores complaints, unfair practices",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>,
    label: "Flight delay / cancellation",
    desc: "Up to €600 compensation — EU Regulation 261/2004",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><line x1="6" y1="9" x2="18" y2="9"/><line x1="6" y1="13" x2="13" y2="13"/></svg>,
    label: "Payment demand",
    desc: "Unpaid invoice, loan, contract — recover what you're owed",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    label: "Traffic fine appeal",
    desc: "Road or administrative fine — challenge it",
  },
];

const FAQS = [
  {
    q: "I don't speak Polish — can I still use Writeback?",
    a: "Yes. You fill in the form in English, and we generate a professional letter in Polish (the language required for Polish companies). You don't need to understand the letter — it handles everything for you.",
  },
  {
    q: "Which stores and companies does this work for?",
    a: "Any business operating in Poland — including Allegro, OLX, Polish online stores, banks, insurance companies, telecom providers (Orange, Play, T-Mobile), gyms. We also handle flight compensation claims (EU Regulation 261/2004), payment demands, and traffic fine appeals.",
  },
  {
    q: "What happens if the store doesn't reply within 14 days?",
    a: "Under art. 7a of the Polish Consumer Rights Act, no reply within 14 days means the complaint is legally considered accepted. Our letter includes this information explicitly — it acts as legal pressure.",
  },
  {
    q: "Is this legal advice?",
    a: "No. Writeback is a tool for generating consumer complaint letters, not a law firm. For high-value disputes (above a few thousand PLN) we recommend consulting a Polish lawyer.",
  },
  {
    q: "What if the letter doesn't work?",
    a: "We write a follow-up appeal for free. Just email hello@writeback.pl — we'll prepare the next letter at no extra charge.",
  },
  {
    q: "How much does it cost and what do I get?",
    a: "PLN 29 (approx. €7) one-time. You get a PDF letter with the correct Polish legal references, ready to send within 5 minutes, delivered to your email. No subscription, no hidden fees.",
  },
];

export default function EnPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      <EnNav />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-white pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-indigo-100">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                Polish law is on your side
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.06] text-gray-900 mb-6">
                Polish store ignored you?<br />
                <span className="text-indigo-600">Write a letter they<br className="hidden sm:block" /> must respond to.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-500 max-w-xl mb-10 leading-relaxed">
                Professional complaint letter citing art. 43b of the Polish Consumer Rights Act.
                Ready in <strong className="text-gray-800 font-semibold">5 minutes</strong>, PDF to your inbox immediately.
              </p>

              <Link
                href="/zamow?lang=en"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                Write a letter — PLN 29
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <p className="text-sm text-gray-400 mt-3">
                One-time payment · PDF to your inbox immediately · Free appeal if it doesn&apos;t work
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 mt-12 pt-10 border-t border-gray-100">
                {[
                  { val: "PLN 29", sub: "one-time" },
                  { val: "5 min", sub: "letter ready" },
                  { val: "14 days", sub: "store must reply" },
                  { val: "100%", sub: "Polish law citations" },
                ].map((s, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-gray-900">{s.val}</div>
                    <div className="text-xs text-gray-400 mt-0.5 font-medium">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — letter mockup */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-200/30 rounded-3xl blur-2xl scale-95 translate-y-4" />
                <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/60 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    </div>
                    <span className="text-xs font-bold text-white/80 ml-2 uppercase tracking-wider">complaint.pdf</span>
                  </div>
                  <div className="p-6 font-mono text-[11px] leading-relaxed text-gray-700 space-y-3">
                    <div className="text-gray-500 space-y-0.5">
                      <div className="font-bold text-gray-800">Anna Kowalska</div>
                      <div>ul. Kwiatowa 5/12, 00-001 Warszawa</div>
                      <div>anna@example.com</div>
                    </div>
                    <div className="text-right text-gray-400 text-[10px]">Warsaw, {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
                    <div className="text-gray-500 space-y-0.5">
                      <div className="font-bold text-gray-800">TechShop Sp. z o.o.</div>
                      <div>ul. Handlowa 1, 00-100 Warszawa</div>
                    </div>
                    <div className="border-l-4 border-indigo-500 pl-3 py-0.5">
                      <div className="font-bold text-indigo-700 text-[10px]">RE: Complaint — Samsung Smartphone, order no. TS/2026/4821</div>
                    </div>
                    <div className="text-gray-600 leading-relaxed">
                      On 10 May 2026 I purchased a Samsung Galaxy S24 smartphone for PLN 3,499. On 1 June 2026 I found the device to be non-conforming — the display shows factory defects without any mechanical damage.
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-3 space-y-1.5">
                      <div className="font-bold text-indigo-800 text-[10px] uppercase tracking-wide">Demand</div>
                      <div className="text-indigo-700">Under <span className="font-bold">art. 43d §1 CRA</span> I demand replacement of the goods with a defect-free unit.</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                      <div className="font-bold text-gray-600 text-[10px] uppercase tracking-wide">Legal basis</div>
                      <div className="text-gray-500">- Art. 43b CRA (seller&apos;s liability)</div>
                      <div className="text-gray-500">- Art. 43c §1 CRA (presumption of defect — 2 years)</div>
                      <div className="text-gray-500">- Art. 7a CRA (14-day response deadline)</div>
                    </div>
                    <div className="text-gray-500 text-[10px] pt-1">
                      Yours faithfully,<br />
                      <span className="font-bold text-gray-700">Anna Kowalska</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 border-t border-gray-100 px-6 py-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Generated by writeback.pl</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-emerald-600 font-semibold">Ready to send</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          {["Stripe payments", "Encrypted HTTPS", "GDPR compliant", "Polish law citations", "BLIK · Card · Przelewy24"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">From problem to letter<br className="hidden sm:block" /> in 5 minutes</h2>
            <p className="text-gray-500 text-sm">No registration, no waiting</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-7 left-[calc(50%+44px)] right-[-50%] h-px bg-gradient-to-r from-indigo-100 to-transparent" />
                )}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 ring-4 ring-white shadow-sm transition-all duration-300 group-hover:bg-indigo-100 group-hover:-translate-y-1">
                    {s.icon}
                  </div>
                  <div className="text-xs font-bold text-indigo-400 tracking-widest mb-1">{s.n}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/zamow?lang=en" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-indigo-100">
              Get started
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Why it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Stores ignore generic complaints.<br className="hidden sm:block" /> They won&apos;t ignore yours.
            </h2>
            <p className="text-gray-500 text-sm">Specific law articles change everything</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROBLEMS.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 hover:border-indigo-100 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.before}</p>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2L6.5 2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className="text-sm text-gray-900 font-medium leading-relaxed">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">How much is your time worth?</h2>
            <p className="text-gray-500 text-sm">Compare before you decide</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-2xl p-7 text-center bg-gray-50">
              <div className="text-3xl font-bold text-gray-300 mb-1">Free</div>
              <div className="font-semibold text-gray-600 mb-4 text-sm">Write it yourself</div>
              <ul className="text-sm text-gray-500 text-left space-y-2.5">
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Hours of research</li>
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Wrong or missing legal refs</li>
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Store ignores vague letters</li>
              </ul>
            </div>
            <div className="border-2 border-indigo-500 rounded-2xl p-7 text-center bg-indigo-50 relative shadow-xl shadow-indigo-100 hover:-translate-y-1 transition-all">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">Best choice</div>
              <div className="text-3xl font-bold text-indigo-600 mb-1">PLN 29</div>
              <div className="font-semibold text-gray-900 mb-4 text-sm">Writeback</div>
              <ul className="text-sm text-gray-700 text-left space-y-2.5">
                <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Ready in 5 minutes</li>
                <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Correct Polish law articles</li>
                <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Free appeal if unsuccessful</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-2xl p-7 text-center bg-gray-50">
              <div className="text-3xl font-bold text-gray-300 mb-1">PLN 300+</div>
              <div className="font-semibold text-gray-600 mb-4 text-sm">Lawyer</div>
              <ul className="text-sm text-gray-500 text-left space-y-2.5">
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Expensive for a complaint</li>
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Appointment in days</li>
                <li className="flex gap-2.5 items-start"><span className="text-emerald-500 shrink-0 font-bold">✓</span>Needed for serious disputes</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/zamow?lang=en" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-colors text-base shadow-lg shadow-indigo-100">
              Write a letter — PLN 29
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* What letters we write */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Scope</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">What letters we write</h2>
            <p className="text-gray-500 text-sm">All types available instantly — PLN 29, PDF to your inbox in 5 minutes</p>
          </div>
          {[
            { group: "Consumer complaints", items: TYPES_EN.slice(0, 4) },
            { group: "Contracts & other rights", items: TYPES_EN.slice(4, 7) },
            { group: "New", items: TYPES_EN.slice(7) },
          ].map((section, si) => (
            <div key={section.group} className="mb-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">{section.group}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.items.map((t) => (
                  <Link
                    key={t.label}
                    href="/zamow?lang=en"
                    className="flex items-start gap-3 rounded-2xl px-4 py-4 border border-gray-100 bg-white shadow-sm hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-100 transition-colors">
                      {t.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug">{t.label}</div>
                      <div className="text-xs mt-0.5 text-gray-400 leading-relaxed">{t.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Common questions</h2>
            <p className="text-gray-500 text-sm">Other questions? Email hello@writeback.pl</p>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <details key={i} className="border border-gray-100 rounded-xl overflow-hidden group bg-white hover:border-indigo-100 transition-all">
                <summary className="px-5 py-4 text-sm font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between hover:bg-indigo-50/50 transition-colors">
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-4 text-gray-400 transition-transform duration-300 group-open:rotate-180">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </summary>
                <p className="px-5 pb-5 pt-2 text-sm text-gray-500 leading-relaxed border-t border-gray-100">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-xl mx-auto">
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4">Do it now</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get your money back</h2>
          <p className="text-indigo-100 mb-2 text-sm leading-relaxed">Letter ready in 5 minutes. Store must reply within 14 days by law.</p>
          <p className="text-indigo-200 text-sm mb-10">One-time PLN 29 · No subscription</p>
          <Link
            href="/zamow?lang=en"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-gray-50 font-bold px-10 py-4 rounded-xl transition-colors shadow-lg text-base"
          >
            Write a letter — PLN 29
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <p className="text-indigo-200 text-sm mt-4">Free appeal if it doesn&apos;t work</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-400">
        <p className="mb-2">© 2026 writeback.pl · A letter-writing tool, not legal advice</p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <a href="mailto:hello@writeback.pl" className="hover:text-gray-600 transition-colors">hello@writeback.pl</a>
          <span>·</span>
          <Link href="/regulamin" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <span>·</span>
          <Link href="/polityka" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-600 transition-colors">🇵🇱 Polski</Link>
          <span>·</span>
          <span>Maciej Perzankowski Software Solutions · NIP 8361881457</span>
        </p>
      </footer>
    </div>
  );
}
