import { FeaturedProfiles } from "@/components/network/FeaturedProfiles";
import { ModelGrid } from "@/components/network/ModelGrid";
import { ModelCard } from "@/components/network/ModelCard";
import { useOnlinePresence } from "@/hooks/use-online-presence";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";
import { NetworkFilters } from "@/components/network/NetworkFilters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ModelDirectory = () => {
  const [filter, setFilter] = useState("location");
  const [locationSearch, setLocationSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [nicheFilter, setNicheFilter] = useState("all");
  const [studioSearch, setStudioSearch] = useState("");
  const [studioLocation, setStudioLocation] = useState("");
  const [studioNiche, setStudioNiche] = useState("all");
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
      }

      if (locationSearch) {
        query = query.ilike("location", `%${locationSearch}%`);
      }

      if (genderFilter !== "all") {
        query = query.eq("gender", genderFilter);
      }

      if (nicheFilter !== "all") {
        query = query.contains("roles", [nicheFilter]);
      }

      const { data } = await query;
      return data || [];
    },
  });

  // Query for studio accounts with filtering
  const { data: studioProfiles = [] } = useQuery({
    queryKey: ["studio-profiles", studioLocation, studioNiche, studioSearch],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select("*")
        .eq("profile_type", "studio_executive");

      if (studioLocation) {
        query = query.ilike("location", `%${studioLocation}%`);
      }

      if (studioNiche !== "all") {
        query = query.contains("roles", [studioNiche]);
      }

      if (studioSearch) {
        query = query.or(`display_name.ilike.%${studioSearch}%,username.ilike.%${studioSearch}%`);
      }

      const { data } = await query;
      // Randomly shuffle the studio profiles
      return data ? data.sort(() => Math.random() - 0.5) : [];
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

      {/* Partnering Studios Section */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-8">Partnering Studios</h2>
        
        {/* Studio Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search studios by name..."
              value={studioSearch}
              onChange={(e) => setStudioSearch(e.target.value)}
              className="bg-modelboard-gray border-modelboard-gray text-white pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          <div className="relative flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Filter by location..."
              value={studioLocation}
              onChange={(e) => setStudioLocation(e.target.value)}
              className="bg-modelboard-gray border-modelboard-gray text-white"
            />
          </div>

          <Select onValueChange={setStudioNiche}>
            <SelectTrigger className="w-[180px] bg-modelboard-gray border-modelboard-gray text-white">
              <SelectValue placeholder="Filter by Niche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Niches</SelectItem>
              {commonNicheTags.map(tag => (
                <SelectItem key={tag} value={tag.toLowerCase()}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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