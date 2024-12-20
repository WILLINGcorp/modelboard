import { NavLink } from "react-router-dom";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const ProfileLink = ({ isActive, onNavigate }: ProfileLinkProps) => (
  <NavLink
    to="/my-profile"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/my-profile") : linkActive) && "text-white bg-modelboard-gray"
      )
    }
    onClick={() => onNavigate("/my-profile")}
  >
    <User className="h-4 w-4" />
    <span>My Profile</span>
  </NavLink>
);