import { NavLink } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessagesLinkProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export const MessagesLink = ({ isActive, onNavigate }: MessagesLinkProps) => (
  <NavLink
    to="/messages"
    className={({ isActive: linkActive }) =>
      cn(
        "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
        (isActive ? isActive("/messages") : linkActive) && "text-white bg-modelboard-gray"
      )
    }
    onClick={() => onNavigate("/messages")}
  >
    <MessageSquare className="h-4 w-4" />
    <span>DMs</span>
  </NavLink>
);