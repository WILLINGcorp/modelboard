import { NavLink } from "react-router-dom";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CollabsLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}

export const CollabsLink = ({ isActive, onNavigate, isMobile }: CollabsLinkProps) => (
  <NavLink
    to="/collabs"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/collabs") : linkActive) && "text-white bg-modelboard-gray",
        isMobile && "w-full"
      )
    }
    onClick={() => onNavigate("/collabs")}
  >
    <Users className="h-4 w-4" />
    <span>Collabs</span>
  </NavLink>
);