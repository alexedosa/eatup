"use client";

import Link from "next/link";
import { riderFeatures } from "@/data/landing";

const INK  = "#0A0A0A";
const BLUE = "#2563EB";
const MUTED = "#888888";

export default function RiderSection() {
  return (
    <section
      id="riders"
      style={{ width: "100%", background: "#FFFFFF", padding: "120px 0" }}
    >
      {/* Section label */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px", marginBottom: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BLUE, fontFamily: "var(--font-jakarta)" }}>
            For Riders
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
        </div>
      </div>

      {/* Content row */}
      <div className="rs-inner" style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 64px",
        display: "flex", alignItems: "flex-start", gap: 80,
      }}>

        {/* LEFT — Features */}
        <div className="rs-features" style={{ flex: 1 }}>
          {/* Earnings callout */}
          <div style={{
            background: "#F5F4F0",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 16,
            padding: "28px 28px",
            marginBottom: 36,
            display: "flex", alignItems: "center", gap: 20,
          }}>
            <div>
              <p className="font-jakarta" style={{
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 800, letterSpacing: "-0.04em",
                color: INK, lineHeight: 1,
              }}>₦12,400</p>
              <p className="font-jakarta" style={{
                fontSize: 12, fontWeight: 600,
                color: MUTED, marginTop: 4,
              }}>
                24 deliveries · top rider today
              </p>
            </div>
            <div style={{ width: 1, height: 48, background: "rgba(0,0,0,0.09)", flexShrink: 0 }} />
            <p className="font-jakarta" style={{
              fontSize: 13, color: "#444", lineHeight: 1.5, fontWeight: 400,
            }}>
              Your schedule, your vehicle, your terms. Earn per delivery.
            </p>
          </div>

          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {riderFeatures.map((f, i) => (
              <li key={f} style={{
                display: "flex", alignItems: "flex-start", gap: 20,
                padding: "18px 0",
                borderBottom: i < riderFeatures.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              }}>
                <span className="font-jakarta" style={{
                  fontSize: 11, fontWeight: 700, color: BLUE,
                  letterSpacing: "0.06em", minWidth: 24, paddingTop: 2,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-jakarta" style={{
                  fontSize: 15, fontWeight: 500, color: "#333", lineHeight: 1.55,
                }}>
                  {f}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* RIGHT — Headline + CTA */}
        <div className="rs-copy" style={{ flex: "0 0 42%", maxWidth: 460 }}>
          <h2 className="font-heading" style={{
            fontSize: "clamp(40px, 5.8vw, 76px)",
            fontWeight: 700, lineHeight: 0.96,
            letterSpacing: "-0.04em",
            color: INK, marginBottom: 24,
          }}>
            Go online.
            <br />
            <span style={{ color: BLUE }}>Pick up.</span>
            <br />
            Earn.
          </h2>

          <p className="font-jakarta" style={{
            fontSize: "clamp(14px, 1.4vw, 16px)",
            color: MUTED, lineHeight: 1.75,
            marginBottom: 36, maxWidth: 360,
          }}>
            Your schedule. Your vehicle. Your terms. Earn per delivery, paid straight to your account.
          </p>

          <Link href="/auth/rider/signup" className="font-jakarta rs-cta" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: BLUE, color: "#fff",
            padding: "13px 26px", borderRadius: 100,
            fontSize: 14, fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.2s, transform 0.2s",
            letterSpacing: "-0.01em",
          }}
          >
            Sign up as a rider
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        .rs-cta:hover {
          background: #1D4ED8 !important;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .rs-inner    { flex-direction: column-reverse !important; padding: 0 24px !important; gap: 52px !important; }
          .rs-copy     { max-width: 100% !important; flex: unset !important; }
          .rs-features { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
