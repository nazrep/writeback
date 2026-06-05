import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const getAnthropic = () => new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(req: NextRequest) {
  let body: { image_base64: string; doc_type?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { image_base64 } = body;
  if (!image_base64) return NextResponse.json({ error: "No image" }, { status: 400 });

  try {
    const response = await getAnthropic().messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: "image/jpeg", data: image_base64 },
          },
          {
            type: "text",
            text: `Przeanalizuj ten dokument (paragon, faktura, email z potwierdzeniem zamówienia, zdjęcie produktu itp.) i wyodrębnij dane. Odpowiedz TYLKO w formacie JSON, bez żadnego tekstu poza JSON-em:
{
  "produkt": "nazwa produktu lub usługi (max 100 znaków, lub null)",
  "cena": "kwota jako string np. '299.99' (tylko cyfry i kropka, lub null)",
  "data_zakupu": "data w formacie YYYY-MM-DD (lub null)",
  "numer_zamowienia": "numer zamówienia lub faktury (lub null)",
  "nazwa_sklepu": "nazwa firmy/sprzedawcy (lub null)",
  "adres_sklepu": "adres firmy (lub null)",
  "opis_extra": "1 zdanie co wynika z dokumentu w kontekście reklamacji (lub null)"
}
Jeśli danej wartości nie widać na zdjęciu, wstaw null.`,
          },
        ],
      }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text.trim() : "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const extracted = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    return NextResponse.json(extracted);
  } catch (err) {
    console.error("Image extraction error:", err);
    return NextResponse.json({ error: "Extraction failed" }, { status: 500 });
  }
}
