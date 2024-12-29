import { TextFormField } from "../../form-fields/TextFormField";
import { FormField } from "../../form-fields/FormField";
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  AtSign, 
  Music2,
  Ghost,
  MessageCircle,
  Send,
  Shield
} from "lucide-react";

interface SocialMediaFieldsProps {
  socialMedia: Record<string, string>;
  onSocialMediaChange: (platform: string, handle: string) => void;
}

const SOCIAL_MEDIA_PLATFORMS = [
  { id: "twitter", label: "X (Twitter) Handle", icon: Twitter },
  { id: "facebook", label: "Facebook Handle", icon: Facebook },
  { id: "instagram", label: "Instagram Handle", icon: Instagram },
  { id: "bluesky", label: "BlueSky Handle", icon: AtSign },
  { id: "tiktok", label: "TikTok Handle", icon: Music2 },
  { id: "snapchat", label: "Snapchat Handle", icon: Ghost },
  { id: "whatsapp", label: "WhatsApp Number", icon: MessageCircle },
  { id: "telegram", label: "Telegram Handle", icon: Send },
  { id: "signal", label: "Signal Number", icon: Shield }
];

export const SocialMediaFields = ({ socialMedia, onSocialMediaChange }: SocialMediaFieldsProps) => (
  <FormField label="Social Media">
    <div className="space-y-4">
      {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
        <div key={platform.id} className="flex items-center gap-3">
          <platform.icon className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <div className="flex-1">
            <TextFormField
              label={platform.label}
              value={socialMedia[platform.id] || ""}
              onChange={(value) => onSocialMediaChange(platform.id, value)}
            />
          </div>
        </div>
      ))}
    </div>
  </FormField>
);