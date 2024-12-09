import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Image, MapPin, User, MessageSquare } from "lucide-react";

interface NavigationItemsProps {
  isAuthenticated: boolean;
  onMobileMenuClose?: () => void;
}

export const NavigationItems = ({ isAuthenticated, onMobileMenuClose }: NavigationItemsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onMobileMenuClose?.();
  };

  const isActive = (path: string) => location.pathname === path;

  if (isAuthenticated) {
    return (
      <>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/")}
        >
          <Home className="w-4 h-4 mr-2" />
          <span>Home</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/models") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/models")}
        >
          <Users className="w-4 h-4 mr-2" />
          <span>Models</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/portfolio") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/portfolio")}
        >
          <Image className="w-4 h-4 mr-2" />
          <span>Portfolio</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/location") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/location")}
        >
          <MapPin className="w-4 h-4 mr-2" />
          <span>Location</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/messages") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/messages")}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          <span>Messages</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/profile") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/profile")}
        >
          <User className="w-4 h-4 mr-2" />
          <span>Profile</span>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        className="hover:text-modelboard-red transition-colors"
        asChild
      >
        <a href="#features">Features</a>
      </Button>
      <Button
        variant="ghost"
        className="hover:text-modelboard-red transition-colors"
        asChild
      >
        <a href="#how-it-works">How it works</a>
      </Button>
      <Button
        variant="ghost"
        className="hover:text-modelboard-red transition-colors"
        asChild
      >
        <a href="#pricing">Pricing</a>
      </Button>
    </>
  );
};