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
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface SocialPlatformsProps {
  platforms: { platform: string; handle: string }[];
  socialMedia: Record<string, string>;
}

const PLATFORM_ICONS: Record<string, any> = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  bluesky: AtSign,
  tiktok: Music2,
  snapchat: Ghost,
  whatsapp: MessageCircle,
  telegram: Send,
  signal: Shield
};

export const SocialPlatforms = ({ platforms, socialMedia }: SocialPlatformsProps) => {
  if (!platforms.length && !Object.keys(socialMedia).length) return null;

  return (
    <div className="space-y-4">
      {platforms.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-modelboard-dark rounded-full px-3 py-1"
            >
              <span className="text-white">{platform.platform}</span>
              <span className="text-gray-400">@{platform.handle}</span>
            </div>
          ))}
        </div>
      )}

      {Object.keys(socialMedia).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(socialMedia).map(([platform, handle]) => {
            const Icon = PLATFORM_ICONS[platform] || AtSign;
            return (
              <div key={platform} className="flex items-center gap-2 bg-modelboard-dark rounded-full px-3 py-1">
                <Icon className="h-4 w-4 text-gray-400" />
                <span className="text-white capitalize">{platform}</span>
                <span className="text-gray-400">@{handle}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};