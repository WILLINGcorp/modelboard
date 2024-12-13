import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Star, Calendar } from "lucide-react";
import { NetworkFilters } from "@/components/network/NetworkFilters";
import { FeaturedProfiles } from "@/components/network/FeaturedProfiles";
import { PurchaseAdSpot } from "@/components/network/PurchaseAdSpot";
import { useOnlinePresence } from "@/hooks/use-online-presence";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

const ModelDirectory = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("location");
  const [searchLocation, setSearchLocation] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>();
  const { isOnline } = useOnlinePresence(currentUserId);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
    getProfiles();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
    }
  };

  useEffect(() => {
    filterProfiles(activeFilter, searchLocation);
  }, [profiles, activeFilter, searchLocation]);

  const getProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("display_name", { ascending: true });

      if (error) throw error;
      setProfiles(data || []);
      setFilteredProfiles(data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProfiles = (filter: string, location: string = "") => {
    let filtered = [...profiles];

    // Apply main filter
    switch (filter) {
      case "online":
        filtered = filtered.filter(profile => isOnline(profile.id));
        break;
      case "creators":
        filtered = filtered.filter(profile => 
          Array.isArray(profile.roles) && profile.roles.includes("content_creator")
        );
        break;
      case "producers":
        filtered = filtered.filter(profile => 
          Array.isArray(profile.roles) && profile.roles.includes("indie_producer")
        );
        break;
      case "studios":
        filtered = filtered.filter(profile => 
          Array.isArray(profile.roles) && profile.roles.includes("studio_executive")
        );
        break;
      default:
        // "location" is default, no additional filtering needed
        break;
    }

    // Apply location search if provided
    if (location) {
      filtered = filtered.filter(profile =>
        profile.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredProfiles(filtered);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleLocationSearch = (location: string) => {
    setSearchLocation(location);
  };

  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast({
        title: "Success!",
        description: "Your featured spot has been purchased. It will be active shortly.",
      });
    }
  }, []);

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Model Directory</h1>
          <PurchaseAdSpot />
        </div>
        
        <FeaturedProfiles />
        
        <NetworkFilters 
          onFilterChange={handleFilterChange}
          onLocationSearch={handleLocationSearch}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfiles.map((profile) => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="absolute top-4 left-4">
                  {isOnline(profile.id) && (
                    <span className="text-modelboard-red text-sm font-medium">
                      Online Now
                    </span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelDirectory;
