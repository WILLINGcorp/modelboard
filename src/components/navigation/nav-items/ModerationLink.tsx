import { NavLink } from "react-router-dom";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModerationLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}

export const ModerationLink = ({ isActive, onNavigate, isMobile }: ModerationLinkProps) => (
  <NavLink
    to="/moderation"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/moderation") : linkActive) && "text-white bg-modelboard-gray",
        isMobile && "w-full"
      )
    }
    onClick={() => onNavigate("/moderation")}
  >
    <Shield className="h-4 w-4" />
    <span>Moderation</span>
  </NavLink>
);