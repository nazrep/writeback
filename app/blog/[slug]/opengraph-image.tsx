import { ImageResponse } from "next/og";
import { getPost, POSTS } from "../posts";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  const title = post?.title ?? "Writeback — pisma konsumenckie";
  const category = post?.category ?? "Poradnik";
  const readTime = post?.readTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "64px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 800,
                fontSize: 24,
              }}
            >
              W
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: 20, letterSpacing: "-0.3px" }}>
              writeback.pl
            </span>
          </div>

          {/* Category badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: 999,
              padding: "6px 16px",
              marginBottom: 24,
              alignSelf: "flex-start",
            }}
          >
            <span style={{ color: "#a5b4fc", fontWeight: 600, fontSize: 14, letterSpacing: "0.5px" }}>
              {category}{readTime ? `  ·  ${readTime} czytania` : ""}
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: title.length > 60 ? 40 : 48,
              lineHeight: 1.2,
              flex: 1,
              maxWidth: 900,
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 24,
              marginTop: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                M
              </div>
              <span style={{ color: "#94a3b8", fontSize: 15 }}>Maciej Perzankowski</span>
            </div>
            <span style={{ color: "#475569", fontSize: 14 }}>Prawa konsumenta · Polska</span>
          </div>

        </div>
      </div>
    ),
    { ...size }
  );
}
