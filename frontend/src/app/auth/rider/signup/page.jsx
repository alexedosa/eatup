"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Profile,
  Call,
  TickCircle,
  Warning2,
  InfoCircle,
} from "iconsax-reactjs";
import logo from "@/assets/logo/logo.png";
import countryCodes from "@/data/countryCodesData";

const vehicles = [
  { value: "bike", label: "Motorbike" },
  { value: "bicycle", label: "Bicycle" },
  { value: "scooter", label: "Scooter" },
  { value: "car", label: "Car" },
];

export default function RiderSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    countryCode: "+234",
    vehicleType: "bike" 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const dropdownRef = useRef(null);

  const selectedCountry = countryCodes.find((c) => c.dialCode === form.countryCode) || countryCodes.find(c => c.code === "NG") || countryCodes[0];

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    else if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleVehicleSelect = (value) => {
    if (!isSubmitting) setForm((prev) => ({ ...prev, vehicleType: value }));
  };

  const selectCountry = (country) => {
    setForm((prev) => ({ ...prev, countryCode: country.dialCode }));
    setShowCountryDropdown(false);
    setCountrySearch("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCountryDropdown(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/rider/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || "Signup failed");
      }
      router.push("/auth/rider/complete-profile");
    } catch (error) {
      setErrors({ submit: error.message || "Failed to create account. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" aria-hidden="true" />
      <div className="auth-blob auth-blob-2" aria-hidden="true" />

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logomark">
          <div className="auth-logomark-inner">
            <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        <h1 className="auth-title" style={{ textAlign: "center" }}>Become a Rider</h1>
        <p className="auth-subtitle" style={{ textAlign: "center" }}>
          Join our delivery partner network
        </p>

        {/* Step dots */}
        <div className="auth-steps">
          <div className="auth-step-dot active" />
          <div className="auth-step-dot idle" />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="auth-field">
            <label htmlFor="name" className="auth-label">Full Name</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--grey-text)", display: "flex" }}>
                <Profile size="18" variant="Linear" />
              </span>
              <input
                id="name" name="name" type="text" placeholder="Your Name"
                className="auth-input"
                style={{ paddingLeft: 38, borderColor: errors.name ? "#ef4444" : "" }}
                value={form.name} onChange={handleChange}
                disabled={isSubmitting} autoComplete="name"
              />
            </div>
            {errors.name && (
              <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                <InfoCircle size="14" variant="Bold" /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="auth-field">
            <label htmlFor="phone" className="auth-label">Phone Number</label>
            <div className="phone-input-group">
              <div className="country-code-wrapper" ref={dropdownRef}>
                <button
                  type="button"
                  className="country-code-btn"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  disabled={isSubmitting}
                >
                  <span className="country-flag">{selectedCountry.flag}</span>
                  <span className="country-dial">{selectedCountry.dialCode}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {showCountryDropdown && (
                  <div className="country-dropdown">
                    <input
                      className="country-search"
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      autoFocus
                    />
                    <div className="country-list">
                      {filteredCountries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          className={`country-option${c.dialCode === form.countryCode ? " active" : ""}`}
                          onClick={() => selectCountry(c)}
                        >
                          <span className="country-flag">{c.flag}</span>
                          <span className="country-name">{c.name}</span>
                          <span className="country-dial">{c.dialCode}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <input
                id="phone" name="phone" type="tel" placeholder="800 000 0000"
                className="auth-input phone-number-input"
                style={{ borderColor: errors.phone ? "#ef4444" : "" }}
                value={form.phone} onChange={handleChange}
                disabled={isSubmitting} autoComplete="tel"
              />
            </div>
            {errors.phone && (
              <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                <InfoCircle size="14" variant="Bold" /> {errors.phone}
              </p>
            )}
          </div>

          {/* Vehicle selector */}
          <div className="auth-field">
            <label className="auth-label">Vehicle Type</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}
              role="radiogroup" aria-label="Vehicle type">
              {vehicles.map(({ value, label }) => {
                const isSelected = form.vehicleType === value;
                return (
                  <button
                    key={value} type="button" role="radio" aria-checked={isSelected}
                    disabled={isSubmitting}
                    onClick={() => handleVehicleSelect(value)}
                    style={{
                      display: "flex",
                      alignItems: "center", justifyContent: "space-between",
                      padding: "14px 16px", borderRadius: 12,
                      border: `1.5px solid ${isSelected ? "var(--primary)" : "var(--auth-border)"}`,
                      background: isSelected ? "rgba(255,107,44,0.04)" : "var(--auth-surface-2)",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      color: isSelected ? "var(--primary)" : "var(--auth-text)",
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: isSelected ? 700 : 500 }}>
                      {label}
                    </span>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      border: `2px solid ${isSelected ? "var(--primary)" : "var(--auth-border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isSelected ? "var(--primary)" : "transparent",
                      transition: "all 0.2s ease"
                    }}>
                      {isSelected && <TickCircle size="12" variant="Bold" color="white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit error */}
          {errors.submit && (
            <div role="alert" style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 14px", borderRadius: 10,
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              marginBottom: 12, color: "#ef4444", fontSize: 13,
            }}>
              <Warning2 size="16" variant="Bold" />
              {errors.submit}
            </div>
          )}

          <button type="submit" disabled={isSubmitting}
            className="auth-btn auth-btn-primary" style={{ marginTop: 8 }}>
            {isSubmitting ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="spinner-icon">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30 30" opacity="0.3" />
                  <path d="M12 2a10 10 0 019.95 9" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Creating Account...
              </>
            ) : "Sign Up as Rider"}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-divider" style={{ marginTop: 20 }}>
          <span className="auth-divider-line" />
          <span className="auth-divider-text">or</span>
          <span className="auth-divider-line" />
        </div>
        <p className="auth-footer-note">
          Already have an account?{" "}
          <Link href="/auth/login?role=rider" className="auth-text-link">Log in</Link>
        </p>
        <p className="auth-footer-note" style={{ marginTop: 8 }}>
          By signing up, you agree to our{" "}
          <Link href="/terms" className="auth-text-link">Terms</Link> and{" "}
          <Link href="/privacy" className="auth-text-link">Privacy Policy</Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner-icon { animation: spin 0.8s linear infinite; }
      `}</style>
    </div>
  );
}