import BgGradient from "@/components/common/bg-gradient";
import CTASection from "@/components/home/CTASection";
import DemoSection from "@/components/home/Demo-Section";
import HeroSection from "@/components/home/Hero-Section";
import HowItWorksSection from "@/components/home/HowItWorkSection";
import PricingSection from "@/components/home/PricingSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
      <HeroSection />
      <DemoSection /> 
      <HowItWorksSection />
      <PricingSection />
      <CTASection/>
      </div>
    </div>
  );
}
