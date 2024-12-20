import { NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const LocationLink = ({ isActive, onNavigate }: LocationLinkProps) => (
  <NavLink
    to="/my-location"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/my-location") : linkActive) && "text-white bg-modelboard-gray"
      )
    }
    onClick={() => onNavigate("/my-location")}
  >
    <MapPin className="h-4 w-4" />
    <span>My Location</span>
  </NavLink>
);