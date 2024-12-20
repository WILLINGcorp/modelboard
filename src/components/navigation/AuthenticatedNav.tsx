import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLink } from "./nav-items/DashboardLink";
import { NetworkLink } from "./nav-items/NetworkLink";
import { MessagesLink } from "./nav-items/MessagesLink";
import { CollabsLink } from "./nav-items/CollabsLink";
import { ModerationLink } from "./nav-items/ModerationLink";

interface AuthenticatedNavProps {
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => void;
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

  return (
    <nav className="flex items-center space-x-4">
      <DashboardLink isActive={isActive} onNavigate={onNavigate} />
      <NetworkLink isActive={isActive} onNavigate={onNavigate} />
      <MessagesLink isActive={isActive} onNavigate={onNavigate} />
      <CollabsLink isActive={isActive} onNavigate={onNavigate} />
      {profile?.staff_type && (
        <ModerationLink isActive={isActive} onNavigate={onNavigate} />
      )}
    </nav>
  );
};