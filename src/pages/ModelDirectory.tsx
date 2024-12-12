import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Star, Calendar } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

const ModelDirectory = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("display_name", { ascending: true });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-modelboard-dark flex items-center justify-center">
        <div className="text-white">Loading models...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-modelboard-dark p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Model Directory</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <Card 
              key={profile.id}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-cover bg-center"
              style={{
                backgroundImage: profile.avatar_url 
                  ? `url(${profile.avatar_url})` 
                  : "url(/placeholder.svg)"
              }}
              onClick={() => navigate(`/models/${profile.id}`)}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                {/* Online Status */}
                <div className="absolute top-4 left-4">
                  <span className="text-modelboard-red text-sm font-medium">
                    Online Now
                  </span>
                </div>

                {/* Action Icons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 rounded-full bg-black/20 hover:bg-modelboard-red/80 transition-colors">
                    <Star className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 rounded-full bg-black/20 hover:bg-modelboard-red/80 transition-colors">
                    <Calendar className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Profile Info */}
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
    </div>
  );
};

export default ModelDirectory;