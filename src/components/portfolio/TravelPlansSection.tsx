import type { Database } from "@/integrations/supabase/types";
import TravelPlanCard from "@/components/travel/TravelPlanCard";

type TravelPlan = Database['public']['Tables']['travel_plans']['Row'];

interface TravelPlansSectionProps {
  travelPlans: TravelPlan[];
}

const TravelPlansSection = ({ travelPlans }: TravelPlansSectionProps) => {
  if (travelPlans.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Voyages à venir</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {travelPlans.map((plan) => (
          <TravelPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default TravelPlansSection;