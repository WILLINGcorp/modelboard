import { TextFormField } from "../form-fields/TextFormField";
import { SelectFormField } from "../form-fields/SelectFormField";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface PhysicalAttributesSectionProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-binary" },
  { value: "other", label: "Other" }
];

export const PhysicalAttributesSection = ({ profile, onProfileUpdate }: PhysicalAttributesSectionProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};