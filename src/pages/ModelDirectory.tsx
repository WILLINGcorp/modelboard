import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { NetworkFilters } from "@/components/network/NetworkFilters";
import { FeaturedProfiles } from "@/components/network/FeaturedProfiles";
import { PurchaseAdSpot } from "@/components/network/PurchaseAdSpot";
import { ModelGrid } from "@/components/network/ModelGrid";
import { useOnlinePresence } from "@/hooks/use-online-presence";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

const ModelDirectory = () => {
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
    }

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

        <ModelGrid 
          profiles={filteredProfiles}
          isOnline={isOnline}
        />
      </div>
    </div>
  );
};

export default ModelDirectory;