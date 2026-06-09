import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const getAnthropic = () => new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const SYSTEMS: Record<string, string> = {
  sklep: `Jesteś ekspertem prawa konsumenckiego w Polsce. Piszesz profesjonalne pisma reklamacyjne.
Przepisy obowiązkowe: art. 43b UPK (odpowiedzialność sprzedawcy), art. 43c ust. 1 UPK (domniemanie wady przez 2 lata), art. 43d ust. 1 UPK (naprawa lub wymiana), art. 43e ust. 1 UPK (obniżenie ceny lub odstąpienie), art. 7a ust. 1 UPK (14-dniowy termin odpowiedzi).`,
  bank: `Jesteś ekspertem prawa bankowego w Polsce. Piszesz reklamacje do podmiotów rynku finansowego.
Przepisy obowiązkowe: art. 45 ust. 1-2 UUP (ciężar dowodu po stronie banku), art. 46 ust. 1 UUP (zwrot do końca następnego dnia roboczego), ustawa o reklamacjach podmiotów rynku finansowego art. 5-6 (30 dni na odpowiedź, brak odpowiedzi = uznanie).`,
  zus: `Jesteś ekspertem prawa ubezpieczeń społecznych. Piszesz odwołania od decyzji ZUS do sądu pracy.
Przepisy obowiązkowe: art. 83 ust. 2 uSUS, art. 477⁹ KPC (odwołanie do sądu pracy i ubezpieczeń społecznych za pośrednictwem ZUS), termin 1 miesiąc od doręczenia decyzji.`,
  umowa: `Jesteś ekspertem prawa cywilnego w Polsce. Piszesz wypowiedzenia umów.
Przepisy obowiązkowe: art. 365¹ KC (wypowiedzenie umowy bezterminowej), art. 384¹ KC (wypowiedzenie gdy firma zmienia warunki), art. 385³ pkt 17 KC (klauzula kary umownej jako abuzywna).`,
  uokik: `Jesteś ekspertem prawa ochrony konsumentów. Piszesz skargi do UOKiK.
Przepisy obowiązkowe: art. 24 ustawy o ochronie konkurencji i konsumentów (praktyki naruszające zbiorowe interesy), art. 7a UPK (14-dniowy termin odpowiedzi).`,
  skarga: `Jesteś ekspertem prawa konsumenckiego i administracyjnego w Polsce. Piszesz skargi konsumenckie.
Przepisy obowiązkowe: art. 43a-43e UPK lub art. 65 PP (kurier) lub art. 306-308 PKE (telecom) lub art. 6c PE (energia) — dobierz właściwe do opisu.`,
  lot: `Jesteś ekspertem prawa lotniczego. Piszesz roszczenia o odszkodowanie za opóźniony/odwołany lot.
Przepisy obowiązkowe: Rozporządzenie (WE) 261/2004 art. 7 (kwoty 250/400/600 EUR), art. 5 (odwołanie lotu), art. 6 (opóźnienie). Opóźnienie ≥3h przy przylądzie uprawnia do odszkodowania (wyrok TSUE C-402/07 Sturgeon). Termin przedawnienia: 2 lata (Konwencja montrealska art. 35).`,
  wezwanie: `Jesteś ekspertem prawa cywilnego w Polsce. Piszesz formalne wezwania do zapłaty.
Przepisy obowiązkowe: art. 455 KC (obowiązek spełnienia świadczenia po wezwaniu), art. 481 §1-2 KC (odsetki ustawowe za opóźnienie = stopa NBP + 8 pkt proc.). Dla B2B: ustawa o przeciwdziałaniu nadmiernym opóźnieniom w transakcjach handlowych (odsetki NBP+10%, odszkodowanie 40/70/100 EUR). Termin zapłaty: 7-14 dni.`,
  mandat: `Jesteś ekspertem prawa wykroczeń w Polsce. Piszesz pisma dotyczące mandatów karnych.
KLUCZOWE: Odmowa mandatu musi nastąpić NA MIEJSCU przy proponowaniu — nie ma 7-dniowego okna na odmowę po fakcie. Po podpisaniu mandat jest prawomocny. Art. 99 KPW (uchylenie w 7 dni) dotyczy wyłącznie mandatów za czyn niebędący wykroczeniem lub nałożonych na nieodpowiedzialną osobę. Art. 45 KW: przedawnienie karalności 1 rok.`,
};

const STRUCTURE = `
OBOWIĄZKOWA STRUKTURA PISMA:
1. Imię i nazwisko nadawcy
2. Adres nadawcy (ulica, kod, miasto)
3. Email nadawcy
4. [pusta linia]
5. DATA: [miejscowość], [data]
6. [pusta linia]
7. Nazwa adresata
8. Adres adresata (jeśli podano)
9. [pusta linia]
10. DOTYCZY: [krótki opis — 1 zdanie]
11. [pusta linia]
12. Szanowni Państwo,
13. [pusta linia]
14. Treść pisma — 2-3 akapity, każdy oddzielony pustą linią, powołujące konkretne artykuły ustaw
15. [pusta linia]
16. ŻĄDANIE
17. Konkretne żądanie z podstawą prawną
18. [pusta linia]
19. PODSTAWA PRAWNA
20. - Art. X ustawy Y
21. [pusta linia]
22. TERMIN ODPOWIEDZI
23. Treść o ustawowym terminie
24. [pusta linia]
25. Z poważaniem,
26. [pusta linia]
27. Imię i nazwisko

ZASADY: Ton formalny i asertywny. Bez emocji. Tylko gotowe pismo — bez komentarzy.`;

export async function POST(req: NextRequest) {
  const data = await req.json();
  const docType: string = data.doc_type || "sklep";
  const system = (SYSTEMS[docType] ?? SYSTEMS.sklep) + "\n\n" + STRUCTURE;

  const today = new Date().toLocaleDateString("pl-PL", {
    day: "numeric", month: "long", year: "numeric",
  });

  const userPrompt = `Napisz pismo na podstawie poniższych danych:

NADAWCA: ${data.imie_nazwisko || "[Imię Nazwisko]"} | ${data.adres || "[Adres]"} | ${data.email || "[Email]"}
ADRESAT: ${data.nazwa_sklepu || "[Adresat]"}${data.adres_sklepu ? " | " + data.adres_sklepu : ""}
PRZEDMIOT: ${data.produkt || ""}${data.cena ? " | " + data.cena + " zł" : ""}${data.data_zakupu ? " | data: " + data.data_zakupu : ""}
OPIS: ${data.opis || ""}${data.podjete_kroki ? "\nPODJĘTE KROKI: " + data.podjete_kroki : ""}
ŻĄDANIE: ${data.zadanie || ""}
DATA PISMA: ${today}`;

  try {
    const msg = await getAnthropic().messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1200,
      system,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = (msg.content[0] as { type: string; text: string }).text.trim();
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ text: "" }, { status: 200 });
  }
}
