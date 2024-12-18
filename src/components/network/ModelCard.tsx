import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
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
          {isOnline(profile.id) && (
            <span className="text-modelboard-red text-sm font-medium">
              Online Now
            </span>
          )}
          {isSponsor && (
            <img 
              src="/lovable-uploads/12f3e2bf-eea4-420f-b448-27ebe594aaaf.png"
              alt="Sponsor Badge"
              className="w-6 h-6"
            />
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white mb-1">
            {profile.display_name || "Anonymous Model"}
          </h3>
          {profile.location && (
            <p className="text-gray-300 text-sm">
              {profile.location}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};