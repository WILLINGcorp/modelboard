import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import TravelPlanCard from "@/components/travel/TravelPlanCard";
import CurrentLocationSection from "@/components/location/CurrentLocationSection";
import TravelPlansHeader from "@/components/location/TravelPlansHeader";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";

const TravelPlans = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        navigate("/auth");
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: travelPlans, refetch } = useQuery({
    queryKey: ["travel-plans"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        navigate("/auth");
        return [];
      }

      const { data, error } = await supabase
        .from("travel_plans")
        .select()
        .match({ profile_id: session.session.user.id })
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <CurrentLocationSection profile={profile} />
        
        <TravelPlansHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          refetchTravelPlans={refetch}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelPlans?.map((plan) => (
            <TravelPlanCard 
              key={plan.id} 
              plan={plan} 
              onLocationUpdate={refetch}
            />
          ))}
        </div>

        <SponsorFeaturedMembers />
      </div>
    </div>
  );
};

export default TravelPlans;