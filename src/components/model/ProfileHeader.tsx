import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, Globe } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileHeaderProps {
  profile: Profile;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <div className="bg-modelboard-gray rounded-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profile.avatar_url || undefined} />
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
            <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;