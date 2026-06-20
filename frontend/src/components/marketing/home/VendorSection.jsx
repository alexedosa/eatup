"use client";

import Link from "next/link";
import { vendorFeatures } from "@/data/landing";

const INK   = "#0A0A0A";
const GREEN = "#0D7A3E";
const MUTED = "#888888";

export default function VendorSection() {
  return (
    <section
      id="restaurants"
      style={{ width: "100%", background: "#F5F4F0", padding: "120px 0" }}
    >
      {/* Section label */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN, fontFamily: "var(--font-jakarta)" }}>
            For Restaurants
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
        </div>
      </div>

      {/* Intro */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px", marginBottom: 80 }}>
        <p className="font-jakarta" style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: GREEN, marginBottom: 20,
        }}>
          Built for the kitchen, not just delivery
        </p>
        <h2 className="font-heading" style={{
          fontSize: "clamp(32px, 4.8vw, 62px)",
          fontWeight: 700, lineHeight: 1.04,
          letterSpacing: "-0.04em",
          color: INK,
          maxWidth: 760,
        }}>
          Running a restaurant is hard.{" "}
          <span style={{ color: GREEN }}>Your platform shouldn't be.</span>
        </h2>
        <p className="font-jakarta" style={{
          fontSize: "clamp(14px, 1.4vw, 16px)",
          color: MUTED, lineHeight: 1.75,
          maxWidth: 560, marginTop: 20,
        }}>
          EatUp gives you orders, analytics, menu control, Paystack settlements, and team
          management — all in one place. Built from the ground up for Nigerian kitchens.
        </p>
      </div>

      {/* Content row */}
      <div className="vs-inner" style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 64px",
        display: "flex", alignItems: "flex-start", gap: 80,
      }}>

        {/* LEFT — Headline + sub */}
        <div className="vs-copy" style={{ flex: "0 0 44%", maxWidth: 480 }}>
          <h2 className="font-heading" style={{
            fontSize: "clamp(40px, 5.8vw, 76px)",
            fontWeight: 700, lineHeight: 0.96,
            letterSpacing: "-0.04em",
            color: INK, marginBottom: 24,
          }}>
            List it.
            <br />
            <span style={{ color: GREEN }}>Cook it.</span>
            <br />
            Get paid.
          </h2>

          <p className="font-jakarta" style={{
            fontSize: "clamp(14px, 1.4vw, 16px)",
            color: MUTED, lineHeight: 1.75,
            marginBottom: 36, maxWidth: 380,
          }}>
            Not just delivery. A full operating system for your restaurant — built for Nigeria.
          </p>

          <Link href="/auth/vendor/register" className="font-jakarta vs-cta" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: INK, color: "#fff",
            padding: "13px 26px", borderRadius: 100,
            fontSize: 14, fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.2s, transform 0.2s",
            letterSpacing: "-0.01em",
          }}
          >
            Register your restaurant
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <p className="font-jakarta" style={{
            fontSize: 11, fontWeight: 500,
            color: "rgba(0,0,0,0.30)", letterSpacing: "0.04em",
            marginTop: 16,
          }}>
            CAC verified · Paystack settlements · Free to list
          </p>
        </div>

        {/* RIGHT — Numbered feature list */}
        <div className="vs-features" style={{ flex: 1 }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {vendorFeatures.map((f, i) => (
              <li key={f} style={{
                display: "flex", alignItems: "flex-start", gap: 20,
                padding: "20px 0",
                borderBottom: i < vendorFeatures.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              }}>
                <span className="font-jakarta" style={{
                  fontSize: 11, fontWeight: 700,
                  color: GREEN, letterSpacing: "0.06em",
                  minWidth: 24, paddingTop: 2,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-jakarta" style={{
                  fontSize: 15, fontWeight: 500,
                  color: "#333", lineHeight: 1.55,
                }}>
                  {f}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .vs-cta:hover {
          background: ${GREEN} !important;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .vs-inner    { flex-direction: column !important; padding: 0 24px !important; gap: 52px !important; }
          .vs-copy     { max-width: 100% !important; flex: unset !important; }
          .vs-features { width: 100% !important; }
        }
        @media (max-width: 640px) {
          .vs-inner { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}
