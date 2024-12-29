import { TravelPlanCard } from "./TravelPlanCard";
import type { TravelPlan } from "./types";

interface TravelPlansGridProps {
  plans: TravelPlan[];
  onLocationUpdate: () => void;
}

export const TravelPlansGrid = ({ plans, onLocationUpdate }: TravelPlansGridProps) => {
  if (plans.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <TravelPlanCard 
          key={plan.id} 
          plan={plan} 
          onLocationUpdate={onLocationUpdate}
        />
      ))}
    </div>
  );
};