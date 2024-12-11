import { SelectFormField } from "../form-fields/SelectFormField";
import { TextFormField } from "../form-fields/TextFormField";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface SexualPreferencesSectionProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

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

export const SexualPreferencesSection = ({ profile, onProfileUpdate }: SexualPreferencesSectionProps) => {
  const showEndowment = profile.gender === 'male';
  const showPreferredRole = profile.gender === 'male' && 
    (profile.sexual_orientation === 'gay' || profile.sexual_orientation === 'bi');

  return (
    <div className="space-y-4">
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
    </div>
  );
};