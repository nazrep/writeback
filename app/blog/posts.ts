export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
}

export const POSTS: Post[] = [
  {
    slug: "reklamacja-sklep-internetowy",
    title: "Jak napisać skuteczną reklamację do sklepu internetowego (wzór 2026)",
    description: "Krok po kroku: jak napisać reklamację do sklepu internetowego z powołaniem na art. 43b ustawy o prawach konsumenta. Sklep ma 14 dni na odpowiedź — brak odpowiedzi to uznanie reklamacji.",
    date: "2026-06-01",
    readTime: "5 min",
    category: "Sklep internetowy",
  },
  {
    slug: "reklamacja-allegro",
    title: "Reklamacja na Allegro — co zrobić gdy sprzedawca odmawia (2026)",
    description: "Sprzedawca na Allegro odrzucił Twoją reklamację? Dowiedz się jakie masz prawa jako konsument i jak napisać pismo które zmusi go do odpowiedzi w 14 dniach.",
    date: "2026-06-02",
    readTime: "6 min",
    category: "Allegro",
  },
  {
    slug: "bank-odmawia-zwrotu",
    title: "Bank odmawia zwrotu pieniędzy — Twoje prawa i jak je egzekwować",
    description: "Nieautoryzowana transakcja, błędny przelew lub naliczona opłata? Bank ma obowiązek zwrotu z art. 45 ustawy o usługach płatniczych. Jak napisać skuteczne pismo do banku.",
    date: "2026-06-03",
    readTime: "5 min",
    category: "Bank",
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug);
}
