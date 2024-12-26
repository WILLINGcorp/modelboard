import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge, Crown, Star } from "lucide-react";
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
      className="group relative overflow-hidden cursor-pointer bg-gradient-to-r from-modelboard-dark to-modelboard-gray hover:from-modelboard-gray hover:to-modelboard-dark transition-all duration-500"
      onClick={() => navigate(`/models/${profile.id}`)}
    >
      <div className="flex flex-col md:flex-row gap-8 p-8">
        {/* Profile Info Section */}
        <div className="w-full md:w-1/3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <img 
              src={profile.avatar_url || "/creator_default_profile.jpg"}
              alt={profile.display_name || "Featured Profile"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
                {isPaidAd ? (
                  <Crown className="h-5 w-5 text-modelboard-red" />
                ) : (
                  <Star className="h-5 w-5 text-modelboard-red" />
                )}
                <span className="text-modelboard-red text-sm font-medium">
                  {isPaidAd ? 'Featured Ad' : 'Featured'}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  {profile.display_name || "Anonymous Model"}
                </h3>
                {profile.location && (
                  <p className="text-gray-300 text-sm flex items-center gap-2">
                    <Badge className="h-4 w-4" />
                    {profile.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Preview Section */}
        <div className="w-full md:w-2/3">
          <h4 className="text-white text-xl font-semibold mb-6">Latest Work</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden glass">
                <img 
                  src={item.media_url} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    {item.description && (
                      <p className="text-gray-300 text-xs mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {portfolioItems.length === 0 && (
              <div className="col-span-3 text-center py-12 glass rounded-xl">
                <p className="text-gray-400">No portfolio items yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};