import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare, MapPin, Image, User, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface AuthenticatedNavProps {
  isActive?: (path: string) => boolean;
  onNavigate?: (path: string) => void;
}

export const AuthenticatedNav = ({ isActive, onNavigate }: AuthenticatedNavProps) => {
  const { data: profile } = useQuery({
    queryKey: ["staffProfile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("profiles")
        .select("staff_type")
        .eq("id", user.id)
        .single();

      return data;
    },
  });

  const handleClick = (path: string) => {
    onNavigate?.(path);
  };

  return (
    <nav className="flex flex-col gap-1">
      <NavLink
        to="/dashboard"
        className={({ isActive: linkActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            (isActive ? isActive("/dashboard") : linkActive) && "text-white bg-modelboard-gray"
          )
        }
        onClick={() => handleClick("/dashboard")}
      >
        <LayoutDashboard className="h-4 w-4" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/network"
        className={({ isActive: linkActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            (isActive ? isActive("/network") : linkActive) && "text-white bg-modelboard-gray"
          )
        }
        onClick={() => handleClick("/network")}
      >
        <Users className="h-4 w-4" />
        <span>Network</span>
      </NavLink>

      <NavLink
        to="/messages"
        className={({ isActive: linkActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            (isActive ? isActive("/messages") : linkActive) && "text-white bg-modelboard-gray"
          )
        }
        onClick={() => handleClick("/messages")}
      >
        <MessageSquare className="h-4 w-4" />
        <span>DMs</span>
      </NavLink>

      <NavLink
        to="/my-location"
        className={({ isActive: linkActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            (isActive ? isActive("/my-location") : linkActive) && "text-white bg-modelboard-gray"
          )
        }
        onClick={() => handleClick("/my-location")}
      >
        <MapPin className="h-4 w-4" />
        <span>My Location</span>
      </NavLink>

      <NavLink
        to="/my-portfolio"
        className={({ isActive: linkActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            (isActive ? isActive("/my-portfolio") : linkActive) && "text-white bg-modelboard-gray"
          )
        }
        onClick={() => handleClick("/my-portfolio")}
      >
        <Image className="h-4 w-4" />
        <span>My Portfolio</span>
      </NavLink>

      <NavLink
        to="/my-profile"
        className={({ isActive: linkActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            (isActive ? isActive("/my-profile") : linkActive) && "text-white bg-modelboard-gray"
          )
        }
        onClick={() => handleClick("/my-profile")}
      >
        <User className="h-4 w-4" />
        <span>My Profile</span>
      </NavLink>

      {profile?.staff_type && (
        <NavLink
          to="/moderation"
          className={({ isActive: linkActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
              (isActive ? isActive("/moderation") : linkActive) && "text-white bg-modelboard-gray"
            )
          }
          onClick={() => handleClick("/moderation")}
        >
          <Shield className="h-4 w-4" />
          <span>Moderation</span>
        </NavLink>
      )}
    </nav>
  );
};