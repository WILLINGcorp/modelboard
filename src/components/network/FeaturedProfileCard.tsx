import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import type { Profile } from "@/components/network/FeaturedProfiles";

interface FeaturedProfileCardProps {
  profile: Profile;
  isPaidAd?: boolean;
}

export const FeaturedProfileCard = ({ profile, isPaidAd = false }: FeaturedProfileCardProps) => {
  const navigate = useNavigate();

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
        <div className="absolute top-4 left-4">
          <span className="text-modelboard-red text-sm font-medium">
            {isPaidAd ? 'Featured Ad' : 'Featured'}
          </span>
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