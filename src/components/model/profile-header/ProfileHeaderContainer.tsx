import type { Database } from "@/integrations/supabase/types";
import { UserAvatar } from "./UserAvatar";
import { UserInfo } from "./UserInfo";
import { CurrentMood } from "./CurrentMood";
import { PhysicalAttributes } from "./PhysicalAttributes";
import { BrandsWorkedWith } from "./BrandsWorkedWith";
import { SocialPlatforms } from "./SocialPlatforms";
import { ActionButtons } from "./ActionButtons";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileHeaderContainerProps {
  profile: Profile;
  isOwnProfile: boolean;
  onMessageClick?: () => void;
}

export const ProfileHeaderContainer = ({ 
  profile, 
  isOwnProfile, 
  onMessageClick 
}: ProfileHeaderContainerProps) => {
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

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-auto flex justify-center">
        <UserAvatar profile={profile} />
      </div>

      <div className="flex-1 space-y-6">
        <UserInfo profile={profile} />
        
        {profile.current_mood && (
          <div className="animate-fadeIn delay-100">
            <CurrentMood profile={profile} />
          </div>
        )}
        
        {profile.bio && (
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed animate-fadeIn delay-200">
            {profile.bio}
          </p>
        )}
        
        <div className="animate-fadeIn delay-300">
          <PhysicalAttributes profile={profile} />
        </div>
        
        <div className="animate-fadeIn delay-400">
          <BrandsWorkedWith profile={profile} />
        </div>
        
        <div className="animate-fadeIn delay-500">
          <SocialPlatforms 
            platforms={platforms}
            socialMedia={socialMedia}
          />
        </div>
      </div>

      <div className="w-full md:w-auto">
        <ActionButtons 
          isOwnProfile={isOwnProfile}
          profileId={profile.id}
          currentMood={profile.current_mood || ""}
          location={profile.location || ""}
          onMessageClick={onMessageClick}
        />
      </div>
    </div>
  );
};