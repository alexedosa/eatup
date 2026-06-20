"use client";

import Image from "next/image";
import Link from "next/link";
import appleImg from "@/assets/redirections/applestore-image.png";
import playImg  from "@/assets/redirections/playstore-image.png";
import { customerFeatures } from "@/data/landing";

const INK    = "#0A0A0A";
const ORANGE = "#FF6B2C";
const MUTED  = "#888888";

const STORE_BADGES = {
  apple:  { width: 148, height: 134 },
  google: { width: 148, height: 137 },
};

export default function CustomerSection() {
  return (
    <section
      id="customers"
      style={{ width: "100%", background: "#FFFFFF", padding: "120px 0" }}
    >
      {/* Section label */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px", marginBottom: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ORANGE, fontFamily: "var(--font-jakarta)" }}>
            For Customers
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
        </div>
      </div>

      {/* Content row */}
      <div className="cs-inner" style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 64px",
        display: "flex", alignItems: "stretch", gap: 80,
      }}>

        {/* LEFT — Headline */}
        <div className="cs-copy" style={{ flex: "0 0 44%", maxWidth: 480 }}>
          <h2 className="font-heading" style={{
            fontSize: "clamp(40px, 5.8vw, 76px)",
            fontWeight: 700, lineHeight: 0.96,
            letterSpacing: "-0.04em",
            color: INK, marginBottom: 24,
          }}>
            Think it.
            <br />
            <span style={{ color: ORANGE }}>Crave it.</span>
            <br />
            Order it.
          </h2>

          <p className="font-jakarta" style={{
            fontSize: "clamp(14px, 1.4vw, 16px)",
            color: MUTED, lineHeight: 1.75,
            marginBottom: 36, maxWidth: 360,
          }}>
            Local restaurants, real food, delivered fast. Starting from ₦1,000.
          </p>

          {/* Store badges */}
          <div className="cs-store-badges" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="#" aria-label="Download on the App Store" style={{
              display: "block", width: STORE_BADGES.apple.width, height: STORE_BADGES.apple.height,
              position: "relative", flexShrink: 0,
            }}>
              <Image src={appleImg} alt="Download on the App Store" fill
                sizes={`${STORE_BADGES.apple.width}px`}
                style={{ objectFit: "contain", objectPosition: "left center" }} />
            </Link>
            <Link href="#" aria-label="Get it on Google Play" style={{
              display: "block", width: STORE_BADGES.google.width, height: STORE_BADGES.google.height,
              position: "relative", flexShrink: 0,
            }}>
              <Image src={playImg} alt="Get it on Google Play" fill
                sizes={`${STORE_BADGES.google.width}px`}
                style={{ objectFit: "contain", objectPosition: "left center" }} />
            </Link>
          </div>
        </div>

        {/* RIGHT — Numbered features */}
        <div className="cs-features" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <ol className="cs-feature-list" style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
            {customerFeatures.map((f, i) => (
              <li key={f} className="cs-feature-item" style={{
                display: "flex", alignItems: "center", gap: 24,
                borderBottom: i < customerFeatures.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              }}>
                <span className="font-heading" style={{
                  fontSize: "clamp(16px, 1.6vw, 22px)",
                  fontWeight: 700,
                  color: ORANGE, letterSpacing: "0.04em",
                  minWidth: 36, flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-jakarta" style={{
                  fontSize: "clamp(17px, 1.9vw, 24px)",
                  fontWeight: 500,
                  color: "#222", lineHeight: 1.4,
                }}>
                  {f}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .cs-feature-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100%;
        }
        .cs-feature-item {
          flex: 1;
          padding: clamp(14px, 2.2vh, 28px) 0;
        }
        @media (max-width: 900px) {
          .cs-inner    { flex-direction: column !important; padding: 0 24px !important; gap: 48px !important; }
          .cs-copy     { max-width: 100% !important; flex: unset !important; }
          .cs-features { width: 100% !important; }
          .cs-feature-list { min-height: unset !important; }
          .cs-feature-item { flex: unset !important; padding: 20px 0 !important; }
          .cs-store-badges { justify-content: flex-start; }
        }
      `}</style>
    </section>
  );
}
