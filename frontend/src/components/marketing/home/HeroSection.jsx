"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import laptopImg from "@/assets/screens/vendorDashboard-Mockup.png";
import phoneImg  from "@/assets/screens/mobileApp-Mockup.png";
import logo      from "@/assets/logo/logo.png";
import { stats }  from "@/data/landing";

const INK    = "#0A0A0A";
const ORANGE = "#FF6B2C";
const MUTED  = "#888888";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 68,
      }}
    >
      {/* Faint logo watermark */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", zIndex: 0,
      }}>
        <div style={{ position: "relative", width: "min(600px, 65vw)", height: "min(600px, 65vw)", opacity: 0.04 }}>
          <Image src={logo} alt="" fill sizes="600px" style={{ objectFit: "contain" }} />
        </div>
      </div>

      {/* Content */}
      <div className="hero-inner" style={{
        maxWidth: 1280, margin: "0 auto",
        width: "100%", padding: "72px 64px 80px",
        display: "flex", alignItems: "center",
        gap: 40, position: "relative", zIndex: 1,
      }}>

        {/* LEFT — Copy */}
        <div className="hero-copy" style={{
          flex: "0 0 46%", maxWidth: 560,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: ORANGE, flexShrink: 0,
              boxShadow: `0 0 0 3px rgba(255,107,44,0.15)`,
            }} />
            <span className="font-jakarta" style={{ fontSize: 12, fontWeight: 600, color: MUTED, letterSpacing: "0.06em" }}>
              Now live · Lagos &amp; Redemption City
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading" style={{
            fontSize: "clamp(44px, 6.5vw, 88px)",
            fontWeight: 700, lineHeight: 0.96,
            letterSpacing: "-0.04em",
            color: INK, marginBottom: 24,
          }}>
            The craving
            hits.
            <span style={{ color: ORANGE }}>We</span>
            <br />
            handle the
            <br />
            rest.
          </h1>

          {/* Sub */}
          <p className="font-jakarta" style={{
            fontSize: "clamp(14px, 1.4vw, 16px)",
            color: MUTED, lineHeight: 1.75,
            maxWidth: 400, marginBottom: 36, fontWeight: 400,
          }}>
            Order from local restaurants, run your kitchen, or earn delivering — all on one platform.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{
            display: "flex", alignItems: "center", gap: 12,
            flexWrap: "wrap", marginBottom: 48,
          }}>
            <Link href="/auth/get-app" className="font-jakarta hero-cta-primary" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: INK, color: "#fff",
              padding: "12px 24px", borderRadius: 100,
              fontSize: 14, fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s, transform 0.2s",
              letterSpacing: "-0.01em", whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = INK; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get the App <ArrowRight />
            </Link>
            <Link href="/auth/role-picker" className="font-jakarta" style={{
              display: "inline-flex", alignItems: "center",
              color: INK, fontSize: 14, fontWeight: 500,
              textDecoration: "none",
              padding: "11px 22px", borderRadius: 100,
              border: "1.5px solid rgba(0,0,0,0.20)",
              background: "transparent",
              transition: "border-color 0.2s, color 0.2s",
              letterSpacing: "-0.01em", whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = INK; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.20)"; }}
            >
              Join EatUp →
            </Link>
          </div>

          {/* Stats — 2×2 grid on mobile, row on desktop */}
          <div className="hero-stats">
            {stats.map((s, i) => (
              <div key={s.label} className="hero-stat-item">
                <span className="font-jakarta" style={{
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  fontWeight: 800, color: INK,
                  letterSpacing: "-0.04em", lineHeight: 1,
                }}>
                  {s.num.includes("₦") ? (
                    <><span style={{ color: ORANGE }}>₦</span>{s.num.replace("₦", "")}</>
                  ) : s.num}
                </span>
                <span className="font-jakarta" style={{
                  fontSize: 10, fontWeight: 600,
                  color: "rgba(0,0,0,0.30)",
                  textTransform: "uppercase", letterSpacing: "0.10em",
                }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Both mockups: laptop (vendor) + phone (customer) */}
        <div className="hero-mockups" style={{
          flex: 1, position: "relative",
          display: "flex", alignItems: "flex-start",
          justifyContent: "center",
          minHeight: 480,
          marginTop: -56,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0) translateY(-24px)" : "translateX(28px) translateY(-8px)",
          transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
        }}>
          {/* Laptop — vendor dashboard */}
          <div style={{
            position: "relative", width: "100%", maxWidth: 540,
            animation: "hero-float 7s ease-in-out infinite",
            filter: "drop-shadow(0 20px 56px rgba(0,0,0,0.10))",
          }}>
            <Image src={laptopImg} alt="EatUp Vendor Dashboard"
              style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
              priority
            />
          </div>

          {/* Phone — customer app, overlapping laptop bottom-right */}
          <div style={{
            position: "absolute",
            right: "-8px", bottom: "-24px",
            width: "28%", zIndex: 3,
            animation: "hero-float-phone 5.5s ease-in-out infinite",
            filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.14))",
          }}>
            <Image src={phoneImg} alt="EatUp Customer App"
              style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
              priority loading="eager"
            />
          </div>
        </div>
      </div>

      <style>{`
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: 0;
          width: fit-content;
        }
        .hero-stat-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-right: 24px;
          margin-right: 24px;
          border-right: 1px solid rgba(0,0,0,0.10);
        }
        .hero-stat-item:last-child {
          padding-right: 0;
          margin-right: 0;
          border-right: none;
        }
        @media (max-width: 960px) {
          .hero-inner {
            flex-direction: column !important;
            padding: 56px 24px 64px !important;
            gap: 52px !important;
            align-items: center !important;
            text-align: center !important;
          }
          .hero-copy {
            flex: unset !important;
            max-width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .hero-ctas {
            justify-content: center !important;
          }
          .hero-stats {
            grid-template-columns: repeat(2, auto) !important;
            gap: 16px 0 !important;
            width: 100% !important;
            justify-content: center !important;
          }
          .hero-stat-item {
            padding-right: 20px !important;
            margin-right: 20px !important;
            align-items: center !important;
          }
          .hero-stat-item:nth-child(2) {
            border-right: none !important;
            padding-right: 0 !important;
            margin-right: 0 !important;
          }
          .hero-stat-item:nth-child(3) {
            border-right: 1px solid rgba(0,0,0,0.10) !important;
            padding-right: 20px !important;
            margin-right: 20px !important;
          }
          .hero-mockups {
            width: 100% !important;
            justify-content: center !important;
            min-height: 300px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-cta-primary { padding: 11px 20px !important; font-size: 13px !important; }
        }
      `}</style>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
