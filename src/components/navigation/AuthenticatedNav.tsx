import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Users, MessageSquare } from "lucide-react";

interface AuthenticatedNavProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const AuthenticatedNav = ({ isActive, onNavigate }: AuthenticatedNavProps) => {
  return (
    <>
      <Button
        variant="ghost"
        className={`flex items-center space-x-2 ${
          isActive("/") ? "text-modelboard-red" : "hover:text-white hover:bg-modelboard-red"
        } transition-colors`}
        onClick={() => onNavigate("/")}
      >
        <Home className="w-4 h-4 mr-2" />
        <span>Home</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex items-center space-x-2 ${
          isActive("/network") ? "text-modelboard-red" : "hover:text-white hover:bg-modelboard-red"
        } transition-colors`}
        onClick={() => onNavigate("/network")}
      >
        <Users className="w-4 h-4 mr-2" />
        <span>Network</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex items-center space-x-2 ${
          isActive("/communications") ? "text-modelboard-red" : "hover:text-white hover:bg-modelboard-red"
        } transition-colors`}
        onClick={() => onNavigate("/communications")}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        <span>Communications</span>
      </Button>
    </>
  );
};