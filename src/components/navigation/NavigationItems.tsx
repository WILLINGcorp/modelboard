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
            isActive("/network") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/network")}
        >
          <Users className="w-4 h-4 mr-2" />
          <span>Network</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/communications") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/communications")}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          <span>Communications</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/my-location") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/my-location")}
        >
          <MapPin className="w-4 h-4 mr-2" />
          <span>My Location</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/my-portfolio") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/my-portfolio")}
        >
          <Image className="w-4 h-4 mr-2" />
          <span>My Portfolio</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/my-profile") ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/my-profile")}
        >
          <User className="w-4 h-4 mr-2" />
          <span>My Profile</span>
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