import type { FC } from "react";

// PL
import ReklamacjaSamochoduZKomisu from "./reklamacja-samochodu-z-komisu";
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
import WypowiedzenieSilownia from "./wypowiedzenie-silownia";
import ReklamacjaOperatora from "./reklamacja-operatora";
import ReklamacjaFirmyEnergetycznej from "./reklamacja-firmy-energetycznej";
import ZakupNaRatyZwrot from "./zakup-na-raty-zwrot";
import SkargaDoUokik from "./skarga-do-uokik";
import OdwolanieOdMandatu from "./odwolanie-od-mandatu";
import ReklamacjaAmazon from "./reklamacja-amazon";
import ReklamacjaIkea from "./reklamacja-ikea";
import ReklamacjaShein from "./reklamacja-shein";
import ReklamacjaTemu from "./reklamacja-temu";
import ReklamacjaLeroyMerlin from "./reklamacja-leroy-merlin";
import ReklamacjaMorele from "./reklamacja-morele";
import ReklamacjaHm from "./reklamacja-hm";
import ReklamacjaZara from "./reklamacja-zara";
import ReklamacjaRossmann from "./reklamacja-rossmann";
import ReklamacjaLidl from "./reklamacja-lidl";
import ReklamacjaEmpik from "./reklamacja-empik";
import ReklamacjaDecathlon from "./reklamacja-decathlon";
import ReklamacjaAction from "./reklamacja-action";
import ReklamacjaPepco from "./reklamacja-pepco";
import ReklamacjaReserved from "./reklamacja-reserved";
import ReklamacjaApart from "./reklamacja-apart";
import ReklamacjaBiedronka from "./reklamacja-biedronka";
import ReklamacjaXKom from "./reklamacja-x-kom";
import ReklamacjaCastorama from "./reklamacja-castorama";
import ReklamacjaHomeYou from "./reklamacja-home-you";

// EN
import ReklamacjaSamochoduZKomisuEn from "./reklamacja-samochodu-z-komisu.en";
import ReklamacjaZalandoEn from "./reklamacja-zalando.en";
import ReklamacjaDoUbezpieczycielaEn from "./reklamacja-do-ubezpieczyciela.en";
import ReklamacjaDeweloperaEn from "./reklamacja-dewelopera.en";
import OdwolanieOdDecyzjiZusEn from "./odwolanie-od-decyzji-zus.en";
import WezwanieDoZaplatyEn from "./wezwanie-do-zaplaty.en";
import ReklamacjaUslugiEn from "./reklamacja-uslugi.en";
import OdszkodowanieZaOpoznionyLotEn from "./odszkodowanie-za-opozniony-lot.en";
import ReklamacjaSklepInternetowyEn from "./reklamacja-sklep-internetowy.en";
import ReklamacjaAllegroEn from "./reklamacja-allegro.en";
import BankOdmawaZwrotuEn from "./bank-odmawia-zwrotu.en";
import WypowiedzienieUmowyAbonamentowejEn from "./wypowiedzenie-umowy-abonamentowej.en";
import ReklamacjaMediaExpertEn from "./reklamacja-media-expert.en";
import ReklamacjaRtvEuroAgdEn from "./reklamacja-rtv-euro-agd.en";
import ReklamacjaTelefonuEn from "./reklamacja-telefonu.en";
import ZwrotOdKurieraEn from "./zwrot-od-kuriera.en";
import WypowiedzenieSilowniaEn from "./wypowiedzenie-silownia.en";
import ReklamacjaOperatoraEn from "./reklamacja-operatora.en";
import ReklamacjaFirmyEnergetycznejEn from "./reklamacja-firmy-energetycznej.en";

const CONTENT: Record<string, FC> = {
  "reklamacja-samochodu-z-komisu": ReklamacjaSamochoduZKomisu,
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
  "wypowiedzenie-silownia": WypowiedzenieSilownia,
  "reklamacja-operatora": ReklamacjaOperatora,
  "reklamacja-firmy-energetycznej": ReklamacjaFirmyEnergetycznej,
  "zakup-na-raty-zwrot": ZakupNaRatyZwrot,
  "skarga-do-uokik": SkargaDoUokik,
  "odwolanie-od-mandatu": OdwolanieOdMandatu,
  "reklamacja-amazon": ReklamacjaAmazon,
  "reklamacja-ikea": ReklamacjaIkea,
  "reklamacja-shein": ReklamacjaShein,
  "reklamacja-temu": ReklamacjaTemu,
  "reklamacja-leroy-merlin": ReklamacjaLeroyMerlin,
  "reklamacja-morele": ReklamacjaMorele,
  "reklamacja-hm": ReklamacjaHm,
  "reklamacja-zara": ReklamacjaZara,
  "reklamacja-rossmann": ReklamacjaRossmann,
  "reklamacja-lidl": ReklamacjaLidl,
  "reklamacja-empik": ReklamacjaEmpik,
  "reklamacja-decathlon": ReklamacjaDecathlon,
  "reklamacja-action": ReklamacjaAction,
  "reklamacja-pepco": ReklamacjaPepco,
  "reklamacja-reserved": ReklamacjaReserved,
  "reklamacja-apart": ReklamacjaApart,
  "reklamacja-biedronka": ReklamacjaBiedronka,
  "reklamacja-x-kom": ReklamacjaXKom,
  "reklamacja-castorama": ReklamacjaCastorama,
  "reklamacja-home-you": ReklamacjaHomeYou,
};

const CONTENT_EN: Record<string, FC> = {
  "reklamacja-samochodu-z-komisu": ReklamacjaSamochoduZKomisuEn,
  "reklamacja-zalando": ReklamacjaZalandoEn,
  "reklamacja-do-ubezpieczyciela": ReklamacjaDoUbezpieczycielaEn,
  "reklamacja-dewelopera": ReklamacjaDeweloperaEn,
  "odwolanie-od-decyzji-zus": OdwolanieOdDecyzjiZusEn,
  "wezwanie-do-zaplaty": WezwanieDoZaplatyEn,
  "reklamacja-uslugi": ReklamacjaUslugiEn,
  "odszkodowanie-za-opozniony-lot": OdszkodowanieZaOpoznionyLotEn,
  "reklamacja-sklep-internetowy": ReklamacjaSklepInternetowyEn,
  "reklamacja-allegro": ReklamacjaAllegroEn,
  "bank-odmawia-zwrotu": BankOdmawaZwrotuEn,
  "wypowiedzenie-umowy-abonamentowej": WypowiedzienieUmowyAbonamentowejEn,
  "reklamacja-media-expert": ReklamacjaMediaExpertEn,
  "reklamacja-rtv-euro-agd": ReklamacjaRtvEuroAgdEn,
  "reklamacja-telefonu": ReklamacjaTelefonuEn,
  "zwrot-od-kuriera": ZwrotOdKurieraEn,
  "wypowiedzenie-silownia": WypowiedzenieSilowniaEn,
  "reklamacja-operatora": ReklamacjaOperatoraEn,
  "reklamacja-firmy-energetycznej": ReklamacjaFirmyEnergetycznejEn,
};

export function getContent(slug: string, lang = "pl"): FC | null {
  if (lang === "en") return CONTENT_EN[slug] ?? null;
  return CONTENT[slug] ?? null;
}
