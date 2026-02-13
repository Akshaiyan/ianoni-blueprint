import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import GuidePage from "./pages/GuidePage";
import Padel101Page from "./pages/Padel101Page";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/collection/:category" element={<CollectionPage />} />
          <Route path="/padel" element={<CollectionPage />} />
          <Route path="/accessories" element={<CollectionPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/guide/padel-101" element={<Padel101Page />} />
          <Route path="/guide/*" element={<GuidePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
