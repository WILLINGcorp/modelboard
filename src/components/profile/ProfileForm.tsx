import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreatorPlatformsField } from "./creator-platforms/CreatorPlatformsField";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { PhysicalAttributesSection } from "./sections/PhysicalAttributesSection";
import { SexualPreferencesSection } from "./sections/SexualPreferencesSection";
import { ProducerProfileSection } from "./sections/ProducerProfileSection";
import { StudioProfileSection } from "./sections/StudioProfileSection";
import type { Database, Json } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileFormProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

export const ProfileForm = ({ profile, onProfileUpdate }: ProfileFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", profile.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      onProfileUpdate(profile);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-modelboard-gray p-6 rounded-lg">
      <div className="space-y-6">
        {profile.profile_type === "producer" ? (
          <ProducerProfileSection profile={profile} onProfileUpdate={onProfileUpdate} />
        ) : profile.profile_type === "studio" ? (
          <StudioProfileSection profile={profile} onProfileUpdate={onProfileUpdate} />
        ) : (
          <>
            <BasicInfoSection profile={profile} onProfileUpdate={onProfileUpdate} />
            <PhysicalAttributesSection profile={profile} onProfileUpdate={onProfileUpdate} />
            <SexualPreferencesSection profile={profile} onProfileUpdate={onProfileUpdate} />
            <CreatorPlatformsField
              value={profile?.creator_platforms as Json[] || []}
              onChange={(platforms) => onProfileUpdate({ ...profile, creator_platforms: platforms })}
            />
          </>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-modelboard-red hover:bg-red-600 hover:text-white transition-colors"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};