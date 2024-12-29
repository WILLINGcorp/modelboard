import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { TravelPlansGrid } from "@/components/travel/plan/TravelPlansGrid";
import TravelPlansHeader from "@/components/location/TravelPlansHeader";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";
import type { TravelPlan } from "@/components/travel/plan/types";

interface TravelPlansSectionProps {
  plans?: TravelPlan[];
}

const TravelPlansSection = ({ plans }: TravelPlansSectionProps) => {
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
    enabled: !plans, // Only fetch if plans are not provided as props
  });

  const displayPlans = plans || travelPlans || [];

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <TravelPlansHeader 
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          refetchTravelPlans={refetch}
        />

        <TravelPlansGrid 
          plans={displayPlans} 
          onLocationUpdate={refetch}
        />

        <SponsorFeaturedMembers />
      </div>
    </div>
  );
};

export default TravelPlansSection;