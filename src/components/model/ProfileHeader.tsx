import type { Database } from "@/integrations/supabase/types";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProfileHeaderContainer } from "./profile-header/ProfileHeaderContainer";

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

  return (
    <div className="bg-modelboard-gray rounded-lg p-8 mb-8 animate-fadeIn shadow-lg hover:shadow-xl transition-shadow">
      <ProfileHeaderContainer 
        profile={profile}
        isOwnProfile={isOwnProfile}
        onMessageClick={onMessageClick}
      />
    </div>
  );
};

export default ProfileHeader;