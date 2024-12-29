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
      <UserAvatar profile={profile} />

      <div className="flex-1 space-y-4">
        <UserInfo profile={profile} />
        <CurrentMood profile={profile} />
        
        {profile.bio && (
          <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
        )}
        
        <PhysicalAttributes profile={profile} />
        <BrandsWorkedWith profile={profile} />
        <SocialPlatforms 
          platforms={platforms}
          socialMedia={socialMedia}
        />
      </div>

      <ActionButtons 
        isOwnProfile={isOwnProfile}
        profileId={profile.id}
        currentMood={profile.current_mood || ""}
        location={profile.location || ""}
        onMessageClick={onMessageClick}
      />
    </div>
  );
};