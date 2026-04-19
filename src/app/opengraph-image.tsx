import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mercora";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.22), transparent 30%), linear-gradient(135deg, #040A18 0%, #091227 48%, #0D1B3C 100%)",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                height: 64,
                width: 64,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #5b3df5 0%, #3b82f6 100%)",
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              M
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                MERCORA
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "#cbd5e1",
                }}
              >
                Commerce infrastructure for modern merchants
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 860,
            }}
          >
            <div
              style={{
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              Storefronts, Payments & Receipts.
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              All in One System.
            </div>

            <div
              style={{
                marginTop: 28,
                fontSize: 24,
                lineHeight: 1.5,
                color: "#cbd5e1",
                maxWidth: 900,
              }}
            >
              Mercora helps merchants launch storefronts, manage payments,
              issue receipts, and track settlement visibility with confidence.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {["Storefronts", "Payments", "Receipts", "Settlements"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "12px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: 18,
                  color: "#e2e8f0",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}