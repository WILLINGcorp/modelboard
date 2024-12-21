import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Image, Home, Users, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

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
      
      // If session is null (user logged out), redirect to home
      if (!session && location.pathname !== '/') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAuthClick = () => {
    navigate("/auth");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = session ? [
    { label: "Home", path: "/", icon: Home },
    { label: "Models", path: "/models", icon: Users },
    { label: "Portfolio", path: "/portfolio", icon: Image },
    { label: "Location", path: "/location", icon: MapPin },
    { label: "Profile", path: "/profile", icon: User },
  ] : [
    { label: "Features", path: "#features" },
    { label: "How it works", path: "#how-it-works" },
    { label: "Pricing", path: "#pricing" },
  ];

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
              src="/modelboard_logo_white.png" 
              alt="ModelBoard" 
              className="h-8 md:h-10"
            />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`flex items-center space-x-2 ${
                    isActive(item.path) ? "text-modelboard-red" : "hover:text-modelboard-red"
                  } transition-colors`}
                  onClick={() => item.path.startsWith("#") ? null : navigate(item.path)}
                  asChild={item.path.startsWith("#")}
                >
                  {item.path.startsWith("#") ? (
                    <a href={item.path}>
                      {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                      {item.label}
                    </a>
                  ) : (
                    <span>
                      {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                      {item.label}
                    </span>
                  )}
                </Button>
              ))}
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
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`flex items-center space-x-2 justify-start w-full ${
                    isActive(item.path) ? "text-modelboard-red" : "hover:text-modelboard-red"
                  } transition-colors`}
                  onClick={() => {
                    if (!item.path.startsWith("#")) {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  asChild={item.path.startsWith("#")}
                >
                  {item.path.startsWith("#") ? (
                    <a href={item.path}>
                      {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                      {item.label}
                    </a>
                  ) : (
                    <span>
                      {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                      {item.label}
                    </span>
                  )}
                </Button>
              ))}
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
