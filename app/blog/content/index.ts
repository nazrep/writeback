import type { FC } from "react";
import ReklamacjaSklepInternetowy from "./reklamacja-sklep-internetowy";
import ReklamacjaAllegro from "./reklamacja-allegro";
import BankOdmawaZwrotu from "./bank-odmawia-zwrotu";

const CONTENT: Record<string, FC> = {
  "reklamacja-sklep-internetowy": ReklamacjaSklepInternetowy,
  "reklamacja-allegro": ReklamacjaAllegro,
  "bank-odmawia-zwrotu": BankOdmawaZwrotu,
};

export function getContent(slug: string): FC | null {
  return CONTENT[slug] ?? null;
}
