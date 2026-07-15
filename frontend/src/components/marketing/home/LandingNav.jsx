"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const INK    = "#0A0A0A";
const ORANGE = "#FF6B2C";
const MUTED  = "#6B6B6B";

export default function LandingNav() {
  const [scrolled, setScrolled]       = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "#FFFFFF",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.09)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <nav
        style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 48px",
          height: 68,
          display: "flex", alignItems: "center",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="EatUp home" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span className="font-heading" style={{
            fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
            fontWeight: 700, letterSpacing: "-0.03em",
            color: INK, lineHeight: 1,
          }}>
            Eat<span style={{ color: ORANGE }}>Up</span>
          </span>
        </Link>

        {/* Center links — desktop */}
        <ul style={{
          display: "flex", alignItems: "center", gap: 40,
          listStyle: "none", margin: 0, padding: 0,
          position: "absolute", left: "50%", transform: "translateX(-50%)",
        }} className="nav-links-desktop">
          <li>
            <NavLink href="#order">Order Food</NavLink>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPartnersOpen((p) => !p)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 4,
                fontSize: 14, fontWeight: 500, color: MUTED,
                fontFamily: "var(--font-jakarta)",
                padding: 0, transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >
              Partners
              <ChevronDown open={partnersOpen} />
            </button>

            {/* Dropdown */}
            <div style={{
              position: "absolute", top: "calc(100% + 16px)", left: "50%",
              width: 180, padding: "6px",
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.09)",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
              transition: "opacity 0.22s, transform 0.22s, visibility 0.22s",
              opacity: partnersOpen ? 1 : 0,
              visibility: partnersOpen ? "visible" : "hidden",
              transform: partnersOpen
                ? "translateX(-50%) translateY(0)"
                : "translateX(-50%) translateY(-8px)",
              pointerEvents: partnersOpen ? "auto" : "none",
            }}>
              <DropdownItem href="#restaurants" label="Restaurants" onClick={() => setPartnersOpen(false)} />
              <DropdownItem href="#riders" label="Riders" onClick={() => setPartnersOpen(false)} />
            </div>
          </li>
          <li>
            <NavLink href="#how-it-works">How it Works</NavLink>
          </li>
        </ul>

        {/* Right CTAs — desktop */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}
          className="nav-ctas-desktop">
          <Link href="/auth/login?role=vendor" style={{
            fontSize: 14, fontWeight: 500,
            color: MUTED, textDecoration: "none",
            padding: "9px 18px", borderRadius: 100,
            transition: "color 0.2s, background 0.2s",
            fontFamily: "var(--font-jakarta)",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = INK; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; e.currentTarget.style.background = "transparent"; }}
          >
            Vendor Login
          </Link>
          <Link href="/auth/role-picker" style={{
            fontSize: 14, fontWeight: 600,
            color: "#FFFFFF", background: ORANGE,
            textDecoration: "none",
            padding: "9px 22px", borderRadius: 100,
            transition: "background 0.2s, transform 0.2s",
            fontFamily: "var(--font-jakarta)",
            whiteSpace: "nowrap",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E55A1F"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Get App
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            marginLeft: "auto", background: "none", border: "none",
            cursor: "pointer", color: INK, padding: 6,
            display: "none",
          }}
          className="nav-hamburger"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        maxHeight: mobileOpen ? "100vh" : 0,
        opacity: mobileOpen ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.32s ease, opacity 0.22s ease",
        background: "#FFFFFF",
        borderTop: "1px solid rgba(0,0,0,0.07)",
      }} className="nav-mobile-panel">
        <div style={{ padding: "8px 24px 36px", display: "flex", flexDirection: "column", gap: 0 }}>
          <MobileLink href="#order" onClick={() => setMobileOpen(false)}>Order Food</MobileLink>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "14px 0 4px" }}>Partners</p>
          <MobileLink href="#restaurants" onClick={() => setMobileOpen(false)} indent>Restaurants</MobileLink>
          <MobileLink href="#riders" onClick={() => setMobileOpen(false)} indent>Riders</MobileLink>
          <MobileLink href="#how-it-works" onClick={() => setMobileOpen(false)}>How it Works</MobileLink>
          <div style={{ paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/auth/login?role=vendor" onClick={() => setMobileOpen(false)} style={{
              textAlign: "center", fontSize: 14, fontWeight: 500,
              color: MUTED, border: "1px solid rgba(0,0,0,0.12)",
              padding: "12px 20px", borderRadius: 100, textDecoration: "none",
            }}>Vendor Login</Link>
            <Link href="/auth/role-picker" onClick={() => setMobileOpen(false)} style={{
              textAlign: "center", fontSize: 14, fontWeight: 600,
              color: "#FFFFFF", background: ORANGE,
              padding: "12px 20px", borderRadius: 100, textDecoration: "none",
            }}>Get App</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .nav-links-desktop { display: none !important; }
          .nav-ctas-desktop  { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href} style={{
      fontSize: 14, fontWeight: 500, color: MUTED,
      textDecoration: "none", transition: "color 0.2s",
      fontFamily: "var(--font-jakarta)",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
      onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
    >{children}</Link>
  );
}

function DropdownItem({ href, label, onClick }) {
  return (
    <Link href={href} onClick={onClick} style={{
      display: "flex", alignItems: "center",
      padding: "10px 14px", fontSize: 14, fontWeight: 500,
      color: MUTED, textDecoration: "none", borderRadius: 10,
      transition: "color 0.2s, background 0.2s",
      fontFamily: "var(--font-jakarta)",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.color = INK; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; e.currentTarget.style.background = "transparent"; }}
    >{label}</Link>
  );
}

function MobileLink({ href, onClick, children, indent = false }) {
  return (
    <Link href={href} onClick={onClick} style={{
      display: "block", padding: "13px 0",
      fontSize: 14, fontWeight: 500,
      color: indent ? "rgba(0,0,0,0.40)" : "rgba(0,0,0,0.65)",
      paddingLeft: indent ? 16 : 0,
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      textDecoration: "none", transition: "color 0.2s",
      fontFamily: "var(--font-jakarta)",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
      onMouseLeave={(e) => (e.currentTarget.style.color = indent ? "rgba(0,0,0,0.40)" : "rgba(0,0,0,0.65)")}
    >{children}</Link>
  );
}

function ChevronDown({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
