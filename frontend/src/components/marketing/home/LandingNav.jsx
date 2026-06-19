"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPartnersOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.70)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Nav row */}
      <nav
        className="relative mx-auto flex items-center px-6 lg:px-12"
        style={{ maxWidth: "1280px", padding: "20px 48px" }}
      >
        {/* ── Logo — wordmark only ── */}
        <Link
          href="/"
          aria-label="EatUp home"
          className="group shrink-0 transition-opacity hover:opacity-90"
        >
          <span
            className="font-logo select-none"
            style={{
              fontSize: "clamp(1.35rem, 2.2vw, 1.65rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Eat<span style={{ color: "#FF6B2C" }}>Up</span>
          </span>
        </Link>

        {/* ── Center links (desktop) ── */}
        <ul
          className="hidden lg:flex items-center"
          style={{ gap: 36, listStyle: "none", position: "absolute", left: "50%", transform: "translateX(-50%)" }}
        >
          <li>
            <Link
              href="#order"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = "#fff")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
            >
              Order Food
            </Link>
          </li>

          {/* Partners dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPartnersOpen((p) => !p)}
              className="flex items-center gap-1"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, transition: "color 0.2s", padding: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              Partners
              <ChevronDown
                style={{ transition: "transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)", transform: partnersOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {/* Dropdown — glassmorphism */}
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 14px)",
                left: "50%",
                width: 196,
                padding: 6,
                background: "rgba(22, 22, 24, 0.78)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: 22,
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.12),
                  inset 0 -1px 0 rgba(255, 255, 255, 0.04),
                  0 4px 24px rgba(0, 0, 0, 0.35),
                  0 16px 48px rgba(0, 0, 0, 0.45),
                  0 0 0 1px rgba(255, 107, 44, 0.06)
                `,
                transition: "opacity 0.38s cubic-bezier(0.34, 1.3, 0.64, 1), transform 0.42s cubic-bezier(0.34, 1.3, 0.64, 1), visibility 0.38s",
                opacity: partnersOpen ? 1 : 0,
                visibility: partnersOpen ? "visible" : "hidden",
                transform: partnersOpen
                  ? "translateX(-50%) translateY(0) scale(1)"
                  : "translateX(-50%) translateY(-10px) scale(0.94)",
                pointerEvents: partnersOpen ? "auto" : "none",
                transformOrigin: "top center",
              }}
            >
              <DropdownItem href="#restaurants" icon="🍽️" label="Restaurants" onClick={() => setPartnersOpen(false)} />
              <DropdownItem href="#riders" icon="🛵" label="Riders" onClick={() => setPartnersOpen(false)} />
            </div>
          </li>

          <li>
            <Link
              href="#how-it-works"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = "#fff")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
            >
              How it Works
            </Link>
          </li>
        </ul>

        {/* ── Right CTAs (desktop) ── */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          {/* Ghost — Vendor Login */}
          <Link
            href="/auth/login"
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "10px 22px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Vendor Login
          </Link>

          {/* Primary — Get App */}
          <Link
            href="/auth/role-picker"
            style={{
              background: "#FF6B2C",
              color: "#FFFFFF",
              border: "none",
              padding: "10px 22px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: "0 0 22px rgba(255,107,44,0.35)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FF4500";
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 34px rgba(255,107,44,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FF6B2C";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 22px rgba(255,107,44,0.35)";
            }}
          >
            Get App
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="lg:hidden ml-auto"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", padding: 6 }}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        style={{
          maxHeight: mobileOpen ? "100vh" : 0,
          opacity: mobileOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.3s ease",
          background: "rgba(10,10,10,0.98)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
        className="lg:hidden"
      >
        <div style={{ padding: "8px 24px 32px" }}>
          <MobileLink href="#order" onClick={() => setMobileOpen(false)}>Order Food</MobileLink>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "12px 0 4px" }}>
            Partners
          </p>
          <MobileLink href="#restaurants" onClick={() => setMobileOpen(false)} indent>Restaurants</MobileLink>
          <MobileLink href="#riders" onClick={() => setMobileOpen(false)} indent>Riders</MobileLink>
          <MobileLink href="#how-it-works" onClick={() => setMobileOpen(false)}>How it Works</MobileLink>

          <div style={{ paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              style={{ textAlign: "center", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)", padding: "13px 20px", borderRadius: 100, textDecoration: "none" }}
            >
              Vendor Login
            </Link>
            <Link
              href="/auth/role-picker"
              onClick={() => setMobileOpen(false)}
              style={{ textAlign: "center", fontSize: 14, fontWeight: 600, color: "#FFFFFF", background: "#FF6B2C", padding: "13px 20px", borderRadius: 100, textDecoration: "none", boxShadow: "0 0 22px rgba(255,107,44,0.4)" }}
            >
              Get App
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Sub-components ── */

function DropdownItem({ href, icon, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 14px",
        fontSize: 14,
        fontWeight: 500,
        color: "rgba(255,255,255,0.72)",
        textDecoration: "none",
        borderRadius: 14,
        transition: "color 0.25s ease, background 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.transform = "translateX(2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(255,255,255,0.72)";
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      <span style={{ fontSize: 16, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}>{icon}</span>
      {label}
    </Link>
  );
}

function MobileLink({ href, onClick, children, indent = false }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: "block",
        padding: "13px 0",
        fontSize: 14,
        fontWeight: 500,
        color: indent ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.65)",
        paddingLeft: indent ? 16 : 0,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = indent ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.65)")}
    >
      {children}
    </Link>
  );
}

function ChevronDown({ style = {} }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
