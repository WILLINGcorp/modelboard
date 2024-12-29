import type { Database } from "@/integrations/supabase/types";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserAvatar } from "./profile-header/UserAvatar";
import { UserInfo } from "./profile-header/UserInfo";
import { CurrentMood } from "./profile-header/CurrentMood";
import { PhysicalAttributes } from "./profile-header/PhysicalAttributes";
import { BrandsWorkedWith } from "./profile-header/BrandsWorkedWith";
import { SocialPlatforms } from "./profile-header/SocialPlatforms";
import { ActionButtons } from "./profile-header/ActionButtons";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileHeaderProps {
  profile: Profile;
  onMessageClick?: () => void;
}

const ProfileHeader = ({ profile, onMessageClick }: ProfileHeaderProps) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const isOwnProfile = currentUserId === profile.id;

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
    <div className="bg-modelboard-gray rounded-lg p-8 mb-8 animate-fadeIn shadow-lg hover:shadow-xl transition-shadow">
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
    </div>
  );
};

export default ProfileHeader;