import { FeaturedProfiles } from "@/components/network/FeaturedProfiles";
import { ModelGrid } from "@/components/network/ModelGrid";
import { useOnlinePresence } from "@/hooks/use-online-presence";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";
import { NetworkFilters } from "@/components/network/NetworkFilters";

const ModelDirectory = () => {
  const [filter, setFilter] = useState("location");
  const [locationSearch, setLocationSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [nicheFilter, setNicheFilter] = useState("all");
  const { user } = useAuth();
  const { isOnline } = useOnlinePresence(user?.id);

  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles", filter, locationSearch, genderFilter, nicheFilter],
    queryFn: async () => {
      let query = supabase.from("profiles").select("*");

      if (filter === "creators") {
        query = query.eq("profile_type", "content_creator");
      } else if (filter === "producers") {
        query = query.eq("profile_type", "indie_producer");
      } else if (filter === "studios") {
        query = query.eq("profile_type", "studio_executive");
      }

      if (locationSearch) {
        query = query.ilike("location", `%${locationSearch}%`);
      }

      const { data } = await query;
      return data || [];
    },
  });

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleLocationSearch = (location: string) => {
    setLocationSearch(location);
  };

  const handleGenderFilter = (gender: string) => {
    setGenderFilter(gender);
  };

  const handleNicheFilter = (niche: string) => {
    setNicheFilter(niche);
  };

  // Query for studio accounts
  const { data: studioProfiles = [] } = useQuery({
    queryKey: ["studio-profiles"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("profile_type", "studio_executive");
      return data || [];
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div id="featured-section">
        <FeaturedProfiles />
      </div>
      
      <NetworkFilters 
        onFilterChange={handleFilterChange}
        onLocationSearch={handleLocationSearch}
        onGenderFilter={handleGenderFilter}
        onNicheTagFilter={handleNicheFilter}
      />
      
      <ModelGrid 
        profiles={profiles} 
        isOnline={isOnline} 
      />

      <div className="mt-24">
        <SponsorFeaturedMembers />
      </div>

      {/* Studio Accounts Section */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-8">Studio Accounts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {studioProfiles.map((profile) => (
            <ModelCard 
              key={profile.id}
              profile={profile}
              isOnline={isOnline}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelDirectory;