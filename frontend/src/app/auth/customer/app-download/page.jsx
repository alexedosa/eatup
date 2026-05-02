"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "@/assets/logo/logo.png";

function AppDownloadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "customer";

  const dashRoute = role === "rider" ? "/rider/dashboard" : "/customer/dashboard";

  return (
    <div className="auth-page">
      <style>{`
        .appdl-blob {
          position: absolute; width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,93,4,0.1) 0%, transparent 70%);
          top: -200px; left: 50%; transform: translateX(-50%);
          pointer-events: none;
        }
        .store-btn {
          display: flex; align-items: center; gap: 12px;
          background: #1c1c1c; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 12px 20px;
          cursor: pointer; text-align: left; width: 100%;
          transition: all 0.2s ease; color: inherit; text-decoration: none;
        }
        .store-btn:hover {
          border-color: rgba(255,255,255,0.2);
          background: #222;
          transform: translateY(-2px);
        }
        .store-icon { flex-shrink: 0; }
        .store-sub { font-size: 11px; color: rgba(255,255,255,0.35); margin-bottom: 2px; }
        .store-name { font-size: 15px; color: white; font-weight: 500; font-family: 'Syne', sans-serif; }
        .qr-box {
          width: 100%; aspect-ratio: 1;
          max-width: 140px;
          background: white;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .qr-placeholder { font-size: 10px; color: #888; text-align: center; padding: 8px; }
        .confetti-dot {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      <div className="appdl-blob" />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 10 }}>
        <div className="auth-logomark">
          <div className="auth-logomark-inner">
            <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        <div className="auth-card" style={{ textAlign: "center" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(45,106,79,0.15)",
            border: "1px solid rgba(45,106,79,0.3)",
            display: "flex", alignItems: "center", justifyCenter: "center",
            margin: "0 auto 20px",
            color: "#59c46b",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>

          <h1 className="auth-title" style={{ fontSize: 24, marginBottom: 8 }}>You're all set! 🎉</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
            Download the EatUp mobile app for the best experience — live order tracking, push alerts, and more.
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28, textAlign: "left" }}>
            <div className="qr-box">
              <p className="qr-placeholder">QR Code<br/>coming soon</p>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="#" className="store-btn">
                <div className="store-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.4.07 2.38.73 3.2.73.96 0 2.74-.89 4.62-.76 1.82.14 3.16.97 3.91 2.41-3.4 2.06-2.9 6.34.27 7.5zm-3.15-14.4C14.95 3.5 16.92 2 18.5 2c.17 1.9-1.76 3.53-3.6 3.88z"/>
                  </svg>
                </div>
                <div>
                  <p className="store-sub">Download on the</p>
                  <p className="store-name">App Store</p>
                </div>
              </a>
              <a href="#" className="store-btn">
                <div className="store-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.18 23.98c.4.22.85.23 1.27.02L17.08 16 13 12 3.18 23.98z" fill="#EA4335"/>
                    <path d="M20.92 10.6L17.08 8.5 12.67 12l4.41 4L20.92 14c.6-.37.96-.98.96-1.7 0-.73-.36-1.34-.96-1.7z" fill="#FBBC04"/>
                    <path d="M3.18.03L13 12l4.08-4L4.45.01C4.03-.2 3.58-.19 3.18.03z" fill="#4285F4"/>
                    <path d="M3.18.03C2.57.4 2.16 1.08 2.16 2v20c0 .92.41 1.6 1.02 1.98L13 12 3.18.03z" fill="#34A853"/>
                  </svg>
                </div>
                <div>
                  <p className="store-sub">Get it on</p>
                  <p className="store-name">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line" />
          </div>

          <button
            className="auth-btn auth-btn-ghost"
            onClick={() => router.push(dashRoute)}
          >
            Continue to web app
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppDownloadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppDownloadContent />
    </Suspense>
  );
}