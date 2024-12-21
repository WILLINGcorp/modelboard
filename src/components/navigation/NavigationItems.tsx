import { useNavigate, useLocation } from "react-router-dom";
import { AuthenticatedNav } from "./AuthenticatedNav";
import { PublicNav } from "./PublicNav";
import { AccountDropdown } from "./AccountDropdown";

interface NavigationItemsProps {
  isAuthenticated: boolean;
  onMobileMenuClose?: () => void;
  isMobile?: boolean;
}

export const NavigationItems = ({ isAuthenticated, onMobileMenuClose, isMobile = false }: NavigationItemsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onMobileMenuClose?.();
  };

  const isActive = (path: string) => location.pathname === path;

  const containerClasses = isMobile 
    ? "flex flex-col space-y-4 w-full" 
    : "flex items-center space-x-8";

  if (isAuthenticated) {
    return (
      <div className={containerClasses}>
        <AuthenticatedNav isActive={isActive} onNavigate={handleNavigation} isMobile={isMobile} />
        <AccountDropdown onMobileMenuClose={onMobileMenuClose} isMobile={isMobile} />
      </div>
    );
  }

  return <PublicNav isMobile={isMobile} />;
};