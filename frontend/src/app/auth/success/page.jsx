"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { TickCircle } from "iconsax-reactjs";
import logo from "@/assets/logo/logo.png";

export default function AuthSuccessPage() {
  const router = useRouter();

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" aria-hidden="true" />
      <div className="auth-blob auth-blob-2" aria-hidden="true" />

      <div className="auth-card" style={{ textAlign: "center", maxWidth: 440 }}>
        {/* Logo */}
        <div className="auth-logomark" style={{ marginBottom: 32 }}>
          <div className="auth-logomark-inner">
            <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        {/* Success Icon */}
        <div style={{ 
          width: 80, height: 80, 
          borderRadius: "50%", 
          background: "rgba(46, 125, 50, 0.1)", 
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px"
        }}>
          <TickCircle size="48" variant="Bold" style={{ color: "var(--green)" }} />
        </div>

        <h1 className="auth-title" style={{ fontSize: 26, marginBottom: 12 }}>
          Your account is setup completely!
        </h1>
        
        <p className="auth-subtitle" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
          Thanks for joining EatUp! We're excited to have you on board. 
          Our team will review your details, and you'll be able to start your journey with us in no time.
        </p>

        <div style={{
          background: "var(--auth-surface-2)",
          border: "1px solid var(--auth-border)",
          borderRadius: 16,
          padding: "20px",
          marginBottom: 32,
          textAlign: "left"
        }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--auth-text)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Next Steps
          </h4>
          <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 13, color: "var(--grey-text)", lineHeight: 1.8 }}>
            <li>Our team will verify your uploaded documents.</li>
            <li>You'll receive a notification once your account is active.</li>
            <li>Once active, you can log in and start accepting orders!</li>
          </ul>
        </div>

        <button 
          className="auth-btn auth-btn-primary"
          onClick={() => router.push("/auth/get-app")}
        >
          Get the App
        </button>

        <p className="auth-footer-note" style={{ marginTop: 24 }}>
          Need help? <button className="auth-text-link">Contact Support</button>
        </p>
      </div>

      <style jsx>{`
        .auth-card {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
