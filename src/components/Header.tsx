import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { NavigationItems } from "./navigation/NavigationItems";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleAuthClick = () => navigate("/auth");
  const isActive = (path: string) => location.pathname === path;
  const handleNavigate = (path: string) => navigate(path);

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
              <NavigationItems 
                isAuthenticated={!!session}
                onNavigate={handleNavigate}
                isActive={isActive}
              />
            </nav>
            <div className="flex items-center space-x-4">
              {session ? (
                <Button onClick={handleSignOut} className="bg-modelboard-red hover:bg-red-600 text-white">
                  Sign out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={handleAuthClick} className="hover:text-modelboard-red">
                    Sign in
                  </Button>
                  <Button onClick={handleAuthClick} className="bg-modelboard-red hover:bg-red-600 text-white">
                    Join now
                  </Button>
                </>
              )}
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
                onNavigate={handleNavigate}
                isActive={isActive}
                onMobileMenuClose={() => setIsMobileMenuOpen(false)}
              />
              {session ? (
                <Button onClick={handleSignOut} className="bg-modelboard-red hover:bg-red-600 text-white w-full">
                  Sign out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={handleAuthClick} className="hover:text-modelboard-red w-full">
                    Sign in
                  </Button>
                  <Button onClick={handleAuthClick} className="bg-modelboard-red hover:bg-red-600 text-white w-full">
                    Join now
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;