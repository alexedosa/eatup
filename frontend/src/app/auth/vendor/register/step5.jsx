"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { submitOnboardingForReview } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function Step5({ formData, onboardingId }) {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    async function submitOnboarding() {
      if (!onboardingId) return;
      try {
        await submitOnboardingForReview(onboardingId);
        toast.success("Application submitted successfully!");
      } catch (err) {
        const msg = err.message || "Failed to submit application";
        setError(msg);
        toast.error(msg);
      }
    }
    submitOnboarding();
  }, [onboardingId]);

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card" style={{ textAlign: "center" }}>
        {/* Steps indicator — 6 steps now */}
        <div className="auth-steps">
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot active"></div>
        </div>

        <div className="auth-logomark" style={{ marginBottom: 24 }}>
          <div className="auth-logomark-inner">
            <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        {error && (
          <p className="text-[11px] font-bold mb-4 text-red-500 dark:text-orange-200/90 animate-in fade-in slide-in-from-top-1 text-center">
            {error}
          </p>
        )}

      <div className="auth-pending-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <span className="auth-pending-badge">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
          </svg>
          Under Review
        </span>
      </div>

      <h2 className="auth-title" style={{ fontSize: 22, marginBottom: 10 }}>
        Application submitted
      </h2>
      <p style={{ fontSize: 14, color: "var(--auth-text-muted)", lineHeight: 1.7, marginBottom: 28, fontWeight: 300 }}>
        
      </p>

      <div style={{
        background: "var(--auth-surface-2)",
        border: "1px solid var(--auth-border)",
        borderRadius: 12,
        padding: "4px 0",
        marginBottom: 28,
      }}>
        <div className="auth-info-row" style={{ padding: "12px 16px" }}>
          <span className="auth-info-key">Business</span>
          <span className="auth-info-val">{formData.businessName || "—"}</span>
        </div>
        <div className="auth-info-row" style={{ padding: "12px 16px" }}>
          <span className="auth-info-key">Email</span>
          <span className="auth-info-val">{formData.email || "—"}</span>
        </div>
        <div className="auth-info-row" style={{ padding: "12px 16px" }}>
          <span className="auth-info-key">Phone</span>
          <span className="auth-info-val">{formData.countryCode || "+234"} {formData.phone || "—"}</span>
        </div>
        <div className="auth-info-row" style={{ padding: "12px 16px" }}>
          <span className="auth-info-key">Categories</span>
          <span className="auth-info-val" style={{ fontSize: 12 }}>
            {formData.categories?.join(", ") || "—"}
          </span>
        </div>
      </div>

      <button
        className="auth-btn auth-btn-ghost"
        onClick={() => router.push("/")}
        style={{ maxWidth: 200, margin: "0 auto" }}
      >
        Back to home
      </button>
      </div>
    </div>
  );
}
