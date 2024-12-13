import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Home,
  Users,
  MessageSquare,
  MapPin,
  Image,
  User,
  Shield,
} from "lucide-react";

export const useNavigationItems = () => {
  const { data: isModerator } = useQuery({
    queryKey: ["isModerator"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data } = await supabase
        .from("moderators")
        .select("id")
        .eq("id", user.id)
        .single();

      return !!data;
    },
  });

  const items = [
    {
      title: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Network",
      href: "/models",
      icon: Users,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
    },
    {
      title: "My Location",
      href: "/my-location",
      icon: MapPin,
    },
    {
      title: "My Portfolio",
      href: "/my-portfolio",
      icon: Image,
    },
    {
      title: "My Profile",
      href: "/my-profile",
      icon: User,
    },
  ];

  if (isModerator) {
    items.push({
      title: "Moderation",
      href: "/moderation",
      icon: Shield,
    });
  }

  return items;
};