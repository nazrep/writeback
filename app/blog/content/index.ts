import type { FC } from "react";
import ReklamacjaSklepInternetowy from "./reklamacja-sklep-internetowy";
import ReklamacjaAllegro from "./reklamacja-allegro";
import BankOdmawaZwrotu from "./bank-odmawia-zwrotu";
import WypowiedzienieUmowyAbonamentowej from "./wypowiedzenie-umowy-abonamentowej";

const CONTENT: Record<string, FC> = {
  "reklamacja-sklep-internetowy": ReklamacjaSklepInternetowy,
  "reklamacja-allegro": ReklamacjaAllegro,
  "bank-odmawia-zwrotu": BankOdmawaZwrotu,
  "wypowiedzenie-umowy-abonamentowej": WypowiedzienieUmowyAbonamentowej,
};

export function getContent(slug: string): FC | null {
  return CONTENT[slug] ?? null;
}
