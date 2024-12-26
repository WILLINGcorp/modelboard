import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const SponsorProfiles = () => {
  const navigate = useNavigate();
  const [sponsorProfiles, setSponsorProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    getSponsorProfiles();
  }, []);

  const getSponsorProfiles = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('profile_type', 'studio_executive')
        .limit(6);

      setSponsorProfiles(data || []);
    } catch (error) {
      console.error('Error fetching sponsor profiles:', error);
    }
  };

  if (sponsorProfiles.length === 0) return null;

  return (
    <div className="mt-12 bg-modelboard-gray p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Badge className="h-6 w-6 text-modelboard-red" />
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
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <img 
                  src="/lovable-uploads/12f3e2bf-eea4-420f-b448-27ebe594aaaf.png"
                  alt="Sponsor Badge"
                  className="w-6 h-6"
                />
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