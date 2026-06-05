import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(req: NextRequest) {
  const data = await req.json();

  const prompt = `Na podstawie poniższych danych napisz 4-5 krótkich punktów (każdy max 1 zdanie) opisujących CO będzie zawierać pismo reklamacyjne. Bądź konkretny — wymień artykuły ustaw, kwoty, daty i żądania z danych.

TYP: ${data.doc_type || "sklep"}
PRODUKT/PRZEDMIOT: ${data.produkt}
${data.cena ? `KWOTA: ${data.cena} zł` : ""}
${data.data_zakupu ? `DATA: ${data.data_zakupu}` : ""}
ADRESAT: ${data.nazwa_sklepu}
SYTUACJA: ${data.opis}
ŻĄDANIE: ${data.zadanie}

Odpowiedz TYLKO jako JSON: {"points": ["punkt 1", "punkt 2", "punkt 3", "punkt 4"]}
Nie używaj markdownu, nie dodawaj nic poza JSON.`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (msg.content[0] as { type: string; text: string }).text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("no json");
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ points: parsed.points ?? [] });
  } catch {
    return NextResponse.json({ points: [] }, { status: 200 });
  }
}
