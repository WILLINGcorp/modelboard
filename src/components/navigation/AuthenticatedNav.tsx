import { Button } from "@/components/ui/button";
import { Home, Users, Image, MapPin, MessageSquareMore, User } from "lucide-react";

interface AuthenticatedNavProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}

export const AuthenticatedNav = ({ isActive, onNavigate, isMobile = false }: AuthenticatedNavProps) => {
  const navigationItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Models", path: "/models", icon: Users },
    { label: "Portfolio", path: "/portfolio", icon: Image },
    { label: "Location", path: "/location", icon: MapPin },
    { label: "Ads", path: "/ads", icon: MessageSquareMore },
    { label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive(item.path) ? "text-modelboard-red" : "hover:text-modelboard-red"
          } transition-colors ${isMobile ? "justify-start w-full" : ""}`}
          onClick={() => onNavigate(item.path)}
        >
          <item.icon className="w-4 h-4 mr-2" />
          {item.label}
        </Button>
      ))}
    </>
  );
};