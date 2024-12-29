import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const ProfileSetupGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileSetup = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("profile_type, username")
        .eq("id", user.id)
        .single();

      // If no profile type or username, redirect to profile setup
      if (!profile?.profile_type || !profile?.username) {
        navigate("/profile");
      }
    };

    checkProfileSetup();
  }, [user, navigate]);

  return <>{children}</>;
};