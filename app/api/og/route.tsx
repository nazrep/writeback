import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getPost } from "../../blog/posts";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "";
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
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
        }}
      >
        {/* top accent bar */}
        <div style={{ width: "100%", height: 12, background: "#4f46e5", display: "flex" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "52px 72px 48px",
            height: "100%",
          }}
        >
          {/* logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
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
            <span style={{ color: "#1e293b", fontWeight: 700, fontSize: 22 }}>
              writeback.pl
            </span>
          </div>

          {/* category badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#eef2ff",
              borderRadius: 999,
              padding: "6px 18px",
              marginBottom: 28,
              alignSelf: "flex-start",
            }}
          >
            <span style={{ color: "#4f46e5", fontWeight: 700, fontSize: 16 }}>
              {category}{readTime ? `  ·  ${readTime} czytania` : ""}
            </span>
          </div>

          {/* title */}
          <div
            style={{
              color: "#0f172a",
              fontWeight: 800,
              fontSize: title.length > 60 ? 42 : 52,
              lineHeight: 1.2,
              flex: 1,
              maxWidth: 960,
            }}
          >
            {title}
          </div>

          {/* footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "2px solid #f1f5f9",
              paddingTop: 24,
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
              <span style={{ color: "#64748b", fontSize: 16 }}>Maciej Perzankowski</span>
            </div>
            <span style={{ color: "#94a3b8", fontSize: 15 }}>Prawa konsumenta · Polska</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
