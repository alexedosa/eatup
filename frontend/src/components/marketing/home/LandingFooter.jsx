"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import { footerLinks } from "@/data/landing";
import { FaInstagram, FaXTwitter, FaTiktok, FaFacebook } from "react-icons/fa6";

const ORANGE = "#FF6B2C";
const MUTED  = "rgba(255,255,255,0.38)";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/eatupng",  Icon: FaInstagram },
  { label: "X",         href: "https://x.com/eatupng",          Icon: FaXTwitter  },
  { label: "TikTok",    href: "https://tiktok.com/@eatupng",    Icon: FaTiktok    },
  { label: "Facebook",  href: "https://facebook.com/eatupng",   Icon: FaFacebook  },
];

export default function LandingFooter() {
  return (
    <footer style={{ width: "100%", background: "#0A0A0A" }}>

      {/* ── Top billboard ── */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "80px 64px 56px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between", flexWrap: "wrap", gap: 32,
      }}>
        {/* Logo + tagline */}
        <div>
          <div style={{ position: "relative", width: 112, height: 112, marginBottom: 20 }}>
            <Image src={logo} alt="EatUp" fill sizes="112px" style={{ objectFit: "contain" }} priority />
          </div>
          <p className="font-heading" style={{
            fontSize: "clamp(24px, 3.2vw, 40px)",
            fontWeight: 700, lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#FFFFFF", maxWidth: 340,
          }}>
            Good food, delivered.<br />
            <span style={{ color: ORANGE }}>Every time.</span>
          </p>
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {SOCIALS.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              aria-label={label}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.50)",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s, background 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ORANGE;
                e.currentTarget.style.color = ORANGE;
                e.currentTarget.style.background = "rgba(255,107,44,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.50)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      {/* ── Links grid ── */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "52px 64px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 48,
        }}>
          {/* Brand blurb */}
          <div>
            <p className="font-jakarta" style={{
              fontSize: 13, color: MUTED,
              lineHeight: 1.75, maxWidth: 240,
            }}>
              Food delivery, restaurant management, and rider earnings — all on one platform. Built for Nigeria.
            </p>
          </div>

          <FooterCol title="Platform" links={footerLinks.platform} />
          <FooterCol title="Company"  links={footerLinks.company}  />
          <FooterCol title="Legal"    links={footerLinks.legal}    />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "24px 64px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <p className="font-jakarta" style={{ fontSize: 12, color: "rgba(255,255,255,0.22)" }}>
          © 2025 EatUp. All rights reserved. Lagos, Nigeria.
        </p>
        <p className="font-jakarta" style={{ fontSize: 12, color: "rgba(255,255,255,0.16)" }}>
          Built with love for Nigerian restaurants.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="font-jakarta" style={{
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.25)", marginBottom: 18,
      }}>
        {title}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="font-jakarta" style={{
              fontSize: 13, fontWeight: 400,
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
