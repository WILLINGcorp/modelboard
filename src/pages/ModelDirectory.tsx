import { NetworkFilters } from "@/components/network/NetworkFilters";
import { FeaturedProfiles } from "@/components/network/FeaturedProfiles";
import { ModelGrid } from "@/components/network/ModelGrid";
import { useOnlinePresence } from "@/hooks/use-online-presence";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";

const ModelDirectory = () => {
  const [filter, setFilter] = useState("location");
  const [locationSearch, setLocationSearch] = useState("");
  const { user } = useAuth();
  const { isOnline } = useOnlinePresence(user?.id);

  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles", filter, locationSearch],
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div id="featured-section">
        <FeaturedProfiles />
      </div>
      
      <NetworkFilters 
        onFilterChange={handleFilterChange}
        onLocationSearch={handleLocationSearch}
      />
      
      <ModelGrid 
        profiles={profiles} 
        isOnline={isOnline} 
      />

      <div className="mt-24">
        <SponsorFeaturedMembers />
      </div>
    </div>
  );
};

export default ModelDirectory;