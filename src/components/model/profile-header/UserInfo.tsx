import { MapPin, Globe } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UserInfoProps {
  profile: Profile;
}

export const UserInfo = ({ profile }: UserInfoProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">
        {profile.display_name || profile.username || "Anonymous Model"}
      </h1>
      {profile.location && (
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{profile.location}</span>
        </div>
      )}
      {profile.website && (
        <div className="flex items-center gap-2 text-gray-400">
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
    </div>
  );
};