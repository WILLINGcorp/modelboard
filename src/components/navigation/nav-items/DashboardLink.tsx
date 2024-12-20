import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const DashboardLink = ({ isActive, onNavigate }: DashboardLinkProps) => (
  <NavLink
    to="/dashboard"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/dashboard") : linkActive) && "text-white bg-modelboard-gray"
      )
    }
    onClick={() => onNavigate("/dashboard")}
  >
    <LayoutDashboard className="h-4 w-4" />
    <span>Dashboard</span>
  </NavLink>
);