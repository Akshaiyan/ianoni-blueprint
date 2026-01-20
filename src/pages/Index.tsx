import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { CategoryPanels } from "@/components/home/CategoryPanels";
import { WhyIanoni } from "@/components/home/WhyIanoni";
import { TrustSection } from "@/components/home/TrustSection";
import { BestSellers } from "@/components/home/BestSellers";
import { BeginnerHub } from "@/components/home/BeginnerHub";

const Index = () => {
  return (
    <Layout>
      {/* 1. Hero with lifestyle shot + value prop + CTAs */}
      <HeroSection />
      
      {/* 2. Promo strip with urgency */}
      <PromoBanner />
      
      {/* 3. Category tiles */}
      <CategoryPanels />
      
      {/* 4. Why IANONI - key selling points */}
      <WhyIanoni />
      
      {/* 5. Trust/Social proof */}
      <TrustSection />
      
      {/* 6. Best Sellers carousel */}
      <BestSellers />
      
      {/* 7. Beginner's Guide section */}
      <BeginnerHub />
    </Layout>
  );
};

export default Index;
