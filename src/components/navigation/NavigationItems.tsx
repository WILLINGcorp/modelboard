import { Button } from "@/components/ui/button";
import { Home, Users, Image, MapPin, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavigationItemsProps {
  isAuthenticated: boolean;
  onNavigate: (path: string) => void;
  isActive: (path: string) => boolean;
  onMobileMenuClose?: () => void;
}

export const NavigationItems = ({ 
  isAuthenticated, 
  onNavigate, 
  isActive,
  onMobileMenuClose 
}: NavigationItemsProps) => {
  const handleClick = (path: string) => {
    if (!path.startsWith("#")) {
      onNavigate(path);
      onMobileMenuClose?.();
    }
  };

  const navigationItems = isAuthenticated ? [
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
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive(item.path) ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors`}
          onClick={() => handleClick(item.path)}
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
    </>
  );
};