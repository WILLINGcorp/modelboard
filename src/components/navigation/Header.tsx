import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { NavigationItems } from "./NavigationItems";
import { UserMenu } from "./UserMenu";
import { MobileMenuButton } from "./MobileMenuButton";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center space-x-8">
            <NavigationItems isAuthenticated={!!session} />
            <UserMenu isAuthenticated={!!session} />
          </div>

          <MobileMenuButton 
            isOpen={isMobileMenuOpen} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          />
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 animate-fadeIn">
            <NavigationItems 
              isAuthenticated={!!session} 
              onMobileMenuClose={() => setIsMobileMenuOpen(false)} 
            />
            <UserMenu 
              isAuthenticated={!!session} 
              onMobileMenuClose={() => setIsMobileMenuOpen(false)} 
            />
          </div>
        )}
      </div>
    </header>
  );
};