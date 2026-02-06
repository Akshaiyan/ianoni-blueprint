import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Truck } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 z-[60]">
        <Truck className="h-4 w-4" />
        <span>Free UK-Wide Shipping on All Orders</span>
      </div>
      {/* Spacer for fixed announcement bar */}
      <div className="h-9" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}