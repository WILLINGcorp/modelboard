import { NavLink } from "react-router-dom";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelsLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const ModelsLink = ({ isActive, onNavigate }: ModelsLinkProps) => (
  <NavLink
    to="/models"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/models") : linkActive) && "text-white bg-modelboard-gray"
      )
    }
    onClick={() => onNavigate("/models")}
  >
    <Users className="h-4 w-4" />
    <span>Models</span>
  </NavLink>
);