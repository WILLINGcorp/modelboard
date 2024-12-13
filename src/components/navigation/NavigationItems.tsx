import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, MessageSquare, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    onMobileMenuClose?.();
  };

  const isActive = (path: string) => location.pathname === path;

  if (isAuthenticated) {
    return (
      <>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/") ? "text-modelboard-red" : "hover:text-white hover:bg-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/")}
        >
          <Home className="w-4 h-4 mr-2" />
          <span>Home</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/network") ? "text-modelboard-red" : "hover:text-white hover:bg-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/network")}
        >
          <Users className="w-4 h-4 mr-2" />
          <span>Network</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex items-center space-x-2 ${
            isActive("/communications") ? "text-modelboard-red" : "hover:text-white hover:bg-modelboard-red"
          } transition-colors`}
          onClick={() => handleNavigation("/communications")}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          <span>Communications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="hover:text-white hover:bg-modelboard-red transition-colors">
              Account <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-modelboard-gray text-white border-modelboard-red">
            <DropdownMenuItem onClick={() => handleNavigation("/dashboard")} className="cursor-pointer hover:bg-modelboard-red">
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/my-location")} className="cursor-pointer hover:bg-modelboard-red">
              My Location
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/my-portfolio")} className="cursor-pointer hover:bg-modelboard-red">
              My Portfolio
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/my-profile")} className="cursor-pointer hover:bg-modelboard-red">
              My Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-modelboard-red/20" />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer hover:bg-modelboard-red">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        className="hover:text-white hover:bg-modelboard-red transition-colors"
        asChild
      >
        <a href="#features">Features</a>
      </Button>
      <Button
        variant="ghost"
        className="hover:text-white hover:bg-modelboard-red transition-colors"
        asChild
      >
        <a href="#how-it-works">How it works</a>
      </Button>
      <Button
        variant="ghost"
        className="hover:text-white hover:bg-modelboard-red transition-colors"
        asChild
      >
        <a href="#pricing">Pricing</a>
      </Button>
    </>
  );
};