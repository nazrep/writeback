import type { FC } from "react";
import ReklamacjaSklepInternetowy from "./reklamacja-sklep-internetowy";
import ReklamacjaAllegro from "./reklamacja-allegro";
import BankOdmawaZwrotu from "./bank-odmawia-zwrotu";
import WypowiedzienieUmowyAbonamentowej from "./wypowiedzenie-umowy-abonamentowej";
import ReklamacjaSklepInternetowyEn from "./reklamacja-sklep-internetowy.en";
import ReklamacjaAllegroEn from "./reklamacja-allegro.en";
import BankOdmawaZwrotuEn from "./bank-odmawia-zwrotu.en";
import WypowiedzienieUmowyAbonamentowejEn from "./wypowiedzenie-umowy-abonamentowej.en";

const CONTENT: Record<string, FC> = {
  "reklamacja-sklep-internetowy": ReklamacjaSklepInternetowy,
  "reklamacja-allegro": ReklamacjaAllegro,
  "bank-odmawia-zwrotu": BankOdmawaZwrotu,
  "wypowiedzenie-umowy-abonamentowej": WypowiedzienieUmowyAbonamentowej,
};

const CONTENT_EN: Record<string, FC> = {
  "reklamacja-sklep-internetowy": ReklamacjaSklepInternetowyEn,
  "reklamacja-allegro": ReklamacjaAllegroEn,
  "bank-odmawia-zwrotu": BankOdmawaZwrotuEn,
  "wypowiedzenie-umowy-abonamentowej": WypowiedzienieUmowyAbonamentowejEn,
};

export function getContent(slug: string, lang = "pl"): FC | null {
  if (lang === "en") return CONTENT_EN[slug] ?? null;
  return CONTENT[slug] ?? null;
}
