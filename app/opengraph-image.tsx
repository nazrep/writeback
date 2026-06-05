import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Writeback — pisma z podstawą prawną";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div style={{
          position: "absolute",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.35) 0%, transparent 70%)",
          display: "flex",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 56 }}>
          <div style={{
            background: "#4f46e5",
            borderRadius: 10,
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 800,
            color: "white",
          }}>W</div>
          <span style={{ color: "#94a3b8", fontSize: 22, fontWeight: 600, letterSpacing: "-0.3px" }}>
            writeback.pl
          </span>
        </div>

        {/* Headline */}
        <div style={{
          color: "white",
          fontSize: 86,
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: "-3px",
          marginBottom: 24,
          display: "flex",
          flexDirection: "column",
        }}>
          <span>Zignorowali Cię?</span>
          <span style={{ color: "#818cf8" }}>Napisz pismo,</span>
          <span style={{ color: "#818cf8" }}>które muszą przeczytać.</span>
        </div>

        {/* Subline */}
        <div style={{
          color: "#64748b",
          fontSize: 26,
          fontWeight: 500,
          marginTop: 8,
          display: "flex",
        }}>
          Sklep · Bank · ZUS · Operator · PDF w 5 minut · 29 zł
        </div>
      </div>
    ),
    { ...size }
  );
}
