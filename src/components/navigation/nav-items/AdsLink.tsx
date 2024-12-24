import { NavLink } from "react-router-dom";
import { MessageSquareMore } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdsLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}

export const AdsLink = ({ isActive, onNavigate, isMobile }: AdsLinkProps) => (
  <NavLink
    to="/ads"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/ads") : linkActive) && "text-white bg-modelboard-gray",
        isMobile && "w-full"
      )
    }
    onClick={() => onNavigate("/ads")}
  >
    <MessageSquareMore className="h-4 w-4" />
    <span>Ads</span>
  </NavLink>
);