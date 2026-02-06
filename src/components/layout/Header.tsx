import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchDialog } from "./SearchDialog";
import { useCart } from "@/contexts/CartContext";
import ianoniLogo from "@/assets/ianoni-logo.png";

const navLinks = [
  { name: "Shop Padel", href: "/padel" },
  { name: "Starter Kits", href: "/starter-kits" },
  { name: "Accessories", href: "/accessories" },
  { name: "Guide", href: "/guide" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // On home page, start transparent with light text, then become solid on scroll
  const showDarkHeader = isScrolled || !isHomePage;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          showDarkHeader
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-24">
            <Link 
              to="/" 
              className="relative z-10"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={ianoniLogo}
                alt="IANONI"
                className={cn(
                  "h-12 w-auto transition-all duration-300",
                  !showDarkHeader && "brightness-0 invert"
                )}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-base font-medium tracking-wide transition-colors underline-reveal py-1",
                    showDarkHeader
                      ? location.pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                      : location.pathname === link.href
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "transition-colors h-11 w-11",
                  showDarkHeader
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Search className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className={cn(
                  "transition-colors h-11 w-11 relative",
                  showDarkHeader
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Link to="/cart">
                  <ShoppingBag className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden transition-colors h-11 w-11",
                  showDarkHeader ? "text-foreground" : "text-white"
                )}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-cinema pt-24"
          >
            <nav className="container mx-auto px-4 py-12 space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "block text-3xl font-bold",
                      location.pathname === link.href ? "text-white" : "text-white/50"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
