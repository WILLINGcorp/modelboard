import { useState } from "react";
import { ModelCard } from "./ModelCard";
import { NetworkFilters } from "./NetworkFilters";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ModelGridProps {
  profiles: Profile[];
  isOnline: (id: string) => boolean;
}

export const ModelGrid = ({ profiles, isOnline }: ModelGridProps) => {
  const [activeFilter, setActiveFilter] = useState("location");
  const [locationFilter, setLocationFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [nicheFilter, setNicheFilter] = useState("all");

  // Filter for content creators only
  const contentCreators = profiles.filter(profile => 
    profile.profile_type === 'creator'
  );

  // Sort by premium status
  const sortedProfiles = [...contentCreators].sort((a, b) => {
    if (a.subscription_status === 'sponsor' && b.subscription_status !== 'sponsor') return -1;
    if (a.subscription_status !== 'sponsor' && b.subscription_status === 'sponsor') return 1;
    return 0;
  });

  // Apply additional filters
  const filteredProfiles = sortedProfiles.filter(profile => {
    // Location filter
    if (locationFilter && profile.location) {
      if (!profile.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }
    }

    // Gender filter
    if (genderFilter !== "all" && profile.gender !== genderFilter) {
      return false;
    }

    // Online filter
    if (activeFilter === "online" && !isOnline(profile.id)) {
      return false;
    }

    // Premium filter
    if (activeFilter === "premium" && profile.subscription_status !== "sponsor") {
      return false;
    }

    // Niche tag filter
    if (nicheFilter !== "all" && profile.roles) {
      const profileTags = profile.roles as string[];
      if (!profileTags.some(tag => tag.toLowerCase() === nicheFilter.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <NetworkFilters
        onFilterChange={setActiveFilter}
        onLocationSearch={setLocationFilter}
        onGenderFilter={setGenderFilter}
        onNicheTagFilter={setNicheFilter}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProfiles.map((profile) => (
          <ModelCard 
            key={profile.id}
            profile={profile}
            isOnline={isOnline}
          />
        ))}
      </div>
    </div>
  );
};