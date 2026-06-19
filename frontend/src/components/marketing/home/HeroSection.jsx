"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import laptopImg from "@/assets/screens/vendorDashboard-Mockup.png";
import phoneImg from "@/assets/screens/mobileApp-Mockup.png";
import logo from "@/assets/logo/logo.png";
import { stats } from "@/data/landing";

export default function HeroSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 80);
    const t2 = setTimeout(() => setStep(2), 520);
    const t3 = setTimeout(() => setStep(3), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingTop: 96,
        paddingBottom: 72,
      }}
    >
      {/* Logo watermark — large, centered, subtly visible through the dark bg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="relative"
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            transform: "translate(-42%, -50%)",
            width: "min(720px, 78vw)",
            height: "min(720px, 78vw)",
            opacity: 0.18,
            mixBlendMode: "screen",
          }}
        >
          <Image
            src={logo}
            alt=""
            fill
            sizes="720px"
            className="object-contain"
          />
        </div>

        {/* Soft vignette — edges fade into the hero background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 75% 65% at 52% 48%, transparent 25%, rgba(10,10,10,0.55) 65%, #0A0A0A 100%)",
          }}
        />
      </div>

      {/* ── Blobs (sit above watermark so colour bleeds through) ── */}
      <Blob
        color="rgba(255,107,44,0.20)"
        size={700}
        style={{ top: "-180px", right: "-200px", animationName: "blob-drift-1", animationDuration: "14s" }}
        innerColor="rgba(255,69,0,0.10)"
        borderRadius="62% 38% 55% 45% / 48% 60% 40% 52%"
      />
      <Blob
        color="rgba(29,185,84,0.16)"
        size={580}
        style={{ bottom: "-160px", left: "-170px", animationName: "blob-drift-2", animationDuration: "17s" }}
        innerColor="rgba(29,185,84,0.07)"
        borderRadius="45% 55% 38% 62% / 60% 42% 58% 40%"
      />
      <Blob
        color="rgba(255,107,44,0.055)"
        size={300}
        style={{ top: "55%", left: "40%", animationName: "blob-drift-3", animationDuration: "20s" }}
        innerColor="transparent"
        borderRadius="70% 30% 50% 50% / 40% 60% 40% 60%"
      />

      {/* Grid — very faint */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Main content row ── */}
      <div
        className="hero-inner"
        style={{
          position: "relative", zIndex: 2,
          maxWidth: 1280, margin: "0 auto",
          width: "100%", padding: "0 48px",
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* LEFT — Copy */}
        <div
          className="hero-copy"
          style={{
            flex: "0 0 46%", maxWidth: 520,
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.75s ease, transform 0.75s ease",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,107,44,0.10)",
              border: "1px solid rgba(255,107,44,0.26)",
              borderRadius: 100, padding: "6px 16px",
              marginBottom: 24,
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#FF6B2C", flexShrink: 0,
              animation: "pulse 2s infinite",
            }} />
            <span style={{
              fontSize: 12, fontWeight: 600, color: "#FF6B2C",
              letterSpacing: "0.07em", fontFamily: "var(--font-jakarta)",
            }}>
              Now live · Lagos &amp; Redemption City
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-jakarta"
            style={{
              fontSize: "clamp(36px, 4.8vw, 62px)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: 18,
            }}
          >
            The craving hits.{" "}
            <span style={{ color: "#FF6B2C" }}>We handle the rest.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="font-jakarta"
            style={{
              fontSize: "clamp(14px, 1.5vw, 16.5px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75,
              maxWidth: 440,
              marginBottom: 32,
              fontWeight: 400,
            }}
          >
            Order from local restaurants, run your kitchen, or earn delivering — all on one platform.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            <CtaLink href="/auth/role-picker" variant="primary">Get the App</CtaLink>
            <CtaLink href="/auth/role-picker" variant="ghost">Join EatUp</CtaLink>
          </div>

          {/* Stats — no divider */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
            {stats.map((s, i) => (
              <StatItem key={s.label} num={s.num} label={s.label} last={i === stats.length - 1} />
            ))}
          </div>
        </div>

        {/* RIGHT — Mockups */}
        <div
          className="hero-mockups"
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            minHeight: 460,
            marginTop: -48,
          }}
        >
          {/* Orange radial glow */}
          <div aria-hidden="true" style={{
            position: "absolute",
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(255,107,44,0.09) 0%, transparent 70%)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Laptop — slides in from right */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 580,
              zIndex: 1,
              animation: step >= 2 ? "hero-float 6s ease-in-out infinite" : "none",
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2 ? "translateX(0)" : "translateX(56px)",
              transition: "opacity 1.5s ease-out, transform 1.5s ease-out",
            }}
          >
            <Image
              src={laptopImg}
              alt="EatUp Vendor Dashboard"
              style={{
                width: "100%", height: "auto", objectFit: "contain",
                filter: "drop-shadow(0 32px 72px rgba(0,0,0,0.75))",
                display: "block",
              }}
              priority
            />

            {/* Phone — rises from bottom, anchored to laptop */}
            <div
              style={{
                position: "absolute",
                right: "-6px",
                bottom: "-120px",
                width: "33%",
                zIndex: 3,
                opacity: step >= 3 ? 1 : 0,
                transform: step >= 3 ? "translateY(0)" : "translateY(56px)",
                transition: "opacity 1.6s ease-out, transform 1.6s ease-out",
                animation: step >= 3 ? "hero-float-phone 5.4s ease-in-out infinite" : "none",
                filter: "drop-shadow(0 20px 44px rgba(0,0,0,0.70))",
              }}
            >
              <Image
                src={phoneImg}
                alt="EatUp Mobile App"
                style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles + keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.7); }
        }
        @media (max-width: 960px) {
          .hero-inner {
            flex-direction: column !important;
            padding: 0 24px !important;
            gap: 40px !important;
            align-items: flex-start !important;
          }
          .hero-copy {
            flex: unset !important;
            max-width: 100% !important;
          }
          .hero-mockups {
            width: 100% !important;
            min-height: 280px !important;
            justify-content: center !important;
            margin-top: -16px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Blob ── */
function Blob({ color, size, style, innerColor, borderRadius }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size, height: size,
        borderRadius,
        background: `radial-gradient(ellipse at 40% 40%, ${color} 0%, ${innerColor} 60%, transparent 100%)`,
        filter: "blur(80px)",
        pointerEvents: "none",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDirection: "alternate",
        ...style,
      }}
    />
  );
}

/* ── CTA ── */
function CtaLink({ href, variant, children }) {
  const base = {
    display: "inline-flex", alignItems: "center",
    padding: "13px 28px", borderRadius: 100,
    fontSize: 15, fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.2s",
    fontFamily: "var(--font-jakarta)",
    letterSpacing: "-0.01em",
    whiteSpace: "nowrap",
  };
  const styles = variant === "primary"
    ? { ...base, background: "#FF6B2C", color: "#fff", boxShadow: "0 0 28px rgba(255,107,44,0.38)" }
    : { ...base, background: "transparent", color: "rgba(255,255,255,0.78)", border: "1px solid rgba(255,255,255,0.22)" };

  return (
    <Link
      href={href}
      style={styles}
      onMouseEnter={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.background = "#FF4500";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,107,44,0.48)";
        } else {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.48)";
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary") {
          e.currentTarget.style.background = "#FF6B2C";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 0 28px rgba(255,107,44,0.38)";
        } else {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      {children}
    </Link>
  );
}

/* ── Stat ── */
function StatItem({ num, label, last }) {
  return (
    <div
      style={{
        display: "flex", flexDirection: "column", gap: 3,
        paddingRight: last ? 0 : 26,
        marginRight: last ? 0 : 26,
        borderRight: last ? "none" : "1px solid rgba(255,255,255,0.09)",
      }}
    >
      <span
        className="font-jakarta"
        style={{
          fontSize: "clamp(20px, 2.4vw, 28px)",
          fontWeight: 800, color: "#FFFFFF",
          letterSpacing: "-0.04em", lineHeight: 1,
        }}
      >
        {num.includes("₦") ? (
          <><span style={{ color: "#FF6B2C" }}>₦</span>{num.replace("₦", "")}</>
        ) : num}
      </span>
      <span
        className="font-jakarta"
        style={{
          fontSize: 10, fontWeight: 600,
          color: "rgba(255,255,255,0.28)",
          textTransform: "uppercase", letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
    </div>
  );
}
