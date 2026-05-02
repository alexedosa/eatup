"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Script from "next/script";
import countryCodes from "@/data/countryCodesData";
import logo from "@/assets/logo/logo.png";

export default function Step2({ nextStep, prevStep, updateFormData, formData }) {
  const [details, setDetails] = useState({
    businessName: formData.businessName || "",
    address: formData.address || "",
    phone: formData.phone || "",
    email: formData.email || "",
    countryCode: formData.countryCode || "+234",
  });

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const addressRef = useRef(null);
  const autocompleteRef = useRef(null);
  const dropdownRef = useRef(null);

  const selectedCountry = countryCodes.find((c) => c.dialCode === details.countryCode) || countryCodes[0];

  const set = (key) => (e) => setDetails((prev) => ({ ...prev, [key]: e.target.value }));

  // Initialize Google Places Autocomplete
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
        setDetails((prev) => ({ ...prev, address: place.formatted_address }));
      }
    });
  }, []);

  // Close country dropdown on outside click
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

  const selectCountry = (country) => {
    setDetails((prev) => ({ ...prev, countryCode: country.dialCode }));
    setShowCountryDropdown(false);
    setCountrySearch("");
  };

  const isValid =
    details.businessName.trim() &&
    details.address.trim() &&
    details.phone.trim() &&
    details.email.trim();

  const handleNext = () => {
    updateFormData(details);
    nextStep();
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="auth-page">
      {/* Load Google Maps Places API */}
      {apiKey && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
          strategy="lazyOnload"
          onLoad={initAutocomplete}
        />
      )}

      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card">
        {/* Steps indicator — 5 steps */}
        <div className="auth-steps">
          <div className="auth-step-dot done"></div>
          <div className="auth-step-dot active"></div>
          <div className="auth-step-dot idle"></div>
          <div className="auth-step-dot idle"></div>
          <div className="auth-step-dot idle"></div>
        </div>

        <div className="auth-logomark">
          <div className="auth-logomark-inner">
            <Image src={logo} alt="EatUp" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </div>
        </div>

        <h1 className="auth-title">Tell us about your restaurant</h1>
        <p className="auth-subtitle" style={{ marginBottom: 24 }}>
          Tell customers and our team about your restaurant.
        </p>

        <div className="auth-field">
          <label className="auth-label">Restaurant name</label>
          <input
            className="auth-input"
            placeholder="e.g. Mama's Kitchen"
            value={details.businessName}
            onChange={set("businessName")}
          />
        </div>

        <div className="auth-field">
          <label className="auth-label">Address</label>
          <textarea
            ref={addressRef}
            className="auth-input"
            placeholder="Start typing your address..."
            value={details.address}
            onChange={set("address")}
            rows={3}
            style={{ minHeight: 80, resize: "none", lineHeight: 1.6 }}
          />
        </div>

        {/* Phone Field */}
        <div className="auth-field">
          <label className="auth-label">Phone Number</label>
          <div className="phone-input-group">
            <div className="country-code-wrapper" ref={dropdownRef}>
              <button
                type="button"
                className="country-code-btn"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
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
                        className={`country-option${c.dialCode === details.countryCode ? " active" : ""}`}
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
              className="auth-input phone-number-input"
              placeholder="080 0000 0000"
              value={details.phone}
              onChange={set("phone")}
              type="tel"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="auth-field">
          <label className="auth-label">Email Address</label>
          <input
            className="auth-input"
            placeholder="you@example.com"
            value={details.email}
            onChange={set("email")}
            type="email"
          />
        </div>

        <div className="auth-btn-row" style={{ marginTop: 8 }}>
          <button className="auth-btn auth-btn-ghost" onClick={prevStep}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <button className="auth-btn auth-btn-primary" onClick={handleNext} disabled={!isValid}>
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}