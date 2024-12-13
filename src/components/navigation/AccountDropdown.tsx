import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AccountDropdownProps {
  onMobileMenuClose?: () => void;
}

export const AccountDropdown = ({ onMobileMenuClose }: AccountDropdownProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onMobileMenuClose?.();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    onMobileMenuClose?.();
  };

  return (
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
  );
};