import HeroSection from "./components/sections/HeroSection";
import StatsRow from "./components/sections/StatsRow";
import ServicesAccordion from "./components/sections/ServicesAccordion";
import FeaturesShowcase from "./components/sections/FeaturesShowcase";
import ContactCTA from "./components/sections/ContactCTA";
import FAQSection from "./components/sections/FAQSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsRow />
      <FeaturesShowcase />
      <ServicesAccordion />
      <ContactCTA />
      <FAQSection />
    </main>
  );
}
