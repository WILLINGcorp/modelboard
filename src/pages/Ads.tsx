import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PurchaseAdSpot } from "@/components/network/PurchaseAdSpot";
import { AdsList } from "@/components/ads/AdsList";
import { LocationSelect } from "@/components/ads/LocationSelect";
import { AdTypeSelect } from "@/components/ads/AdTypeSelect";

export type AdType = 
  | "filming_location"
  | "collaborator_replacement"
  | "videographer"
  | "accommodation"
  | "fixer"
  | "special_props"
  | "all";

const Ads = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<AdType>("all");

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      return data;
    },
  });

  const { data: ads, isLoading } = useQuery({
    queryKey: ["ads", selectedLocation, selectedType],
    queryFn: async () => {
      let query = supabase
        .from("paid_ads")
        .select(`
          id,
          title,
          description,
          location,
          ad_type,
          created_at,
          profiles (
            display_name,
            avatar_url
          )
        `)
        .eq("status", "active")
        .gt("end_time", new Date().toISOString());

      if (selectedLocation !== "all") {
        query = query.eq("location", selectedLocation);
      }
      if (selectedType !== "all") {
        query = query.eq("ad_type", selectedType);
      }

      const { data } = await query;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Community Ads</h1>
          <PurchaseAdSpot />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LocationSelect
            value={selectedLocation}
            onChange={setSelectedLocation}
            defaultLocation={profile?.location || ""}
          />
          <AdTypeSelect
            value={selectedType}
            onChange={setSelectedType}
          />
        </div>

        <AdsList ads={ads || []} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Ads;