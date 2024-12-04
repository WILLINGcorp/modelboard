import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold hover-effect">
            ModelBoard
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <a href="#features" className="hover:text-modelboard-red transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-modelboard-red transition-colors">
                How it works
              </a>
              <a href="#pricing" className="hover:text-modelboard-red transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hover:text-modelboard-red">
                Sign in
              </Button>
              <Button className="bg-modelboard-red hover:bg-red-600 text-white">
                Join now
              </Button>
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
              <a href="#features" className="hover:text-modelboard-red transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-modelboard-red transition-colors">
                How it works
              </a>
              <a href="#pricing" className="hover:text-modelboard-red transition-colors">
                Pricing
              </a>
              <Button variant="ghost" className="hover:text-modelboard-red w-full">
                Sign in
              </Button>
              <Button className="bg-modelboard-red hover:bg-red-600 text-white w-full">
                Join now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;