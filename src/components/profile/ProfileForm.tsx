import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreatorPlatformsField } from "./creator-platforms/CreatorPlatformsField";
import { TextFormField } from "./form-fields/TextFormField";
import { TextareaFormField } from "./form-fields/TextareaFormField";
import { SelectFormField } from "./form-fields/SelectFormField";
import type { Database } from "@/integrations/supabase/types";
import type { Json } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileFormProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-binary" },
  { value: "other", label: "Other" }
];

const ORIENTATION_OPTIONS = [
  { value: "straight", label: "Straight" },
  { value: "gay", label: "Gay" },
  { value: "bi", label: "Bisexual" },
  { value: "pan", label: "Pansexual" },
  { value: "other", label: "Other" }
];

const PREFERRED_ROLE_OPTIONS = [
  { value: "total_bottom", label: "Total Bottom" },
  { value: "vers_bottom", label: "Vers Bottom" },
  { value: "versatile", label: "Versatile" },
  { value: "vers_top", label: "Vers Top" },
  { value: "total_top", label: "Total Top" }
];

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

  const showEndowment = profile.gender === 'male';
  const showPreferredRole = profile.gender === 'male' && 
    (profile.sexual_orientation === 'gay' || profile.sexual_orientation === 'bi');

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

        <SelectFormField
          label="Gender"
          value={profile?.gender || ""}
          options={GENDER_OPTIONS}
          onChange={(value) => onProfileUpdate({ ...profile, gender: value })}
        />

        <TextFormField
          label="Height"
          value={profile?.height || ""}
          onChange={(value) => onProfileUpdate({ ...profile, height: value })}
        />

        <TextFormField
          label="Weight"
          value={profile?.weight || ""}
          onChange={(value) => onProfileUpdate({ ...profile, weight: value })}
        />

        <TextFormField
          label="Eye Color"
          value={profile?.eye_color || ""}
          onChange={(value) => onProfileUpdate({ ...profile, eye_color: value })}
        />

        <TextFormField
          label="Hair Color"
          value={profile?.hair_color || ""}
          onChange={(value) => onProfileUpdate({ ...profile, hair_color: value })}
        />

        <SelectFormField
          label="Sexual Orientation"
          value={profile?.sexual_orientation || ""}
          options={ORIENTATION_OPTIONS}
          onChange={(value) => onProfileUpdate({ ...profile, sexual_orientation: value })}
        />

        {showEndowment && (
          <TextFormField
            label="Endowment"
            value={profile?.endowment || ""}
            onChange={(value) => onProfileUpdate({ ...profile, endowment: value })}
          />
        )}

        {showPreferredRole && (
          <SelectFormField
            label="Preferred Role"
            value={profile?.preferred_role || ""}
            options={PREFERRED_ROLE_OPTIONS}
            onChange={(value) => onProfileUpdate({ ...profile, preferred_role: value })}
          />
        )}

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