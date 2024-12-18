import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CollabProposalForm from "@/components/travel/CollabProposalForm";

type TravelPlan = Database['public']['Tables']['travel_plans']['Row'];

interface TravelPlansSectionProps {
  travelPlans: TravelPlan[];
}

const TravelPlansSection = ({ travelPlans }: TravelPlansSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{plan.destination}</h3>
                <Dialog open={isDialogOpen && selectedPlan?.id === plan.id} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) setSelectedPlan(null);
                }}>
                  <DialogContent className="bg-modelboard-gray text-white">
                    <DialogHeader>
                      <DialogTitle>Propose Collaboration in {plan.destination}</DialogTitle>
                    </DialogHeader>
                    <CollabProposalForm
                      travelPlanId={plan.id}
                      receiverId={plan.profile_id}
                      location={plan.destination}
                      onSuccess={() => setIsDialogOpen(false)}
                      onClose={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="text-gray-300 mb-2">
                {format(new Date(plan.start_date), "MMM d, yyyy")} - {format(new Date(plan.end_date), "MMM d, yyyy")}
              </div>
              {plan.description && (
                <p className="text-gray-400">{plan.description}</p>
              )}
              <Button 
                onClick={() => {
                  setSelectedPlan(plan);
                  setIsDialogOpen(true);
                }}
                className="w-full mt-4 bg-modelboard-dark hover:bg-modelboard-gray text-white"
              >
                <Handshake className="h-4 w-4 mr-2" />
                Send Proposal
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TravelPlansSection;