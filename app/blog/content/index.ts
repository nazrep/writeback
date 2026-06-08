import type { FC } from "react";
import ReklamacjaZalando from "./reklamacja-zalando";
import ReklamacjaDoUbezpieczyciela from "./reklamacja-do-ubezpieczyciela";
import ReklamacjaDewelopera from "./reklamacja-dewelopera";
import OdwolanieOdDecyzjiZus from "./odwolanie-od-decyzji-zus";
import WezwanieDoZaplaty from "./wezwanie-do-zaplaty";
import ReklamacjaUslugi from "./reklamacja-uslugi";
import OdszkodowanieZaOpoznionyLot from "./odszkodowanie-za-opozniony-lot";
import ReklamacjaOdrzucona from "./reklamacja-odrzucona";
import ReklamacjaSklepInternetowy from "./reklamacja-sklep-internetowy";
import ReklamacjaAllegro from "./reklamacja-allegro";
import BankOdmawaZwrotu from "./bank-odmawia-zwrotu";
import WypowiedzienieUmowyAbonamentowej from "./wypowiedzenie-umowy-abonamentowej";
import ReklamacjaMediaExpert from "./reklamacja-media-expert";
import ReklamacjaRtvEuroAgd from "./reklamacja-rtv-euro-agd";
import ReklamacjaTelefonu from "./reklamacja-telefonu";
import ZwrotOdKuriera from "./zwrot-od-kuriera";
import WypowiedzeniesilowniaI from "./wypowiedzenie-silownia";
import ReklamacjaSklepInternetowyEn from "./reklamacja-sklep-internetowy.en";
import ReklamacjaAllegroEn from "./reklamacja-allegro.en";
import BankOdmawaZwrotuEn from "./bank-odmawia-zwrotu.en";
import WypowiedzienieUmowyAbonamentowejEn from "./wypowiedzenie-umowy-abonamentowej.en";
import ReklamacjaMediaExpertEn from "./reklamacja-media-expert.en";
import ReklamacjaRtvEuroAgdEn from "./reklamacja-rtv-euro-agd.en";
import ReklamacjaTelefonuEn from "./reklamacja-telefonu.en";
import ZwrotOdKurieraEn from "./zwrot-od-kuriera.en";
import WypowiedzeniesilowniaIEn from "./wypowiedzenie-silownia.en";

const CONTENT: Record<string, FC> = {
  "reklamacja-zalando": ReklamacjaZalando,
  "reklamacja-do-ubezpieczyciela": ReklamacjaDoUbezpieczyciela,
  "reklamacja-dewelopera": ReklamacjaDewelopera,
  "odwolanie-od-decyzji-zus": OdwolanieOdDecyzjiZus,
  "wezwanie-do-zaplaty": WezwanieDoZaplaty,
  "reklamacja-uslugi": ReklamacjaUslugi,
  "odszkodowanie-za-opozniony-lot": OdszkodowanieZaOpoznionyLot,
  "reklamacja-odrzucona": ReklamacjaOdrzucona,
  "reklamacja-sklep-internetowy": ReklamacjaSklepInternetowy,
  "reklamacja-allegro": ReklamacjaAllegro,
  "bank-odmawia-zwrotu": BankOdmawaZwrotu,
  "wypowiedzenie-umowy-abonamentowej": WypowiedzienieUmowyAbonamentowej,
  "reklamacja-media-expert": ReklamacjaMediaExpert,
  "reklamacja-rtv-euro-agd": ReklamacjaRtvEuroAgd,
  "reklamacja-telefonu": ReklamacjaTelefonu,
  "zwrot-od-kuriera": ZwrotOdKuriera,
  "wypowiedzenie-silownia": WypowiedzeniesilowniaI,
};

const CONTENT_EN: Record<string, FC> = {
  "reklamacja-sklep-internetowy": ReklamacjaSklepInternetowyEn,
  "reklamacja-allegro": ReklamacjaAllegroEn,
  "bank-odmawia-zwrotu": BankOdmawaZwrotuEn,
  "wypowiedzenie-umowy-abonamentowej": WypowiedzienieUmowyAbonamentowejEn,
  "reklamacja-media-expert": ReklamacjaMediaExpertEn,
  "reklamacja-rtv-euro-agd": ReklamacjaRtvEuroAgdEn,
  "reklamacja-telefonu": ReklamacjaTelefonuEn,
  "zwrot-od-kuriera": ZwrotOdKurieraEn,
  "wypowiedzenie-silownia": WypowiedzeniesilowniaIEn,
};

export function getContent(slug: string, lang = "pl"): FC | null {
  if (lang === "en") return CONTENT_EN[slug] ?? null;
  return CONTENT[slug] ?? null;
}
