import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface UserMenuProps {
  isAuthenticated: boolean;
  onMobileMenuClose?: () => void;
  isMobile?: boolean;
}

export const UserMenu = ({ isAuthenticated, onMobileMenuClose, isMobile = false }: UserMenuProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      onMobileMenuClose?.();
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