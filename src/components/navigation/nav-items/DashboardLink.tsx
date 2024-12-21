import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DashboardLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}

export const DashboardLink = ({ isActive, onNavigate, isMobile }: DashboardLinkProps) => (
  <NavLink
    to="/dashboard"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/dashboard") : linkActive) && "text-white bg-modelboard-gray",
        isMobile && "w-full"
      )
    }
    onClick={() => onNavigate("/dashboard")}
  >
    <LayoutDashboard className="h-4 w-4" />
    <span>Dashboard</span>
  </NavLink>
);