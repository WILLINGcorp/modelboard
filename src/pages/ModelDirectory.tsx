import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { NetworkFilters } from "@/components/network/NetworkFilters";
import { FeaturedProfiles } from "@/components/network/FeaturedProfiles";
import { ModelGrid } from "@/components/network/ModelGrid";
import { SponsorProfiles } from "@/components/network/SponsorProfiles";
import { supabase } from "@/integrations/supabase/client";
import { useOnlinePresence } from "@/hooks/use-online-presence";
import { useAuth } from "@/hooks/use-auth";
import type { Profile } from "@/components/network/FeaturedProfiles";

const ModelDirectory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [filter, setFilter] = useState("location");
  const { user } = useAuth();
  const { isOnline } = useOnlinePresence(user?.id);

  useEffect(() => {
    const scrollToFeature = location.state?.scrollToFeature;
    if (scrollToFeature) {
      const featureSection = document.getElementById("featured-section");
      if (featureSection) {
        featureSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  useEffect(() => {
    getProfiles();
  }, [filter, searchParams]);

  const getProfiles = async () => {
    try {
      setLoading(true);
      let query = supabase.from("profiles").select("*");

      if (filter === "creators") {
        query = query.eq("profile_type", "content_creator");
      } else if (filter === "producers") {
        query = query.eq("profile_type", "indie_producer");
      } else if (filter === "studios") {
        query = query.eq("profile_type", "studio_executive");
      }

      const locationParam = searchParams.get("location");
      if (locationParam) {
        query = query.ilike("location", `%${locationParam}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleLocationSearch = (location: string) => {
    setSearchParams({ location });
  };

  // Add console.log to debug isOnline
  console.log("ModelDirectory isOnline:", isOnline);

  return (
    <div className="container mx-auto px-4 py-8">
      <div id="featured-section" className="mb-12">
        <FeaturedProfiles />
      </div>
      
      <NetworkFilters 
        onFilterChange={handleFilterChange}
        onLocationSearch={handleLocationSearch}
      />
      
      {loading ? (
        <div className="text-center text-white">Loading profiles...</div>
      ) : (
        <>
          <ModelGrid 
            profiles={profiles} 
            isOnline={isOnline} 
          />
          <div className="mt-12">
            <SponsorProfiles />
          </div>
        </>
      )}
    </div>
  );
};

export default ModelDirectory;