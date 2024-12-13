import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigationItems } from "./useNavigationItems";

interface NavigationItemsProps {
  isAuthenticated: boolean;
  onMobileMenuClose?: () => void;
}

export const NavigationItems = ({ isAuthenticated, onMobileMenuClose }: NavigationItemsProps) => {
  const navigate = useNavigate();
  const items = useNavigationItems();

  const handleClick = (href: string) => {
    navigate(href);
    onMobileMenuClose?.();
  };

  return (
    <>
      {items.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          className="flex items-center space-x-2"
          onClick={() => handleClick(item.href)}
        >
          <item.icon className="w-4 h-4 mr-2" />
          {item.title}
        </Button>
      ))}
    </>
  );
};