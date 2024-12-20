import { NavLink } from "react-router-dom";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const NetworkLink = ({ isActive, onNavigate }: NetworkLinkProps) => (
  <NavLink
    to="/network"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/network") : linkActive) && "text-white bg-modelboard-gray"
      )
    }
    onClick={() => onNavigate("/network")}
  >
    <Users className="h-4 w-4" />
    <span>Network</span>
  </NavLink>
);