import { NavLink } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MessagesLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}

export const MessagesLink = ({ isActive, onNavigate, isMobile }: MessagesLinkProps) => (
  <NavLink
    to="/messages"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/messages") : linkActive) && "text-white bg-modelboard-gray",
        isMobile && "w-full"
      )
    }
    onClick={() => onNavigate("/messages")}
  >
    <MessageSquare className="h-4 w-4" />
    <span>DMs</span>
  </NavLink>
);