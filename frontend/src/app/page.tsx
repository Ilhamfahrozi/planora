import dynamic from "next/dynamic";
import BrandTrust from "@/components/BrandTrust";
import CategorySection from "@/components/CategorySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

const HeroSectionClient = dynamic(() => import("@/components/HeroSectionClient"));
const VendorFeatured = dynamic(() => import("@/components/VendorFeatured"));
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"));
const TestimonialSection = dynamic(() => import("@/components/TestimonialSection"));
const CtaSection = dynamic(() => import("@/components/CtaSection"));

export default function HomePage() {
  return (
    <>
      <HeroSectionClient />
      <BrandTrust />
      <CategorySection />
      <VendorFeatured />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialSection />
      <CtaSection />
      <Footer />
    </>
  );
}