import { NavLink } from "react-router-dom";
import { Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const PortfolioLink = ({ isActive, onNavigate }: PortfolioLinkProps) => (
  <NavLink
    to="/my-portfolio"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/my-portfolio") : linkActive) && "text-white bg-modelboard-gray"
      )
    }
    onClick={() => onNavigate("/my-portfolio")}
  >
    <Image className="h-4 w-4" />
    <span>My Portfolio</span>
  </NavLink>
);