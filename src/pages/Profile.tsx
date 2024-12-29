import { useEffect, useState } from "react";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to fetch profile",
        variant: "destructive",
      });
      console.error("Error fetching profile:", error);
    }
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileForm 
          profile={profile} 
          onProfileUpdate={(updatedProfile) => setProfile(updatedProfile)} 
        />
        <SponsorFeaturedMembers />
      </div>
    </div>
  );
};

export default Profile;