import { Link } from "react-router-dom";
import ianoniLogo from "@/assets/ianoni-logo.png";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block">
              <img src={ianoniLogo} alt="IANONI" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm mt-4 max-w-xs">Premium padel equipment engineered for players at every level.</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/padel" className="text-muted-foreground text-sm hover:text-foreground transition-colors">Padel Rackets</Link></li>
              <li><Link to="/accessories" className="text-muted-foreground text-sm hover:text-foreground transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/guide" className="text-muted-foreground text-sm hover:text-foreground transition-colors">Buying Guide</Link></li>
              <li><Link to="/faq" className="text-muted-foreground text-sm hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-muted-foreground text-sm hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground text-sm hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} IANONI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}