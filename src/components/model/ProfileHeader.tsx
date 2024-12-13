import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, MapPin, Globe, MessageSquare } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileHeaderProps {
  profile: Profile;
  onMessageClick?: () => void;
}

const ProfileHeader = ({ profile, onMessageClick }: ProfileHeaderProps) => {
  const platforms = Array.isArray(profile.creator_platforms) 
    ? profile.creator_platforms.filter(
        (p): p is { platform: string; handle: string } => 
          typeof p === 'object' && 
          p !== null && 
          'platform' in p && 
          'handle' in p
      )
    : [];

  return (
    <div className="bg-modelboard-gray rounded-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Avatar className="h-32 w-32">
          <AvatarImage 
            src={profile.avatar_url || "/creator_default_profile.jpg"} 
            alt={profile.display_name || "Profile picture"}
          />
          <AvatarFallback>
            <User className="h-16 w-16" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">
            {profile.display_name || "Anonymous Model"}
          </h1>
          {profile.location && (
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.website && (
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Globe className="h-4 w-4" />
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {profile.website}
              </a>
            </div>
          )}
          {profile.bio && (
            <p className="text-gray-300 whitespace-pre-wrap mb-4">{profile.bio}</p>
          )}
          
          {platforms.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
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
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button
          onClick={onMessageClick}
          className="bg-modelboard-red hover:bg-red-600 text-white"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;