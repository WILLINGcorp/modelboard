import { NavLink } from "react-router-dom";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface HomeLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const HomeLink = ({ isActive, onNavigate }: HomeLinkProps) => (
  <NavLink
    to="/"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/") : linkActive) && "text-white bg-modelboard-gray"
      )
    }
    onClick={() => onNavigate("/")}
  >
    <Home className="h-4 w-4" />
    <span>Home</span>
  </NavLink>
);