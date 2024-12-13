import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const FeaturedProfiles = () => {
  const navigate = useNavigate();
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProfiles();
  }, []);

  const getFeaturedProfiles = async () => {
    try {
      // First try to get creator profiles with active ads
      const { data: activeAds } = await supabase
        .from('paid_ads')
        .select('profile_id')
        .eq('status', 'active')
        .gt('end_time', new Date().toISOString());

      let profileIds: string[] = [];
      
      if (activeAds?.length) {
        profileIds = activeAds.map(ad => ad.profile_id);
      } else {
        // If no active ads, get random creator profiles
        const { data: randomProfiles } = await supabase
          .from('profiles')
          .select('id')
          .eq('profile_type', 'content_creator')
          .limit(4)
          .order('created_at', { ascending: false });
          
        if (randomProfiles?.length) {
          profileIds = randomProfiles.map(profile => profile.id);
        }
      }

      if (profileIds.length) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('*')
          .in('id', profileIds)
          .eq('profile_type', 'content_creator');

        setFeaturedProfiles(profiles || []);
      } else {
        setFeaturedProfiles([]);
      }
    } catch (error) {
      console.error('Error fetching featured profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading featured profiles...</div>;
  }

  if (!featuredProfiles.length) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Ready to Collab Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredProfiles.map((profile) => (
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
                  Featured
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
        ))}
      </div>
    </div>
  );
};