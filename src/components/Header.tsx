import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Menu, X } from "lucide-react";
import { NavigationItems } from "./navigation/NavigationItems";
import { UserMenu } from "./navigation/UserMenu";
import { Logo } from "./navigation/Logo";
import { MobileNav } from "./navigation/MobileNav";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && location.pathname !== '/') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center space-x-8">
            <NavigationItems isAuthenticated={!!session} />
            <UserMenu isAuthenticated={!!session} />
          </div>

          <button
            className="md:hidden p-2 hover:bg-modelboard-gray rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <MobileNav 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          isAuthenticated={!!session}
        />
      </div>
    </header>
  );
};

export default Header;