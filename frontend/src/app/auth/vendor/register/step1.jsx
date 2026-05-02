"use client";
import { useState } from "react";

import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const NIGERIAN_DISHES = [
  {
    name: "Jollof Rice",
    image:
      "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=400&fit=crop",
  },
  {
    name: "Egusi Soup",
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=400&fit=crop",
  },
  {
    name: "Suya",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop",
  },
  {
    name: "Pounded Yam",
    image:
      "https://images.unsplash.com/photo-1625865733889-e3fc0141a84b?w=400&h=400&fit=crop",
  },
  {
    name: "Amala",
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=400&fit=crop",
  },
  {
    name: "Pepper Soup",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop",
  },
  {
    name: "Ofada Rice",
    image:
      "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=400&fit=crop",
  },
  {
    name: "Moi Moi",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
  },
  {
    name: "Akara",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
  },
  {
    name: "Fried Rice",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop",
  },
  {
    name: "Efo Riro",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=400&fit=crop",
  },
  {
    name: "Chin Chin",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
  },
];

export default function Step1({ nextStep, updateFormData, formData }) {
  const [selected, setSelected] = useState(formData.categories || []);

  const toggle = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  const handleNext = () => {
    updateFormData({ categories: selected });
    nextStep();
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card">
        {/* Steps indicator — 5 steps */}
        <div className="auth-steps">
          <div className="auth-step-dot active"></div>
          <div className="auth-step-dot idle"></div>
          <div className="auth-step-dot idle"></div>
          <div className="auth-step-dot idle"></div>
          <div className="auth-step-dot idle"></div>
        </div>

        <div className="auth-logomark">
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
        </div>

        <h1 className="auth-title">What dishes do you serve?</h1>

        <p className="auth-subtitle">
          Pick everything that applies. You can change this later.
        </p>

        <div className="dish-grid">
          {NIGERIAN_DISHES.map((dish) => (
            <button
              key={dish.name}
              className={`dish-card${selected.includes(dish.name) ? " selected" : ""}`}
              onClick={() => toggle(dish.name)}
              type="button"
            >
              <div className="dish-card-img-wrap">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="dish-card-img"
                  loading="lazy"
                />
                <div className="dish-card-overlay" />
                {selected.includes(dish.name) && (
                  <div className="dish-card-check">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="dish-card-tag">{dish.name}</span>
            </button>
          ))}
        </div>

        {selected.length > 0 && (
          <p
            style={{
              fontSize: 12,
              color: "var(--grey-text)",
              marginBottom: 16,
              marginTop: 4,
            }}
          >
            {selected.length} selected
          </p>
        )}

        <button
          className="auth-btn auth-btn-primary"
          onClick={handleNext}
          disabled={selected.length === 0}
        >
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
        </button>
      </div>
    </div>
  );
}
