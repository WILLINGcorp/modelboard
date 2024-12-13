import { TextFormField } from "../../form-fields/TextFormField";
import { FormField } from "../../form-fields/FormField";
import { X, AtSign, Instagram, Facebook } from "lucide-react";

interface SocialMediaFieldsProps {
  socialMedia: Record<string, string>;
  onSocialMediaChange: (platform: string, handle: string) => void;
}

const SOCIAL_MEDIA_PLATFORMS = [
  { id: "twitter", label: "X (Twitter) Handle", icon: X },
  { id: "bluesky", label: "BlueSky Handle", icon: AtSign },
  { id: "instagram", label: "Instagram Handle", icon: Instagram },
  { id: "facebook", label: "Facebook Handle", icon: Facebook },
];

export const SocialMediaFields = ({ socialMedia, onSocialMediaChange }: SocialMediaFieldsProps) => (
  <FormField label="Social Media">
    <div className="space-y-4">
      {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
        <div key={platform.id} className="flex items-center space-x-2">
          <platform.icon className="h-5 w-5 text-gray-400" />
          <TextFormField
            label={platform.label}
            value={socialMedia[platform.id] || ""}
            onChange={(value) => onSocialMediaChange(platform.id, value)}
          />
        </div>
      ))}
    </div>
  </FormField>
);