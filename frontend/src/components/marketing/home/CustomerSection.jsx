import Image from "next/image";
import Link from "next/link";
import phoneImg from "@/assets/screens/mobileApp-Mockup.png";
import appleImg from "@/assets/redirections/applestore-image.png";
import playImg from "@/assets/redirections/playstore-image.png";
import { customerFeatures } from "@/data/landing";

/** Store badge dimensions — tweak width/height per badge to balance uneven assets */
const STORE_BADGES = {
  apple: { width: 168, height: 152 },
  google: { width: 168, height: 155 },
};

export default function CustomerSection() {
  return (
    <section
      id="customers"
      style={{
        width: "100%",
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
        padding: "120px 0",
      }}
    >
      {/* ── Blobs ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 640,
          height: 640,
          borderRadius: "58% 42% 62% 38% / 44% 56% 44% 56%",
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(220,38,38,0.18) 0%, rgba(185,28,28,0.08) 55%, transparent 100%)",
          filter: "blur(80px)",
          top: "-160px",
          right: "-180px",
          pointerEvents: "none",
          animation: "blob-drift-1 14s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 540,
          height: 540,
          borderRadius: "45% 55% 36% 64% / 60% 40% 60% 40%",
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(29,185,84,0.15) 0%, rgba(29,185,84,0.06) 55%, transparent 100%)",
          filter: "blur(80px)",
          bottom: "-140px",
          left: "-150px",
          pointerEvents: "none",
          animation: "blob-drift-2 18s ease-in-out infinite alternate",
        }}
      />

      {/* ── Content ── */}
      <div
        className="cs-inner"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          gap: 64,
        }}
      >
        {/* LEFT — Copy */}
        <div className="cs-copy" style={{ flex: "0 0 48%", maxWidth: 520 }}>
          {/* Eyebrow pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(220,38,38,0.12)",
              border: "1px solid rgba(220,38,38,0.28)",
              borderRadius: 100,
              padding: "6px 16px",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#DC2626",
                flexShrink: 0,
                animation: "pulse 2s infinite",
              }}
            />
            <span
              className="font-jakarta"
              style={{ fontSize: 12, fontWeight: 600, color: "#DC2626", letterSpacing: "0.08em" }}
            >
              For Customers
            </span>
          </div>

          {/* Stacked headline */}
          <h2
            className="font-jakarta"
            style={{
              fontSize: "clamp(42px, 5.5vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            <span style={{ color: "#FFFFFF", display: "block" }}>Think it..</span>
            <span style={{ color: "#DC2626", display: "block" }}>Crave it..</span>
            <span style={{ color: "#FFFFFF", display: "block" }}>Order it.</span>
          </h2>

          {/* Subheadline */}
          <p
            className="font-jakarta"
            style={{
              fontSize: "clamp(14px, 1.5vw, 16px)",
              color: "rgba(255,255,255,0.50)",
              lineHeight: 1.75,
              marginBottom: 28,
              maxWidth: 420,
            }}
          >
            Local restaurants, real food, delivered fast. Starting from ₦1,000.
          </p>

          {/* Feature bullets */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 36px 0",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {customerFeatures.map((f) => (
              <li
                key={f}
                className="font-jakarta"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.70)",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(220,38,38,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.5 5.5L3.5 7.5L8.5 2.5"
                      stroke="#DC2626"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* Store CTAs — badge images (adjust STORE_BADGES above) */}
          <div
            className="cs-store-badges"
            style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
          >
            <Link
              href="#"
              aria-label="Download on the App Store"
              className="cs-store-link"
              style={{
                display: "block",
                width: STORE_BADGES.apple.width,
                height: STORE_BADGES.apple.height,
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src={appleImg}
                alt="Download on the App Store"
                fill
                sizes={`${STORE_BADGES.apple.width}px`}
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </Link>
            <Link
              href="#"
              aria-label="Get it on Google Play"
              className="cs-store-link"
              style={{
                display: "block",
                width: STORE_BADGES.google.width,
                height: STORE_BADGES.google.height,
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src={playImg}
                alt="Get it on Google Play"
                fill
                sizes={`${STORE_BADGES.google.width}px`}
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </Link>
          </div>
        </div>

        {/* RIGHT — Phone mockup */}
        <div
          className="cs-mockup"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(220,38,38,0.14) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 300,
              animation: "hero-float 6s ease-in-out infinite",
              filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.70))",
            }}
          >
            <Image
              src={phoneImg}
              alt="EatUp customer app"
              style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .cs-inner {
            flex-direction: column !important;
            padding: 0 24px !important;
            text-align: center;
            gap: 48px;
          }
          .cs-copy {
            max-width: 100% !important;
            flex: 1 !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .cs-store-badges {
            justify-content: center;
          }
          ul {
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
