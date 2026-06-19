"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo/logo.png";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function Step0({ nextStep, updateFormData }) {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    if (error) setError("");
  };

  const isValid = 
    form.firstName.trim() && 
    form.lastName.trim() && 
    form.email.trim() && 
    form.phone.trim() &&
    form.password.length >= 6;

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await api.auth.register({
        ...form,
        role: "VENDOR",
      });
      setLoading(false);
      
      if (res.success) {
        toast.success("Account created! Let's continue with your profile.");
        updateFormData(form);
        nextStep();
      } else {
        throw new Error(res.message || "Registration failed");
      }
    } catch (error) {
      setLoading(false);
      const msg = error.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="auth-page">
      <style>{`
        .pw-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(0,0,0,0.3);
          padding: 0;
          display: flex;
          align-items: center;
        }
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
      `}</style>

      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 10 }}>
        <div className="auth-logomark">
          <button
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            onClick={() => router.push("/auth/role-picker")}
          >
            <div className="auth-logomark-inner">
              <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
            </div>
          </button>
        </div>

        <div className="auth-card">
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: "rgba(0,0,0,0.25)", textTransform: "uppercase", marginBottom: 8 }}>
            Vendor Registration
          </p>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join the EatUp vendor network</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="auth-field">
              <label className="auth-label">First Name</label>
              <input
                className="auth-input"
                placeholder="David"
                value={form.firstName}
                onChange={set("firstName")}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">Last Name</label>
              <input
                className="auth-input"
                placeholder="Areegbe"
                value={form.lastName}
                onChange={set("lastName")}
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Email address</label>
            <input
              className="auth-input"
              type="email"
              placeholder="david@eatup.com"
              value={form.email}
              onChange={set("email")}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Phone number</label>
            <input
              className="auth-input"
              type="tel"
              placeholder="080 0000 0000"
              value={form.phone}
              onChange={set("phone")}
              autoComplete="tel"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="pw-wrap">
              <input
                className="auth-input"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
              />
              <button className="pw-toggle" onClick={() => setShowPw((v) => !v)} tabIndex={-1}>
                {showPw ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[11px] font-bold mt-2 text-red-500 dark:text-orange-200/90 animate-in fade-in slide-in-from-top-1 text-center">
              {error}
            </p>
          )}

          <button
            className="auth-btn auth-btn-primary"
            style={{ marginTop: 16 }}
            onClick={handleRegister}
            disabled={!isValid || loading}
          >
            {loading ? <span className="spinner" /> : "Create Account"}
          </button>
        </div>

        <p className="auth-footer-note">
          Already have an account?{" "}
          <button className="auth-text-link" onClick={() => router.push("/auth/login?role=vendor")}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
