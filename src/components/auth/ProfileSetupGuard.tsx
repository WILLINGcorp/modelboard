import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const ProfileSetupGuard = () => {
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("profile_type, username")
          .eq("id", session.user.id)
          .single();

        setIsProfileComplete(!!profile?.profile_type && !!profile?.username);
      }
      setLoading(false);
    };

    checkProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-modelboard-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isProfileComplete) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};