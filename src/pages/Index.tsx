import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { CategoryPanels } from "@/components/home/CategoryPanels";
import { WhyIanoni } from "@/components/home/WhyIanoni";
import { BestSellers } from "@/components/home/BestSellers";
import { TrustSection } from "@/components/home/TrustSection";
import { BeginnerHub } from "@/components/home/BeginnerHub";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PromoBanner />
      <CategoryPanels />
      <WhyIanoni />
      <BestSellers />
      <TrustSection />
      <BeginnerHub />
    </Layout>
  );
};

export default Index;