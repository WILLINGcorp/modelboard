import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const SponsorFeaturedMembers = () => {
  const navigate = useNavigate();
  
  const { data: sponsorProfiles = [] } = useQuery({
    queryKey: ["sponsor-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('subscription_status', 'sponsor')
        .gt('subscription_end_date', new Date().toISOString())
        .limit(6);

      if (error) throw error;
      return data || [];
    },
  });

  if (sponsorProfiles.length === 0) return null;

  return (
    <div className="mt-12 bg-modelboard-gray p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">
        Sponsor Members
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {sponsorProfiles.map((profile) => (
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
                <span className="px-2 py-1 text-xs font-semibold bg-modelboard-red text-white rounded">
                  Sponsor
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