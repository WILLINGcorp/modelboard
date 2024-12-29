import { Button } from "@/components/ui/button";
import { NavigationItems } from "./NavigationItems";
import { UserMenu } from "./UserMenu";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}

export const MobileNav = ({ isOpen, onClose, isAuthenticated }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 animate-fadeIn bg-modelboard-dark rounded-lg p-4">
      <NavigationItems 
        isAuthenticated={isAuthenticated} 
        onMobileMenuClose={onClose}
        isMobile={true}
      />
      <div className="mt-4 pt-4 border-t border-modelboard-gray">
        <UserMenu 
          isAuthenticated={isAuthenticated} 
          onMobileMenuClose={onClose}
          isMobile={true}
        />
      </div>
    </div>
  );
};