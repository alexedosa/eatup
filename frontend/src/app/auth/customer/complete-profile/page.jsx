"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo/logo.png";

export default function CustomerCompleteProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const isValid = form.firstName.trim() && form.lastName.trim() && form.phone.trim();

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/auth/customer/app-download");
  };

  return (
    <div className="auth-page">
      <style>{`
        .cp-blob {
          position: absolute; width: 350px; height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,93,4,0.08) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          pointer-events: none;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
      `}</style>
      <div className="cp-blob" />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 10 }}>
        <div className="auth-logomark">
          <div className="auth-logomark-inner">
            <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        <div className="auth-card">
          <div style={{ display: "flex", gap: 5, marginBottom: 28 }}>
            <div className="auth-step-dot done" />
            <div className="auth-step-dot active" />
            <div className="auth-step-dot idle" />
          </div>

          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 8 }}>
            Almost there
          </p>
          <h1 className="auth-title" style={{ fontSize: 26, marginBottom: 4 }}>Complete your profile</h1>
          <p className="auth-subtitle">So restaurants know who they're cooking for.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            <div className="auth-field" style={{ margin: 0 }}>
              <label className="auth-label">First name</label>
              <input className="auth-input" placeholder="Amara" value={form.firstName} onChange={set("firstName")} />
            </div>
            <div className="auth-field" style={{ margin: 0 }}>
              <label className="auth-label">Last name</label>
              <input className="auth-input" placeholder="Okafor" value={form.lastName} onChange={set("lastName")} />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Phone number</label>
            <input className="auth-input" placeholder="+234 080 0000 0000" value={form.phone} onChange={set("phone")} type="tel" />
          </div>

          <div className="auth-field">
            <label className="auth-label">Delivery address <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400 }}>(optional)</span></label>
            <input className="auth-input" placeholder="e.g. 12 Allen Ave, Ikeja, Lagos" value={form.address} onChange={set("address")} />
          </div>

          <button
            className="auth-btn auth-btn-primary"
            style={{ marginTop: 8 }}
            onClick={handleSave}
            disabled={!isValid || loading}
          >
            {loading ? <span className="spinner" /> : "Save & continue"}
          </button>
        </div>
      </div>
    </div>
  );
}