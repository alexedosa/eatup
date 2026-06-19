import Image from "next/image";
import ewedu from "@/assets/gallery/ewedu.jpg";
import jollofRice from "@/assets/gallery/jollof-rice.jpg";
import friedRiceChicken from "@/assets/gallery/friedrice-N-chicken.jpg";
import plantain from "@/assets/gallery/plantain.jpg";
import smallChops from "@/assets/gallery/small-chops.jpg";
import spag from "@/assets/gallery/spag.jpg";

const FOODS = [
  {
    id: 1,
    area: "g-one",
    slide: "gslide-up",
    name: "Ewedu",
    image: ewedu,
  },
  {
    id: 2,
    area: "g-two",
    slide: "gslide-left",
    name: "Jollof Rice",
    image: jollofRice,
  },
  {
    id: 3,
    area: "g-three",
    slide: "gslide-right",
    name: "Fried Rice & Chicken",
    image: friedRiceChicken,
  },
  {
    id: 4,
    area: "g-four",
    slide: "gslide-down",
    name: "Fried Plantain",
    image: plantain,
  },
  {
    id: 5,
    area: "g-five",
    slide: "gslide-up",
    name: "Small Chops",
    image: smallChops,
  },
  {
    id: 6,
    area: "g-six",
    slide: "gslide-right",
    name: "Spaghetti",
    image: spag,
  },
];

export default function FoodGallery() {
  return (
    <section
      id="gallery"
      style={{
        width: "100%",
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
        padding: "100px 0 120px",
      }}
    >
      {/* Spotlight vignette — stage-light feel */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 55% at 50% 42%,
              rgba(255,107,44,0.055) 0%,
              rgba(20,20,20,0.0) 50%,
              #0A0A0A 100%
            )
          `,
          pointerEvents: "none",
        }}
      />

      {/* Edge vignette — fade out sides to black */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #0A0A0A 0%, transparent 8%, transparent 92%, #0A0A0A 100%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* ── Title ── */}
        <div style={{ textAlign: "center", marginBottom: 48, padding: "0 24px" }}>
          <p
            className="font-jakarta"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#FF6B2C",
              marginBottom: 12,
            }}
          >
            Real food, real kitchens
          </p>
          <h2
            className="font-jakarta"
            style={{
              fontSize: "clamp(36px, 5.5vw, 68px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
              color: "#FFFFFF",
            }}
          >
            <span style={{ fontStyle: "italic", color: "#FF6B2C" }}>X</span>plore Our{" "}
            <span
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.85)",
                color: "transparent",
              }}
            >
              Food Gallery
            </span>
          </h2>
          <p
            className="font-jakarta"
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.38)",
              marginTop: 14,
              maxWidth: 420,
              margin: "14px auto 0",
            }}
          >
            Hover to explore. Order what calls you.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="gallery-grid">
          {FOODS.map((food) => (
            <div
              key={food.id}
              className={`gallery-card ${food.area} ${food.slide}`}
            >
              <div className="gc-image-wrap">
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  sizes="(max-width: 900px) 50vw, 45vw"
                  className="gc-img"
                  priority={food.id <= 2}
                />
              </div>

              <div className="gc-overlay" />

              <div className="gc-label">
                <p
                  className="font-jakarta"
                  style={{
                    fontSize: "clamp(16px, 1.8vw, 22px)",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                  }}
                >
                  {food.name}
                </p>
              </div>

              <div className="gc-tag">
                <span
                  className="font-jakarta"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.72)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {food.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
