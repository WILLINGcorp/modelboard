import { TextFormField } from "../form-fields/TextFormField";
import { TextareaFormField } from "../form-fields/TextareaFormField";
import { SocialMediaFields } from "./producer/SocialMediaFields";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface StudioProfileSectionProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

export const StudioProfileSection = ({ profile, onProfileUpdate }: StudioProfileSectionProps) => {
  const handleNicheTagsChange = (tags: string) => {
    const tagArray = tags.split(',').map(tag => tag.trim());
    const limitedTags = tagArray.slice(0, 6); // Limit to 6 tags
    onProfileUpdate({ 
      ...profile, 
      roles: limitedTags 
    });
  };

  return (
    <div className="space-y-6">
      <TextFormField
        label="Username"
        value={profile.username || ""}
        onChange={(value) => onProfileUpdate({ ...profile, username: value })}
      />

      <TextFormField
        label="Studio Display Name"
        value={profile.display_name || ""}
        onChange={(value) => onProfileUpdate({ ...profile, display_name: value })}
      />

      <TextareaFormField
        label="Description"
        value={profile.bio || ""}
        onChange={(value) => onProfileUpdate({ ...profile, bio: value })}
      />

      <TextFormField
        label="Niche Tags (comma-separated, max 6)"
        value={Array.isArray(profile.roles) ? profile.roles.join(', ') : ''}
        onChange={handleNicheTagsChange}
      />

      <TextFormField
        label="Parent Company"
        value={profile.business_model?.[0] || ""}
        onChange={(value) => onProfileUpdate({ 
          ...profile, 
          business_model: [value]
        })}
      />

      <TextFormField
        label="Headquarter Location"
        value={profile.location || ""}
        onChange={(value) => onProfileUpdate({ ...profile, location: value })}
      />

      <TextFormField
        label="Website"
        type="url"
        value={profile.website || ""}
        onChange={(value) => onProfileUpdate({ ...profile, website: value })}
      />

      <SocialMediaFields
        socialMedia={profile.social_media as Record<string, string> || {}}
        onSocialMediaChange={(platform, handle) => {
          const updatedSocialMedia = {
            ...(profile.social_media as Record<string, string> || {}),
            [platform]: handle,
          };
          onProfileUpdate({ ...profile, social_media: updatedSocialMedia });
        }}
      />
    </div>
  );
};