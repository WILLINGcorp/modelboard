import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ModelCardProps {
  profile: Profile;
  isOnline: (id: string) => boolean;
}

export const ModelCard = ({ profile, isOnline }: ModelCardProps) => {
  const navigate = useNavigate();

  const isSponsor = profile.subscription_status === 'sponsor' && 
    new Date(profile.subscription_end_date || '') > new Date();
  
  const isProfileOnline = profile.id && typeof isOnline === 'function' ? isOnline(profile.id) : false;

  return (
    <Card 
      key={profile.id}
      className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-cover bg-center"
      style={{
        backgroundImage: `url(${profile.avatar_url || "/creator_default_profile.jpg"})`
      }}
      onClick={() => navigate(`/models/${profile.id}`)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <div className="absolute top-4 left-4 flex items-center gap-2">
          {isProfileOnline && (
            <Badge variant="secondary" className="bg-modelboard-red text-white">
              Online Now
            </Badge>
          )}
          {isSponsor && (
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              Premium
            </Badge>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="relative">
            <h3 className="text-xl font-semibold text-white mb-1">
              {profile.display_name || "Anonymous Model"}
            </h3>
          </div>
          {profile.location && (
            <p className="text-gray-300 text-sm">
              {profile.location}
            </p>
          )}
          {profile.roles && Array.isArray(profile.roles) && profile.roles.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {(profile.roles as string[]).slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs text-gray-300 border-gray-300">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};