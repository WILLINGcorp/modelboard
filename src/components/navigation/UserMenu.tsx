import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface UserMenuProps {
  isAuthenticated: boolean;
  onMobileMenuClose?: () => void;
}

export const UserMenu = ({ isAuthenticated, onMobileMenuClose }: UserMenuProps) => {
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

  if (isAuthenticated) {
    return (
      <Button onClick={handleSignOut} className="bg-modelboard-red hover:bg-red-600 text-white">
        Sign out
      </Button>
    );
  }

  return (
    <>
      <Button variant="ghost" onClick={handleAuthClick} className="hover:text-modelboard-red">
        Sign in
      </Button>
      <Button onClick={handleAuthClick} className="bg-modelboard-red hover:bg-red-600 text-white">
        Join now
      </Button>
    </>
  );
};