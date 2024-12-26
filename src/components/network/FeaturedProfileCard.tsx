import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "lucide-react";
import type { Profile } from "@/components/network/FeaturedProfiles";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FeaturedProfileCardProps {
  profile: Profile;
  isPaidAd?: boolean;
}

export const FeaturedProfileCard = ({ profile, isPaidAd = false }: FeaturedProfileCardProps) => {
  const navigate = useNavigate();

  const { data: portfolioItems = [] } = useQuery({
    queryKey: ["portfolio-items", profile.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("profile_id", profile.id)
        .eq("moderation_status", "approved")
        .order("created_at", { ascending: false })
        .limit(3);
      return data || [];
    },
  });

  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer bg-modelboard-gray hover:bg-modelboard-gray/80 transition-all duration-300"
      onClick={() => navigate(`/models/${profile.id}`)}
    >
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Profile Info Section */}
        <div className="w-full md:w-1/3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <img 
              src={profile.avatar_url || "/creator_default_profile.jpg"}
              alt={profile.display_name || "Featured Profile"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge className="h-5 w-5 text-modelboard-red" />
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
          </div>
        </div>

        {/* Portfolio Preview Section */}
        <div className="w-full md:w-2/3">
          <h4 className="text-white text-lg mb-4">Latest Work</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {portfolioItems.map((item) => (
              <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden">
                <img 
                  src={item.media_url} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium truncate">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
            {portfolioItems.length === 0 && (
              <div className="col-span-3 text-center text-gray-400 py-8">
                No portfolio items yet
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};