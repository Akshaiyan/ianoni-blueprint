import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { CategoryPanels } from "@/components/home/CategoryPanels";
import { ProductEditorial } from "@/components/home/ProductEditorial";
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
      
      {/* 4. Editorial product showcase - floating racket with tech specs */}
      <ProductEditorial />
      
      {/* 5. Why IANONI - key selling points */}
      <WhyIanoni />
      
      {/* 6. Trust/Social proof */}
      <TrustSection />
      
      {/* 7. Best Sellers carousel */}
      <BestSellers />
      
      {/* 8. Beginner's Guide section */}
      <BeginnerHub />
    </Layout>
  );
};

export default Index;
