import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mercora";
export const size = {
  width: 1200,
  height: 675,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background:
            "radial-gradient(circle at top right, rgba(37,99,235,0.24), transparent 26%), linear-gradient(135deg, #040A18 0%, #091227 54%, #0D1B3C 100%)",
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
            padding: "60px 68px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                height: 58,
                width: 58,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #5b3df5 0%, #3b82f6 100%)",
                fontSize: 28,
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
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                MERCORA
              </div>
              <div
                style={{
                  fontSize: 15,
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
              maxWidth: 900,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              Build. Sell. Get Paid.
            </div>

            <div
              style={{
                marginTop: 24,
                fontSize: 24,
                lineHeight: 1.5,
                color: "#cbd5e1",
                maxWidth: 860,
              }}
            >
              Storefronts, payments, receipts, and settlement visibility
              built for serious merchants.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            {["Storefronts", "Payments", "Receipts"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "11px 18px",
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