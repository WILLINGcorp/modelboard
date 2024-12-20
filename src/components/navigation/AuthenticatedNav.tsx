import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare, MapPin, Image, User, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const AuthenticatedNav = () => {
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

  return (
    <nav className="flex flex-col gap-1">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            isActive && "text-white bg-modelboard-gray"
          )
        }
      >
        <LayoutDashboard className="h-4 w-4" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/network"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            isActive && "text-white bg-modelboard-gray"
          )
        }
      >
        <Users className="h-4 w-4" />
        <span>Network</span>
      </NavLink>

      <NavLink
        to="/messages"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            isActive && "text-white bg-modelboard-gray"
          )
        }
      >
        <MessageSquare className="h-4 w-4" />
        <span>DMs</span>
      </NavLink>

      <NavLink
        to="/my-location"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            isActive && "text-white bg-modelboard-gray"
          )
        }
      >
        <MapPin className="h-4 w-4" />
        <span>My Location</span>
      </NavLink>

      <NavLink
        to="/my-portfolio"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            isActive && "text-white bg-modelboard-gray"
          )
        }
      >
        <Image className="h-4 w-4" />
        <span>My Portfolio</span>
      </NavLink>

      <NavLink
        to="/my-profile"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
            isActive && "text-white bg-modelboard-gray"
          )
        }
      >
        <User className="h-4 w-4" />
        <span>My Profile</span>
      </NavLink>

      {profile?.staff_type && (
        <NavLink
          to="/moderation"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-modelboard-gray transition-colors",
              isActive && "text-white bg-modelboard-gray"
            )
          }
        >
          <Shield className="h-4 w-4" />
          <span>Moderation</span>
        </NavLink>
      )}
    </nav>
  );
};