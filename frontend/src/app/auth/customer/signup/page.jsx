"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo/logo.png";

export default function CustomerSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => {
    setError("");
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const isValid =
    form.email.trim() &&
    form.password.length >= 8 &&
    form.password === form.confirm;

  const pwStrength = () => {
    const pw = form.password;
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#E85D04", "#f5b731", "#59c46b", "#2D6A4F"];
  const strength = pwStrength();

  const handleSignup = async () => {
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push("/auth/customer/complete-profile");
  };

  return (
    <div className="auth-page">
      <style>{`
        .signup-blob {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,93,4,0.09) 0%, transparent 70%);
          top: -150px; right: -100px;
          pointer-events: none;
        }
        .pw-wrap { position: relative; }
        .pw-wrap .auth-input { padding-right: 44px; }
        .pw-toggle {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.3); padding: 0;
          display: flex; align-items: center;
          transition: color 0.2s;
        }
        .pw-toggle:hover { color: rgba(255,255,255,0.6); }
        .strength-bar { display: flex; gap: 4px; margin-top: 8px; }
        .strength-seg {
          height: 3px; flex: 1; border-radius: 99px;
          background: rgba(255,255,255,0.08);
          transition: background 0.3s ease;
        }
        .auth-error {
          font-size: 12px;
          color: #ff6b6b;
          margin-top: 6px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      <div className="signup-blob" />

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 10 }}>
        <div className="auth-logomark">
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }} onClick={() => router.push("/auth/role-picker")}>
            <div className="auth-logomark-inner">
              <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
            </div>
          </button>
        </div>

        <div className="auth-card">
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 8 }}>
            New customer
          </p>
          <h1 className="auth-title" style={{ fontSize: 26, marginBottom: 4 }}>Create your account</h1>
          <p className="auth-subtitle">Get access to thousands of restaurants near you.</p>

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
            <label className="auth-label">Password</label>
            <div className="pw-wrap">
              <input
                className="auth-input"
                type={showPw ? "text" : "password"}
                placeholder="Min 8 characters"
                value={form.password}
                onChange={set("password")}
                autoComplete="new-password"
              />
              <button className="pw-toggle" onClick={() => setShowPw((v) => !v)} tabIndex={-1}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showPw
                    ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                    : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                  }
                </svg>
              </button>
            </div>
            {form.password && (
              <>
                <div className="strength-bar">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="strength-seg"
                      style={{ background: i <= strength ? strengthColor[strength] : undefined }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: 11, color: strengthColor[strength], marginTop: 5 }}>
                  {strengthLabel[strength]}
                </p>
              </>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirm password</label>
            <input
              className="auth-input"
              type={showPw ? "text" : "password"}
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={set("confirm")}
              autoComplete="new-password"
              style={form.confirm && form.confirm !== form.password ? { borderColor: "rgba(255,107,107,0.5)" } : {}}
            />
            {form.confirm && form.confirm !== form.password && (
              <p className="auth-error">Passwords don't match</p>
            )}
          </div>

          {error && <p className="auth-error" style={{ marginBottom: 12 }}>{error}</p>}

          <button
            className="auth-btn auth-btn-primary"
            style={{ marginTop: 4 }}
            onClick={handleSignup}
            disabled={!isValid || loading}
          >
            {loading ? <span className="spinner" /> : "Create account"}
          </button>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line" />
          </div>

          <button className="auth-btn auth-btn-ghost" style={{ gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="auth-footer-note">
          Already have an account?{" "}
          <button className="auth-text-link" onClick={() => router.push("/auth/login?role=customer")}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}