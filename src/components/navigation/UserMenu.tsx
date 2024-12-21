import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface UserMenuProps {
  isAuthenticated: boolean;
  onMobileMenuClose?: () => void;
  isMobile?: boolean;
}

export const UserMenu = ({ isAuthenticated, onMobileMenuClose, isMobile = false }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    onMobileMenuClose?.();
  };

  const handleAuthClick = () => {
    navigate("/auth");
    onMobileMenuClose?.();
  };

  const containerClasses = isMobile 
    ? "flex flex-col space-y-4 w-full" 
    : "flex items-center space-x-4";

  const buttonClasses = isMobile 
    ? "w-full justify-start" 
    : "";

  if (isAuthenticated) {
    return (
      <div className={containerClasses}>
        <Button 
          onClick={handleSignOut} 
          className={`bg-modelboard-red hover:bg-red-600 text-white ${buttonClasses}`}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <Button 
        variant="ghost" 
        onClick={handleAuthClick} 
        className={`hover:text-modelboard-red ${buttonClasses}`}
      >
        Sign in
      </Button>
      <Button 
        onClick={handleAuthClick} 
        className={`bg-modelboard-red hover:bg-red-600 text-white ${buttonClasses}`}
      >
        Join now
      </Button>
    </div>
  );
};