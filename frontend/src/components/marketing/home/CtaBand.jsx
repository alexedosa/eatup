"use client";

import Link from "next/link";

const GREEN = "#0D7A3E";

export default function CtaBand() {
  return (
    <section
      style={{
        width: "100%",
        background: GREEN,
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft light glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        width: 700, height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 760, margin: "0 auto",
        padding: "0 48px",
        textAlign: "center",
        position: "relative", zIndex: 1,
      }}>

        {/* Eyebrow */}
        <p className="font-jakarta" style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          marginBottom: 24,
        }}>
          Join the platform
        </p>

        {/* Headline */}
        <h2 className="font-heading" style={{
          fontSize: "clamp(36px, 6vw, 80px)",
          fontWeight: 700, lineHeight: 0.96,
          letterSpacing: "-0.04em",
          color: "#FFFFFF",
          marginBottom: 20,
        }}>
          Want to be part{" "}
          <span style={{ color: "rgba(255,255,255,0.72)" }}>
            <br />
            of this?</span>
        </h2>

        {/* Sub */}
        <p className="font-jakarta" style={{
          fontSize: "clamp(15px, 1.6vw, 18px)",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.7,
          maxWidth: 520, margin: "0 auto 48px",
        }}>
          Whether you're hungry, cooking, or riding — there's a place for you on EatUp.
        </p>

        {/* CTA */}
        <Link href="/auth/role-picker" className="font-jakarta cta-band-btn" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "#FFFFFF", color: GREEN,
          padding: "16px 36px", borderRadius: 100,
          fontSize: 16, fontWeight: 600,
          textDecoration: "none",
          transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
          letterSpacing: "-0.01em",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
        >
          Join EatUp
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      <style>{`
        .cta-band-btn:hover {
          background: #F5F5F5 !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.2) !important;
        }
      `}</style>
    </section>
  );
}
