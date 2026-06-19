import LandingNav from "./LandingNav";
import HeroSection from "./HeroSection";
import DishTicker from "./DishTicker";
import FoodGallery from "./FoodGallery";
import CustomerSection from "./CustomerSection";
import VendorSection from "./VendorSection";
import ZenModePanel from "./ZenModePanel";
import RiderSection from "./RiderSection";
import CtaBand from "./CtaBand";
import LandingFooter from "./LandingFooter";

export default function HomePage() {
  return (
    <div style={{ background: "#0A0A0A", color: "#FFFFFF", overflowX: "hidden" }}>
      <LandingNav />
      <main>
        <HeroSection />
        <DishTicker />
        <CustomerSection />
        <FoodGallery />
        <VendorSection />
        <ZenModePanel />
        <RiderSection />
        <CtaBand />
      </main>
      <LandingFooter />
    </div>
  );
}
