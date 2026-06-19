import Link from "next/link";
import VendorMockup from "./VendorMockup";
import { vendorFeatures } from "@/data/landing";

const GREEN = "#1DB954";

export default function VendorSection() {
  return (
    <>
      {/* ── Intro bridge — dark bg, green-tinted divider ── */}
      <div
        style={{
          width: "100%",
          background: "#0A0A0A",
          position: "relative",
          overflow: "hidden",
          padding: "80px 48px 64px",
          textAlign: "center",
        }}
      >
        {/* Thin green line divider */}
        <div style={{
          width: "100%",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(29,185,84,0.35), transparent)",
          marginBottom: 52,
        }} />

        {/* Label */}
        <p className="font-jakarta" style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: GREEN, marginBottom: 16,
        }}>
          Built for the kitchen, not just delivery
        </p>

        {/* Big intro statement */}
        <p className="font-jakarta" style={{
          fontSize: "clamp(28px, 4.5vw, 56px)",
          fontWeight: 800, letterSpacing: "-0.03em",
          lineHeight: 1.08, color: "#FFFFFF",
          maxWidth: 780, margin: "0 auto 20px",
        }}>
          Running a restaurant is hard.{" "}
          <span style={{ color: GREEN }}>Your platform shouldn't be.</span>
        </p>

        <p className="font-jakarta" style={{
          fontSize: "clamp(14px, 1.4vw, 16px)",
          color: "rgba(255,255,255,0.40)",
          lineHeight: 1.8, maxWidth: 520, margin: "0 auto",
        }}>
          EatUp gives you orders, analytics, menu control, Paystack settlements, and team
          management — all in one place. Built from the ground up for Nigerian kitchens.
        </p>
      </div>

      {/* ── Main vendor section — dark bg ── */}
      <section
        id="restaurants"
        style={{
          width: "100%",
          background: "#0A0A0A",
          position: "relative",
          overflow: "hidden",
          padding: "60px 0 120px",
        }}
      >
        {/* Green blob — bottom right */}
        <div aria-hidden="true" style={{
          position: "absolute", width: 520, height: 520, pointerEvents: "none",
          borderRadius: "60% 40% 45% 55% / 48% 55% 45% 52%",
          background: "radial-gradient(ellipse at 40% 40%, rgba(29,185,84,0.18) 0%, rgba(29,185,84,0.08) 50%, transparent 100%)",
          filter: "blur(80px)", bottom: "-150px", right: "-160px",
          animation: "blob-drift-1 14s ease-in-out infinite alternate",
        }} />

        {/* ── Content row — copy left, mockup right ── */}
        <div
          className="vs-inner"
          style={{
            position: "relative", zIndex: 2,
            maxWidth: 1280, margin: "0 auto",
            padding: "0 64px",
            display: "flex",
            alignItems: "center",
            gap: 80,
          }}
        >
          {/* LEFT — Copy */}
          <div className="vs-copy" style={{ flex: "0 0 44%", maxWidth: 480 }}>

            {/* Eyebrow pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(29,185,84,0.10)",
              border: "1px solid rgba(29,185,84,0.28)",
              borderRadius: 100, padding: "6px 16px",
              marginBottom: 28,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: GREEN, flexShrink: 0,
                animation: "pulse 2s infinite",
              }} />
              <span className="font-jakarta" style={{
                fontSize: 12, fontWeight: 600, color: GREEN, letterSpacing: "0.08em",
              }}>
                For Restaurants
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-jakarta" style={{
              fontSize: "clamp(42px, 5.5vw, 68px)",
              fontWeight: 800, lineHeight: 1.04,
              letterSpacing: "-0.03em", marginBottom: 20,
            }}>
              <span style={{ color: "#FFFFFF", display: "block" }}>List it..</span>
              <span style={{ color: GREEN, display: "block" }}>Cook it..</span>
              <span style={{ color: "#FFFFFF", display: "block" }}>Get paid.</span>
            </h2>

            {/* Subheadline */}
            <p className="font-jakarta" style={{
              fontSize: "clamp(14px, 1.5vw, 16px)",
              color: "rgba(255,255,255,0.50)",
              lineHeight: 1.75, marginBottom: 28, maxWidth: 440,
            }}>
              Not just delivery. A full operating system for your restaurant — built for Nigeria.
            </p>

            {/* Features */}
            <ul style={{
              listStyle: "none", padding: 0,
              margin: "0 0 36px 0",
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              {vendorFeatures.map((f) => (
                <li key={f} className="font-jakarta" style={{
                  display: "flex", alignItems: "center", gap: 12,
                  fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.70)",
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "rgba(29,185,84,0.16)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/auth/vendor/register" className="font-jakarta vs-cta">
              Register your restaurant
            </Link>

            {/* Trust line */}
            <p className="font-jakarta" style={{
              fontSize: 12, fontWeight: 500,
              color: "rgba(255,255,255,0.24)",
              letterSpacing: "0.04em",
              marginTop: 16,
            }}>
              CAC verified&nbsp;&nbsp;·&nbsp;&nbsp;Paystack settlements&nbsp;&nbsp;·&nbsp;&nbsp;Free to list
            </p>
          </div>

          {/* RIGHT — Dashboard mockup (animates when scrolled into view) */}
          <VendorMockup />
        </div>
      </section>
    </>
  );
}
