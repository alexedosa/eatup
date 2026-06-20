import { Anton, Bebas_Neue, Playfair_Display, Syne } from "next/font/google";
import { tickerDishes } from "@/data/landing";

const bebas    = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const anton    = Anton({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "900" });
const syne     = Syne({ subsets: ["latin"], weight: "800" });

const fontMap = {
  bebas:    bebas.className,
  anton:    anton.className,
  playfair: playfair.className,
  syne:     syne.className,
};

const BG = "#FFFFFF";
const ORANGE = "#FF6B2C";
const DARK = "#0A0A0A";

export default function DishTicker() {
  const items = [...tickerDishes, ...tickerDishes];

  return (
    <section
      aria-label="Scrolling dish names"
      style={{
        width: "100%",
        background: BG,
        padding: "32px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top blend */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 40,
        background: `linear-gradient(to bottom, ${BG}, transparent)`,
        pointerEvents: "none", zIndex: 2,
      }} />
      {/* Bottom blend */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 40,
        background: `linear-gradient(to top, ${BG}, transparent)`,
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Label */}
      <div style={{ textAlign: "center", marginBottom: 20, position: "relative", zIndex: 3 }}>
        <p className="font-jakarta" style={{
          fontSize: "clamp(10px, 1.1vw, 12px)",
          fontWeight: 700, letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(10,10,10,0.30)",
        }}>
          Food delivery at your fingertips
        </p>
      </div>

      {/* 80% viewport — masked edges */}
      <div style={{
        width: "80%", margin: "0 auto",
        overflow: "hidden", position: "relative",
        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, black 18%, black 82%, rgba(0,0,0,0.6) 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, black 18%, black 82%, rgba(0,0,0,0.6) 92%, transparent 100%)",
      }}>
        <div className="dish-ticker-track">
          {items.map((dish, idx) => {
            const fontClass = fontMap[dish.font] || bebas.className;
            const isOrange  = idx % 2 === 1;
            return (
              <div key={`${dish.name}-${idx}`} className="dish-ticker-item">
                <span
                  className={fontClass}
                  style={{
                    color: isOrange ? ORANGE : DARK,
                    fontSize: "clamp(42px, 6vw, 80px)",
                    lineHeight: 1,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    whiteSpace: "nowrap",
                    opacity: 0.85,
                  }}
                >
                  {dish.name}
                </span>
                <span aria-hidden="true" style={{
                  display: "inline-block",
                  width: 5, height: 5, borderRadius: "50%",
                  background: isOrange ? "rgba(10,10,10,0.18)" : "rgba(255,107,44,0.35)",
                  flexShrink: 0,
                  marginLeft: "clamp(28px, 4vw, 60px)",
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
