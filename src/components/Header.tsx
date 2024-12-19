import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NavigationItems } from "./navigation/NavigationItems";
import { UserMenu } from "./navigation/UserMenu";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // If session is null (user logged out), redirect to auth
      if (!session && location.pathname !== '/') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" className="hover-effect">
            <img 
              src="/modelboard-logo.png" 
              alt="ModelBoard" 
              className="h-8 md:h-10"
            />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <NavigationItems isAuthenticated={!!session} />
            </nav>
            <div className="flex items-center space-x-4">
              <UserMenu isAuthenticated={!!session} />
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <NavigationItems 
                isAuthenticated={!!session} 
                onMobileMenuClose={() => setIsMobileMenuOpen(false)} 
              />
              <UserMenu 
                isAuthenticated={!!session} 
                onMobileMenuClose={() => setIsMobileMenuOpen(false)} 
              />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;