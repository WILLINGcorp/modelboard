import { NavLink } from "react-router-dom";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollabsLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const CollabsLink = ({ isActive, onNavigate }: CollabsLinkProps) => (
  <NavLink
    to="/collabs"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/collabs") : linkActive) && "text-white bg-modelboard-gray"
      )
    }
    onClick={() => onNavigate("/collabs")}
  >
    <Users className="h-4 w-4" />
    <span>Collabs</span>
  </NavLink>
);