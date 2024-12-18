import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface UserAvatarProps {
  profile: Profile;
}

export const UserAvatar = ({ profile }: UserAvatarProps) => {
  return (
    <div className="relative group">
      <Avatar className="h-48 w-48 ring-4 ring-modelboard-red ring-offset-4 ring-offset-modelboard-gray">
        <AvatarImage 
          src={profile.avatar_url || "/creator_default_profile.jpg"} 
          alt={profile.display_name || "Profile picture"}
          className="object-cover"
        />
        <AvatarFallback>
          <User className="h-24 w-24" />
        </AvatarFallback>
      </Avatar>
      {profile.gender && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-modelboard-dark px-3 py-1 rounded-full text-sm text-white">
          {profile.gender}
        </div>
      )}
    </div>
  );
};