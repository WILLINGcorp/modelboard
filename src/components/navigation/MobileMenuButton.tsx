import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => {
  return (
    <button className="md:hidden" onClick={onClick}>
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};