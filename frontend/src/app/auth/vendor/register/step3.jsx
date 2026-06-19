"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function Step3({
  nextStep,
  prevStep,
  updateFormData,
  formData,
  onboardingId
}) {
  const [info, setInfo] = useState({
    description: formData.description || "",
    licenseNumber: formData.licenseNumber || "",
    documentImage: formData.documentImage || null,
    documentPreview: formData.documentPreview || null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => {
    setInfo((prev) => ({ ...prev, [key]: e.target.value }));
    if (error) setError("");
  };

  const handleImageUpload = (e) => {
    if (error) setError("");
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInfo((prev) => ({
          ...prev,
          documentImage: file,
          documentPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    if (error) setError("");
    setInfo((prev) => ({
      ...prev,
      documentImage: null,
      documentPreview: null,
    }));
  };

  const [showFullPreview, setShowFullPreview] = useState(false);

  const isValid =
    info.description.trim() && info.licenseNumber.trim() && info.documentImage;

  const handleSubmit = async () => {
    if (!onboardingId) return;
    setLoading(true);
    setError("");
    try {
      // 1. Upload document first
      const uploadRes = await api.vendorOnboarding.uploadCacDocument(info.documentImage);
      
      if (uploadRes.success) {
        // 2. Save step 3 data
        const body = {
          description: info.description,
          licenseNumber: info.licenseNumber,
          document: {
            fileKey: uploadRes.data.fileKey,
            fileUrl: uploadRes.data.fileUrl,
            fileType: info.documentImage.type
          }
        };
        
        const res = await api.vendorOnboarding.step3(onboardingId, body);
        if (res.success) {
          updateFormData(info);
          nextStep();
        }
      }
    } catch (err) {
      const msg = err.message || "Failed to save verification profile";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      {/* Full Screen Preview Modal */}
      {showFullPreview && (
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
          {info.documentImage?.type === "application/pdf" ? (
            <iframe
              src={info.documentPreview}
              className="w-full h-full max-w-5xl rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 bg-white"
              title="PDF Preview"
            />
          ) : (
            <img
              src={info.documentPreview}
              alt="Full document preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
          )}
        </div>
      )}

      <div className="auth-card">
        {/* Steps indicator — 6 steps now */}
        <div className="auth-steps">
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot active"></div>
          <div className="auth-step-dot idle"></div>
          <div className="auth-step-dot idle"></div>
        </div>

        <div className="auth-logomark">
          <div className="auth-logomark-inner">
            <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        <h1 className="auth-title">Almost there!</h1>

        <div className="auth-field">
          <label className="auth-label">About your restaurant</label>
          <textarea
            className="auth-input"
            placeholder="What makes your place special? Signature dishes, vibe, story..."
            value={info.description}
            onChange={set("description")}
            style={{ minHeight: 100 }}
          />
          <p style={{ fontSize: 12, color: "var(--grey-text)", marginTop: 6 }}>
            {info.description.length} / 300
          </p>
        </div>

        <div className="auth-field">
          <label className="auth-label">Business license number</label>
          <input
            className="auth-input"
            placeholder="CAC/BN/2024-XXXXX"
            value={info.licenseNumber}
            onChange={set("licenseNumber")}
          />
          <p style={{ fontSize: 12, color: "var(--grey-text)", marginTop: 6 }}>
            This is used to verify your business and won't be shown publicly.
          </p>
        </div>

        {/* Document Proof Section */}
        <div className="auth-field document-proof-section">
          <label className="auth-label">
            Upload Business Document
            <span
              style={{
                fontSize: 12,
                color: "var(--auth-accent)",
                marginLeft: 8,
                opacity: 0.7,
              }}
            >
              (Required)
            </span>
          </label>

          {!info.documentPreview ? (
            <label className="document-upload-label">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleImageUpload}
                className="document-input"
              />
              <div className="upload-area">
                <div className="upload-icon-wrapper">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="upload-text">
                  <strong>Click to upload</strong>
                  <p>CAC Certificate or Business License</p>
                </div>
              </div>
            </label>
          ) : (
            <div className="document-preview-container">
              <div
                className="document-preview-box group relative"
                onClick={() => setShowFullPreview(true)}
              >
                {info.documentImage?.type === "application/pdf" ? (
                  <div className="w-full h-32 flex flex-col items-center justify-center bg-stone-100 rounded-xl gap-2 border-2 border-dashed border-stone-200">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                      PDF Document
                    </span>
                  </div>
                ) : (
                  <img
                    src={info.documentPreview}
                    alt="Document preview"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                )}

                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl cursor-pointer">
                  <span className="text-white text-xs font-semibold flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    {info.documentImage?.type === "application/pdf"
                      ? "Open"
                      : "Preview"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 text-green-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Ready for verification
                  </span>
                </div>
                <button
                  onClick={removeImage}
                  className="text-[11px] font-bold text-red-500 hover:text-red-600 uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-[11px] font-bold mb-4 text-red-500 dark:text-orange-200/90 animate-in fade-in slide-in-from-top-1 text-center">
            {error}
          </p>
        )}

        <div className="auth-btn-row" style={{ marginTop: 8 }}>
          <button className="auth-btn auth-btn-ghost" onClick={prevStep}>
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            className="auth-btn auth-btn-primary"
            onClick={handleSubmit}
            disabled={!isValid || loading}
          >
            {loading ? (
              <span className="spinner" />
            ) : (
              <>
                Continue
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
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
