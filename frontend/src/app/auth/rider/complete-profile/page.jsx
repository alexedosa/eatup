"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import {
  Location,
  Card,
  Car,
  ColorSwatch,
  DocumentUpload,
  TickCircle,
  Trash,
  ArrowLeft2,
  Warning2,
} from "iconsax-reactjs";
import logo from "@/assets/logo/logo.png";

const fields = [
  {
    name: "licenseNumber",
    label: "Driver's License Number",
    placeholder: "e.g. LAG-12345678",
    Icon: Card,
    type: "text",
  },
  {
    name: "vehicleModel",
    label: "Vehicle Model",
    placeholder: "e.g. Honda CB125, Toyota Corolla",
    Icon: Car,
    type: "text",
  },
  {
    name: "vehicleColor",
    label: "Vehicle Color",
    placeholder: "e.g. Red, Black",
    Icon: ColorSwatch,
    type: "text",
  },
];

export default function RiderCompleteProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const addressRef = useRef(null);
  const autocompleteRef = useRef(null);

  const [form, setForm] = useState({
    address: "",
    licenseNumber: "",
    vehicleModel: "",
    vehicleColor: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docPreview, setDocPreview] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setDocPreview(ev.target.result);
    reader.readAsDataURL(file);
    if (errors.doc) setErrors((prev) => ({ ...prev, doc: "" }));
  };

  const initAutocomplete = useCallback(() => {
    if (!window.google || !addressRef.current) return;
    
    autocompleteRef.current = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ["address"],
      componentRestrictions: { country: "ng" },
      fields: ["formatted_address", "address_components", "geometry"],
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place?.formatted_address) {
        setForm((prev) => ({ ...prev, address: place.formatted_address }));
        if (errors.address) setErrors((prev) => ({ ...prev, address: "" }));
      }
    });
  }, [errors.address]);

  const validate = () => {
    const newErrors = {};
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.licenseNumber.trim())
      newErrors.licenseNumber = "License number is required";
    if (!form.vehicleModel.trim())
      newErrors.vehicleModel = "Vehicle model is required";
    if (!form.vehicleColor.trim())
      newErrors.vehicleColor = "Vehicle color is required";
    if (!docPreview)
      newErrors.doc = "Please upload your ID or driver's license";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1500)); // API placeholder
      router.push("/auth/success");
    } catch (err) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="auth-page">
      {apiKey && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
          strategy="lazyOnload"
          onLoad={initAutocomplete}
        />
      )}

      <div className="auth-blob auth-blob-1" aria-hidden="true" />
      <div className="auth-blob auth-blob-2" aria-hidden="true" />

      {/* Full Screen Preview Modal */}
      {showFullPreview && docPreview && (
        <div
          className="fixed inset-0 z-[1000] bg-stone-900/90 dark:bg-[#1a1c1e]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setShowFullPreview(false)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setShowFullPreview(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {docFile?.type === "application/pdf" ? (
            <iframe
              src={docPreview}
              className="w-full h-full max-w-5xl rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 bg-white"
              title="PDF Preview"
            />
          ) : (
            <img
              src={docPreview}
              alt="Full document preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
          )}
        </div>
      )}

      <div className="auth-card" style={{ maxWidth: 480 }}>
        {/* Logo */}
        <div className="auth-logomark" style={{ marginBottom: 24 }}>
          <div className="auth-logomark-inner">
            <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        {/* Back */}
        <Link
          href="/auth/rider/signup"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            color: "var(--grey-text)",
            fontSize: 13,
            marginBottom: 20,
            textDecoration: "none",
          }}
        >
          <ArrowLeft2 size="16" variant="Linear" />
          Back to signup
        </Link>

        <h1 className="auth-title">Complete Your Profile</h1>
        <p className="auth-subtitle">
          Just a few more details to get you on the road
        </p>

        {/* Step dots */}
        <div className="auth-steps">
          <div className="auth-step-dot done" />
          <div className="auth-step-dot active" />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Address field (Separate because of ref) */}
          <div className="auth-field">
            <label htmlFor="address" className="auth-label">Home Address</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: 13, color: "var(--grey-text)", display: "flex" }}>
                <Location size="18" variant="Linear" />
              </span>
              <textarea
                id="address"
                name="address"
                ref={addressRef}
                placeholder="12 Allen Avenue, Ikeja, Lagos"
                className="auth-input"
                style={{
                  paddingLeft: 38,
                  borderColor: errors.address ? "#ef4444" : "",
                  minHeight: 80, resize: "none", lineHeight: 1.6
                }}
                value={form.address}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            {errors.address && (
              <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                <Warning2 size="14" variant="Bold" /> {errors.address}
              </p>
            )}
          </div>

          {fields.map(({ name, label, placeholder, Icon, type }) => (
            <div key={name} className="auth-field">
              <label htmlFor={name} className="auth-label">
                {label}
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--grey-text)",
                    display: "flex",
                  }}
                >
                  <Icon size="18" variant="Linear" />
                </span>
                <input
                  id={name}
                  name={name}
                  type="text"
                  placeholder={placeholder}
                  className="auth-input"
                  style={{
                    paddingLeft: 38,
                    borderColor: errors[name] ? "#ef4444" : "",
                  }}
                  value={form[name]}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors[name] && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: 12,
                    marginTop: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Warning2 size="14" variant="Bold" /> {errors[name]}
                </p>
              )}
            </div>
          ))}

          {/* Document upload */}
          <div className="auth-field document-proof-section">
            <label className="auth-label">ID / License Document</label>

            {!docPreview ? (
              <label className="document-upload-label" htmlFor="doc-upload">
                <div className="upload-area">
                  <div className="upload-icon-wrapper">
                    <DocumentUpload
                      size="40"
                      variant="Linear"
                      style={{ color: "var(--primary)" }}
                    />
                  </div>
                  <div className="upload-text">
                    <strong>Click to upload your document</strong>
                    <p>Driver's license, National ID, or Passport</p>
                    <div className="upload-formats">
                      <span>JPG</span>
                      <span>PNG</span>
                      <span>PDF</span>
                    </div>
                  </div>
                </div>
                <input
                  id="doc-upload"
                  type="file"
                  accept="image/*,.pdf"
                  className="document-input"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                />
              </label>
            ) : (
              <div className="document-preview">
                <div className="preview-header">
                  <TickCircle
                    size="18"
                    variant="Bold"
                    style={{ color: "var(--green)" }}
                  />
                  <span>Document uploaded</span>
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => {
                      setDocPreview(null);
                      setDocFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    <Trash size="14" variant="Linear" />
                    Remove
                  </button>
                </div>
                <div 
                  className="preview-content group relative cursor-pointer"
                  onClick={() => setShowFullPreview(true)}
                >
                  {docFile?.type?.startsWith("image/") ? (
                    <img src={docPreview} alt="Document preview" style={{ width: "100%", maxHeight: 250, objectFit: "contain" }} />
                  ) : (
                    <div
                      style={{
                        padding: 40,
                        textAlign: "center",
                        background: "rgba(0,0,0,0.02)",
                      }}
                    >
                      <DocumentUpload
                        size="48"
                        variant="Bulk"
                        style={{ color: "var(--primary)", marginBottom: 12 }}
                      />
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--auth-text)",
                          fontWeight: 600,
                        }}
                      >
                        {docFile?.name}
                      </p>
                      <p style={{ fontSize: 11, color: "var(--grey-text)" }}>
                        PDF Document
                      </p>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-b-xl">
                    <span className="text-white text-xs font-semibold flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      Click to expand
                    </span>
                  </div>
                </div>
                <p className="preview-note">
                  Your document will be reviewed by our team.
                </p>
              </div>
            )}

            {errors.doc && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: 12,
                  marginTop: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Warning2 size="14" variant="Bold" /> {errors.doc}
              </p>
            )}
          </div>

          {/* Submit error */}
          {errors.submit && (
            <div
              role="alert"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                borderRadius: 10,
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                marginBottom: 12,
                color: "#ef4444",
                fontSize: 13,
              }}
            >
              <Warning2 size="16" variant="Bold" />
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="auth-btn auth-btn-primary"
            style={{ marginTop: 8 }}
          >
            {isSubmitting ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="spinner-icon">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray="30 30"
                    opacity="0.3"
                  />
                  <path
                    d="M12 2a10 10 0 019.95 9"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Saving Profile...
              </>
            ) : (
              "Complete Profile"
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner-icon { animation: spin 0.8s linear infinite; }
      `}</style>
    </div>
  );
}
