"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import logo from "@/assets/logo/logo.png";
import vendor from "@/assets/role-imgs/vendor.png";
import customer from "@/assets/role-imgs/customer.jpg";
import rider from "@/assets/role-imgs/rider.jpg";

const roles = [
  {
    key: "vendor",
    label: "Vendor",
    tagline: "List your restaurant, grow your revenue",
    image: vendor,
    accent: "#2E7D32",
    route: "/auth/vendor/register",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    ),
  },
  {
    key: "rider",
    label: "Rider",
    tagline: "Deliver food, earn on your schedule",
    image: rider,
    accent: "#e65517", 
    route: "/auth/rider/signup",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
];

export default function RolePickerPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);
  const [pressed, setPressed] = useState(null);

  return (
    <div className="role-picker-root">
      <div className="rp-blob-1" />
      <div className="rp-blob-2" />
      <div className="rp-noise" />

      <div className="rp-inner">
        <div className="rp-logo-wrap">
          <div className="rp-logo-bg">
            <Image src={logo} alt="EatUp" width={52} height={52} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        <h1 className="rp-heading">Join EatUp</h1>
        <p className="rp-sub">Choose how you want to get started</p>

        <div className="rp-cards">
          {roles.map((role) => (
            <div
              key={role.key}
              className="rp-card"
              onClick={() => router.push(role.route)}
              onMouseEnter={() => setHovered(role.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image src={role.image} alt={role.label} fill className="rp-card-img" />
              <div className="rp-card-overlay" />
              <div className="rp-card-accent-bar" style={{ background: role.accent }} />

              <div className="rp-card-content">
                <div className="rp-card-icon">{role.icon}</div>
                <div className="rp-card-text">
                  <p className="rp-card-label">{role.label}</p>
                  <p className="rp-card-tagline">{role.tagline}</p>
                </div>
                <div className="rp-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rp-footer">
          <p className="rp-footer-text">
            Already have an account?{" "}
            <button className="rp-footer-link" onClick={() => router.push("/auth/login")}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}