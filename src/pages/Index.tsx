import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { CategoryPanels } from "@/components/home/CategoryPanels";
import { EditorialBreak } from "@/components/home/EditorialBreak";
import { WhyIanoni } from "@/components/home/WhyIanoni";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { TrustSection } from "@/components/home/TrustSection";
import { BeginnerHub } from "@/components/home/BeginnerHub";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PromoBanner />
      <ProductShowcase />
      <EditorialBreak 
        text="Designed for decisive moments."
        subtext="Engineering meets instinct"
        variant="light"
      />
      <CategoryPanels />
      <WhyIanoni />
      <EditorialBreak 
        text="Precision at every touch."
        variant="dark"
      />
      <TrustSection />
      <BeginnerHub />
    </Layout>
  );
};

export default Index;
