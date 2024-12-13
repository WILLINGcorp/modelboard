import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const SocialMediaDisplay = ({ profile }: { profile: Profile }) => {
  const platforms = Array.isArray(profile.creator_platforms) 
    ? profile.creator_platforms.filter(
        (p): p is { platform: string; handle: string } => 
          typeof p === 'object' && 
          p !== null && 
          'platform' in p && 
          'handle' in p
      )
    : [];

  const socialMedia = profile.social_media as Record<string, string> || {};

  if (!platforms.length && !Object.keys(socialMedia).length) return null;

  return (
    <div className="space-y-4 mt-4">
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
          {Object.entries(socialMedia).map(([platform, handle]) => (
            <div key={platform} className="bg-modelboard-dark rounded-full px-3 py-1">
              <span className="text-white capitalize">{platform}</span>
              <span className="text-gray-400 ml-1">@{handle}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};