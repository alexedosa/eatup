"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { sendOnboardingOTP, verifyOnboardingOTP } from "@/lib/api";
import { toast } from "react-hot-toast";

const OTP_LENGTH = 6;
const RESEND_TIMER = 30;

export default function Step4({ nextStep, prevStep, updateFormData, formData, onboardingId }) {
  const [otpSessionId, setOtpSessionId] = useState(null);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(RESEND_TIMER);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Start countdown timer
  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Auto-focus first input and send OTP on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
    handleSendOtp();
  }, []);

  const handleSendOtp = async () => {
    if (!onboardingId) return;
    try {
      const target = formData.phone || formData.email;
      const channel = formData.phone ? "sms" : "email";
      const data = await sendOnboardingOTP(onboardingId, channel, target);
      setOtpSessionId(data.otpSessionId);
      toast.success(`OTP sent to ${target}`);
    } catch (err) {
      toast.error(err.message || "Failed to send OTP");
    }
  };

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    setError("");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const digits = pastedData.replace(/\D/g, "").slice(0, OTP_LENGTH);

    if (digits.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < OTP_LENGTH; i++) {
        newOtp[i] = digits[i] || "";
      }
      setOtp(newOtp);
      setError("");

      // Focus the last filled input or the next empty one
      const focusIndex = Math.min(digits.length, OTP_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    setResendTimer(RESEND_TIMER);
    setCanResend(false);
    inputRefs.current[0]?.focus();
    handleSendOtp();
  };

  const otpCode = otp.join("");
  const isComplete = otpCode.length === OTP_LENGTH;

  const handleVerify = async () => {
    if (!isComplete || !onboardingId) return;

    setIsVerifying(true);
    setError("");

    try {
      await verifyOnboardingOTP(onboardingId, otpSessionId, otpCode);
      updateFormData({ otpVerified: true });
      nextStep();
    } catch (err) {
      setError(err.message || "Invalid OTP");
      toast.error(err.message || "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const maskedContact = formData.phone
    ? `${formData.countryCode || "+234"} ${formData.phone.slice(0, 3)}****${formData.phone.slice(-2)}`
    : formData.email || "your contact";

  return (
    <div className="auth-page">
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .otp-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
      `}</style>
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card" style={{ textAlign: "center" }}>
        {/* Steps indicator — 6 steps now */}
        <div className="auth-steps">
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot active"></div>
          <div className="auth-step-dot idle"></div>
        </div>

        <div className="auth-logomark">
          <div className="auth-logomark-inner">
            <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        <h1 className="auth-title" style={{ fontSize: 24 }}>Verify your identity</h1>
        <p className="auth-subtitle" style={{ marginBottom: 8 }}>
          Enter the 6-digit code sent to
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--auth-text)", marginBottom: 28 }}>
          {maskedContact}
        </p>

        {/* OTP Split Boxes */}
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`otp-box${digit ? " filled" : ""}${error ? " error" : ""}`}
              autoComplete="one-time-code"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {error && (
          <p className="text-[11px] font-bold mt-4 text-red-500 dark:text-orange-200/90 animate-in fade-in slide-in-from-top-1 text-center flex items-center justify-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
            {error}
          </p>
        )}

        {/* Resend timer */}
        <div className="otp-resend">
          {canResend ? (
            <button type="button" className="otp-resend-btn" onClick={handleResend}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Resend code
            </button>
          ) : (
            <p className="otp-timer">
              Resend code in <span>{resendTimer}s</span>
            </p>
          )}
        </div>

        <div className="auth-btn-row" style={{ marginTop: 24 }}>
          <button className="auth-btn auth-btn-ghost" onClick={prevStep}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <button
            className="auth-btn auth-btn-primary"
            onClick={handleVerify}
            disabled={!isComplete || isVerifying}
          >
            {isVerifying ? (
              <>
                <span className="otp-spinner" />
                Verifying...
              </>
            ) : (
              <>
                Verify
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}