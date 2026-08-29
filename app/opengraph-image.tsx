import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3f3f46, #a1a1aa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: "#0a0a0a" }}>{SITE.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#0a0a0a", lineHeight: 1.1 }}>
            {SITE.tagline}
          </div>
          <div style={{ fontSize: 28, color: "#71717a" }}>
            AI/ML · Apps · Web · Automations · Chatbots
          </div>
        </div>
      </div>
    ),
    size,
  );
}
