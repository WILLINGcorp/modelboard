import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface UserMenuProps {
  isAuthenticated: boolean;
  onMobileMenuClose?: () => void;
}

export const UserMenu = ({ isAuthenticated, onMobileMenuClose }: UserMenuProps) => {
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

  if (isAuthenticated) {
    return (
      <Button onClick={handleSignOut} className="bg-modelboard-red hover:bg-red-600 text-white w-full md:w-auto">
        Sign out
      </Button>
    );
  }

  return (
    <>
      <Button variant="ghost" onClick={handleAuthClick} className="hover:text-modelboard-red w-full md:w-auto">
        Sign in
      </Button>
      <Button onClick={handleAuthClick} className="bg-modelboard-red hover:bg-red-600 text-white w-full md:w-auto">
        Join now
      </Button>
    </>
  );
};