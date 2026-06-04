import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Writeback — Reklamacja z podstawami prawnymi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{
            background: "#4f46e5",
            borderRadius: 12,
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 700,
            color: "white",
          }}>W</div>
          <div style={{ color: "#a5b4fc", fontSize: 28, fontWeight: 600, letterSpacing: "-0.5px" }}>
            writeback.pl
          </div>
        </div>
        <div style={{
          color: "white",
          fontSize: 68,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-2px",
          maxWidth: 900,
        }}>
          Sklep Cię zignorował?
        </div>
        <div style={{
          color: "#c7d2fe",
          fontSize: 34,
          marginTop: 20,
          textAlign: "center",
          lineHeight: 1.3,
        }}>
          Napisz pismo które muszą przeczytać.
        </div>
        <div style={{
          display: "flex",
          gap: 24,
          marginTop: 56,
        }}>
          <div style={{
            background: "#4f46e5",
            color: "white",
            padding: "18px 48px",
            borderRadius: 14,
            fontSize: 24,
            fontWeight: 600,
          }}>
            Gotowe pismo PDF · 29 zł
          </div>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            color: "#c7d2fe",
            padding: "18px 40px",
            borderRadius: 14,
            fontSize: 24,
            fontWeight: 500,
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            Przepisy prawa polskiego
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
