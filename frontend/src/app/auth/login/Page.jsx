"use client";

import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRef, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "customer";

  const [step, setStep] = useState("login"); 
  const [form, setForm] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const otpRefs = useRef([]);

  const set = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    if (error) setError("");
  };

  const isValid = form.email.trim() && form.password.length >= 6;
  const isOtpValid = otp.every((digit) => digit.trim() !== "");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.auth.login(form.email, form.password);
      setLoading(false);

      if (res.success) {

        // If it's a vendor or the API indicates OTP is needed
        if (role === "vendor" || res.data.requiresOtp) {
          setStep("otp");
          toast.success("OTP sent to your email.");
        } else {
          toast.success("Login successful!");
          router.push(
            role === "rider" ? "/home" : "/customer/dashboard",
          );
        }
      }
    } catch (error) {
      setLoading(false);
      const msg = error.message || "Invalid email or password";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await api.auth.verifyOtp(form.email, otp.join(""));
      setLoading(false);

      if (res.success) {
        toast.success("Login successful!");
        router.push("/vendor/dashboard");
      }
    } catch (error) {
      setLoading(false);
      const msg = error.message || "Invalid OTP";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const signupRoute =
    role === "rider"
      ? "/auth/rider/signup"
      : role === "vendor"
        ? "/auth/vendor/register"
        : "/auth/customer/signup";

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="auth-page">
      <style>{`
        .login-blob {
          position: absolute;
          width: 450px; height: 450px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,93,4,0.1) 0%, transparent 70%);
          top: -180px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .pw-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }
        .pw-toggle:hover { color: rgba(255,255,255,0.6); }
        .pw-wrap { position: relative; }
        .pw-wrap .auth-input { padding-right: 44px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        .otp-input {
          width: 45px;
          height: 50px;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          transition: all 0.2s ease;
        }
        .otp-input:focus {
          outline: none;
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
        }
      `}</style>

      <div className="login-blob" />

      <div
        style={{
          width: "100%",
          maxWidth: 400,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="auth-logomark">
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            onClick={() => router.push("/auth/role-picker")}
          >
            <div className="auth-logomark-inner">
              <Image
                src={logo}
                alt="EatUp"
                width={40}
                height={40}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </button>
        </div>

        <div className="auth-card">
          {step === "login" ? (
            <>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {roleLabel} login
              </p>
              <h1
                className="auth-title"
                style={{ fontSize: 26, marginBottom: 4 }}
              >
                Welcome back
              </h1>
              <p className="auth-subtitle">Sign in to your EatUp account</p>

              <div className="auth-field">
                <label className="auth-label">Email address</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <label className="auth-label" style={{ margin: 0 }}>
                    Password
                  </label>
                  <button
                    className="auth-text-link"
                    style={{ fontSize: 12 }}
                    onClick={() => router.push("/auth/forgot-password")}
                  >
                    Forgot?
                  </button>
                </div>
                <div className="pw-wrap">
                  <input
                    className="auth-input"
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={set("password")}
                    autoComplete="current-password"
                  />
                  <button
                    className="pw-toggle"
                    onClick={() => setShowPw((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPw ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-[11px] font-bold mt-2 text-red-500 dark:text-orange-200/90 animate-in fade-in slide-in-from-top-1">
                  {error}
                </p>
              )}

              <button
                className="auth-btn auth-btn-primary"
                style={{ marginTop: 16 }}
                onClick={handleLogin}
                disabled={!isValid || loading}
              >
                {loading ? <span className="spinner" /> : "Sign in"}
              </button>
            </>
          ) : (
            <>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Security Check
              </p>
              <h1
                className="auth-title"
                style={{ fontSize: 26, marginBottom: 4 }}
              >
                Two-Factor Auth
              </h1>
              <p className="auth-subtitle">
                Enter the 6-digit code sent to {form.email}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "24px 0",
                }}
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="otp-input"
                  />
                ))}
              </div>

              {error && (
                <p className="text-[11px] font-bold mt-2 text-red-500 dark:text-orange-200/90 animate-in fade-in slide-in-from-top-1 text-center">
                  {error}
                </p>
              )}

              <button
                className="auth-btn auth-btn-primary"
                style={{ marginTop: 16 }}
                onClick={handleVerifyOtp}
                disabled={!isOtpValid || loading}
              >
                {loading ? <span className="spinner" /> : "Verify & Login"}
              </button>

              <button
                className="auth-btn"
                style={{
                  marginTop: 12,
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 12,
                }}
                onClick={() => setStep("login")}
              >
                Back to Login
              </button>
            </>
          )}
        </div>

        {step === "login" && (
          <p className="auth-footer-note">
            Don't have an account?{" "}
            <button
              className="auth-text-link"
              onClick={() => router.push(signupRoute)}
            >
              Sign up
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
