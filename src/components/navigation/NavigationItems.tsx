import { useNavigate, useLocation } from "react-router-dom";
import { AuthenticatedNav } from "./AuthenticatedNav";
import { PublicNav } from "./PublicNav";

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

  const isActive = (path: string) => location.pathname === path;

  if (isAuthenticated) {
    return <AuthenticatedNav isActive={isActive} onNavigate={handleNavigation} />;
  }

  return <PublicNav />;
};