import { useState } from "react";
import { FormField } from "../form-fields/FormField";
import { TextFormField } from "../form-fields/TextFormField";
import { TextareaFormField } from "../form-fields/TextareaFormField";
import { Checkbox } from "@/components/ui/checkbox";
import { CreatorPlatformsField } from "../creator-platforms/CreatorPlatformsField";
import type { Database, Json } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProducerProfileSectionProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

const BUSINESS_MODELS = [
  { id: "collaborative", label: "Collaborative" },
  { id: "hourly", label: "Hourly Rate" },
  { id: "project", label: "Per Project Rate" },
  { id: "quote", label: "Ask for a Quote" },
  { id: "ask", label: "Ask Me" },
];

const SKILLS = [
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "post_production", label: "Post-Production" },
  { id: "scriptwriting", label: "Scriptwriting" },
  { id: "directing", label: "Directing" },
  { id: "other", label: "Other" },
];

const SOCIAL_MEDIA_PLATFORMS = [
  { id: "twitter", label: "Twitter Handle" },
  { id: "bluesky", label: "BlueSky Handle" },
  { id: "instagram", label: "Instagram Handle" },
  { id: "facebook", label: "Facebook Handle" },
];

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

      <FormField label="Business Model">
        <div className="grid grid-cols-2 gap-4">
          {BUSINESS_MODELS.map((model) => (
            <div key={model.id} className="flex items-center space-x-2">
              <Checkbox
                id={`business-${model.id}`}
                checked={businessModel.includes(model.id)}
                onCheckedChange={(checked) => 
                  handleBusinessModelChange(model.id, checked as boolean)
                }
              />
              <label
                htmlFor={`business-${model.id}`}
                className="text-sm text-gray-300 cursor-pointer"
              >
                {model.label}
              </label>
            </div>
          ))}
        </div>
      </FormField>

      <FormField label="Skills">
        <div className="grid grid-cols-2 gap-4">
          {SKILLS.map((skill) => (
            <div key={skill.id} className="flex items-center space-x-2">
              <Checkbox
                id={`skill-${skill.id}`}
                checked={skills.includes(skill.id)}
                onCheckedChange={(checked) => 
                  handleSkillChange(skill.id, checked as boolean)
                }
              />
              <label
                htmlFor={`skill-${skill.id}`}
                className="text-sm text-gray-300 cursor-pointer"
              >
                {skill.label}
              </label>
            </div>
          ))}
        </div>
      </FormField>

      {skills.includes("other") && (
        <TextFormField
          label="Other Skill"
          value={profile.other_skill || ""}
          onChange={(value) => onProfileUpdate({ ...profile, other_skill: value })}
        />
      )}

      <TextFormField
        label="Website"
        type="url"
        value={profile.website || ""}
        onChange={(value) => onProfileUpdate({ ...profile, website: value })}
      />

      <FormField label="Social Media">
        <div className="space-y-4">
          {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
            <TextFormField
              key={platform.id}
              label={platform.label}
              value={socialMedia[platform.id] || ""}
              onChange={(value) => handleSocialMediaChange(platform.id, value)}
            />
          ))}
        </div>
      </FormField>

      <CreatorPlatformsField
        value={profile?.creator_platforms as Json[] || []}
        onChange={(platforms) => onProfileUpdate({ ...profile, creator_platforms: platforms })}
      />
    </div>
  );
};