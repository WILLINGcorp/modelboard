import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreatorPlatformsField } from "./creator-platforms/CreatorPlatformsField";
import { TextFormField } from "./form-fields/TextFormField";
import { TextareaFormField } from "./form-fields/TextareaFormField";
import type { Database } from "@/integrations/supabase/types";
import type { Json } from "@/integrations/supabase/types";

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
      <div className="space-y-4">
        <TextFormField
          label="Username"
          value={profile?.username || ""}
          onChange={(value) => onProfileUpdate({ ...profile, username: value })}
        />

        <TextFormField
          label="Display Name"
          value={profile?.display_name || ""}
          onChange={(value) => onProfileUpdate({ ...profile, display_name: value })}
        />

        <TextareaFormField
          label="Bio"
          value={profile?.bio || ""}
          onChange={(value) => onProfileUpdate({ ...profile, bio: value })}
        />

        <TextFormField
          label="Website"
          type="url"
          value={profile?.website || ""}
          onChange={(value) => onProfileUpdate({ ...profile, website: value })}
        />

        <CreatorPlatformsField
          value={profile?.creator_platforms as Json[] || []}
          onChange={(platforms) => onProfileUpdate({ ...profile, creator_platforms: platforms })}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-modelboard-red hover:bg-red-600"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};