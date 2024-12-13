import { TextFormField } from "../form-fields/TextFormField";
import { TextareaFormField } from "../form-fields/TextareaFormField";
import { CreatorPlatformsField } from "../creator-platforms/CreatorPlatformsField";
import { SocialMediaFields } from "./producer/SocialMediaFields";
import { BusinessModelAndSkills } from "./producer/BusinessModelAndSkills";
import type { Database, Json } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProducerProfileSectionProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

export const ProducerProfileSection = ({ profile, onProfileUpdate }: ProducerProfileSectionProps) => {
  const businessModel = (profile.business_model as string[]) || [];
  const skills = (profile.skills as string[]) || [];
  const socialMedia = (profile.social_media as Record<string, string>) || {};

  const handleBusinessModelChange = (modelId: string, checked: boolean) => {
    const updatedModels = checked
      ? [...businessModel, modelId]
      : businessModel.filter((id) => id !== modelId);
    onProfileUpdate({ ...profile, business_model: updatedModels });
  };

  const handleSkillChange = (skillId: string, checked: boolean) => {
    const updatedSkills = checked
      ? [...skills, skillId]
      : skills.filter((id) => id !== skillId);
    onProfileUpdate({ ...profile, skills: updatedSkills });
  };

  const handleSocialMediaChange = (platform: string, handle: string) => {
    const updatedSocialMedia = { ...socialMedia, [platform]: handle };
    onProfileUpdate({ ...profile, social_media: updatedSocialMedia });
  };

  return (
    <div className="space-y-6">
      <TextFormField
        label="Username"
        value={profile.username || ""}
        onChange={(value) => onProfileUpdate({ ...profile, username: value })}
      />

      <TextFormField
        label="Display Name"
        value={profile.display_name || ""}
        onChange={(value) => onProfileUpdate({ ...profile, display_name: value })}
      />

      <TextareaFormField
        label="About"
        value={profile.bio || ""}
        onChange={(value) => onProfileUpdate({ ...profile, bio: value })}
      />

      <BusinessModelAndSkills
        businessModel={businessModel}
        skills={skills}
        otherSkill={profile.other_skill || ""}
        onBusinessModelChange={handleBusinessModelChange}
        onSkillChange={handleSkillChange}
        onOtherSkillChange={(value) => onProfileUpdate({ ...profile, other_skill: value })}
      />

      <TextFormField
        label="Website"
        type="url"
        value={profile.website || ""}
        onChange={(value) => onProfileUpdate({ ...profile, website: value })}
      />

      <SocialMediaFields
        socialMedia={socialMedia}
        onSocialMediaChange={handleSocialMediaChange}
      />

      <CreatorPlatformsField
        value={profile?.creator_platforms as Json[] || []}
        onChange={(platforms) => onProfileUpdate({ ...profile, creator_platforms: platforms })}
      />
    </div>
  );
};