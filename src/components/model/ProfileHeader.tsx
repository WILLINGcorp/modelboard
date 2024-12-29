import { Button } from "@/components/ui/button";
import { MessageSquare, HandshakeIcon, Edit } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import CollabProposalForm from "@/components/travel/CollabProposalForm";
import { supabase } from "@/integrations/supabase/client";
import { UserAvatar } from "./profile-header/UserAvatar";
import { UserInfo } from "./profile-header/UserInfo";
import { CurrentMood } from "./profile-header/CurrentMood";
import { PhysicalAttributes } from "./profile-header/PhysicalAttributes";
import { BrandsWorkedWith } from "./profile-header/BrandsWorkedWith";
import { MoodUpdater } from "./profile-header/MoodUpdater";
import { useNavigate } from "react-router-dom";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileHeaderProps {
  profile: Profile;
  onMessageClick?: () => void;
}

const ProfileHeader = ({ profile, onMessageClick }: ProfileHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  
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

  const renderSexualPreferences = () => {
    if (!profile.sexual_orientation && !profile.preferred_role) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {profile.sexual_orientation && (
          <span className="bg-modelboard-dark px-3 py-1 rounded-full text-sm text-gray-300">
            {profile.sexual_orientation}
          </span>
        )}
        {profile.preferred_role && (
          <span className="bg-modelboard-dark px-3 py-1 rounded-full text-sm text-gray-300">
            {profile.preferred_role}
          </span>
        )}
      </div>
    );
  };

  const renderSocialMedia = () => {
    if (!Object.keys(socialMedia).length) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(socialMedia).map(([platform, handle]) => (
          <div key={platform} className="bg-modelboard-dark rounded-full px-3 py-1">
            <span className="text-white capitalize">{platform}</span>
            <span className="text-gray-400 ml-1">@{handle}</span>
          </div>
        ))}
      </div>
    );
  };

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
          {renderSexualPreferences()}
          <BrandsWorkedWith profile={profile} />
          
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

          {renderSocialMedia()}
        </div>

        <div className="flex flex-col gap-2 self-start">
          {isOwnProfile ? (
            <>
              <Button
                onClick={() => navigate('/my-profile')}
                className="bg-modelboard-dark hover:bg-modelboard-gray text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <MoodUpdater 
                profileId={profile.id} 
                initialMood={profile.current_mood || ""}
              />
            </>
          ) : (
            <>
              <Button
                onClick={onMessageClick}
                className="bg-modelboard-red hover:bg-red-600 text-white"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-modelboard-dark hover:bg-modelboard-gray text-white"
                  >
                    <HandshakeIcon className="h-4 w-4 mr-2" />
                    Send Proposal
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-modelboard-gray text-white">
                  <DialogHeader>
                    <DialogTitle>Send Collaboration Proposal</DialogTitle>
                  </DialogHeader>
                  <CollabProposalForm
                    travelPlanId=""
                    receiverId={profile.id}
                    location={profile.location || ""}
                    onSuccess={() => setIsDialogOpen(false)}
                    onClose={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;