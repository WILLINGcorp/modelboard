import { TextFormField } from "../form-fields/TextFormField";
import { TextareaFormField } from "../form-fields/TextareaFormField";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface BasicInfoSectionProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

export const BasicInfoSection = ({ profile, onProfileUpdate }: BasicInfoSectionProps) => {
  return (
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
    </div>
  );
};