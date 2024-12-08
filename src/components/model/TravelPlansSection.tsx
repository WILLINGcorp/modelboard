import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import type { Database } from "@/integrations/supabase/types";

type TravelPlan = Database['public']['Tables']['travel_plans']['Row'];

interface TravelPlansSectionProps {
  travelPlans: TravelPlan[];
}

const TravelPlansSection = ({ travelPlans }: TravelPlansSectionProps) => {
  if (travelPlans.length === 0) return null;

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">Upcoming Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {travelPlans.map((plan) => (
          <Card
            key={plan.id}
            className="bg-modelboard-gray overflow-hidden"
          >
            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{plan.destination}</h3>
              <div className="text-gray-300 mb-2">
                {format(new Date(plan.start_date), "MMM d, yyyy")} - {format(new Date(plan.end_date), "MMM d, yyyy")}
              </div>
              {plan.description && (
                <p className="text-gray-400">{plan.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TravelPlansSection;