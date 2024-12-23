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

  if (isAuthenticated) {
    return (
      <Button 
        onClick={handleSignOut} 
        className={`bg-modelboard-red hover:bg-red-600 text-white ${
          isMobile ? "w-full" : ""
        }`}
      >
        Sign out
      </Button>
    );
  }

  return (
    <>
      <Button 
        variant="ghost" 
        onClick={handleAuthClick} 
        className={`hover:text-modelboard-red ${
          isMobile ? "w-full" : ""
        }`}
      >
        Sign in
      </Button>
      <Button 
        onClick={handleAuthClick} 
        className={`bg-modelboard-red hover:bg-red-600 text-white ${
          isMobile ? "w-full" : ""
        }`}
      >
        Join now
      </Button>
    </>
  );
};