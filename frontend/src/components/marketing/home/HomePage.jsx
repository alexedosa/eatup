import LandingNav      from "./LandingNav";
import HeroSection     from "./HeroSection";
import DishTicker      from "./DishTicker";
import CustomerSection from "./CustomerSection";
import FoodGallery     from "./FoodGallery";
import VendorSection   from "./VendorSection";
import RiderSection    from "./RiderSection";
import CtaBand         from "./CtaBand";
import LandingFooter   from "./LandingFooter";

export default function HomePage() {
  return (
    <div style={{ background: "#FFFFFF", overflowX: "hidden" }}>
      <LandingNav />
      <main>
        <HeroSection />
        <DishTicker />
        <CustomerSection />
        <FoodGallery />
        <VendorSection />
        <RiderSection />
        <CtaBand />
      </main>
      <LandingFooter />
    </div>
  );
}
