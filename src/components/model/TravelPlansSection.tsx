import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Handshake, MapPin, Pencil, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CollabProposalForm from "@/components/travel/CollabProposalForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TravelPlan = Database['public']['Tables']['travel_plans']['Row'];

interface TravelPlansSectionProps {
  travelPlans: TravelPlan[];
}

const TravelPlansSection = ({ travelPlans }: TravelPlansSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const setAsCurrentLocation = useMutation({
    mutationFn: async (location: string) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("No session");

      const { error } = await supabase
        .from("profiles")
        .update({ location })
        .eq("id", session.session.user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Location updated",
        description: "Your current location has been updated successfully.",
      });
    },
  });

  const deleteTravelPlan = useMutation({
    mutationFn: async (planId: string) => {
      const { error } = await supabase
        .from("travel_plans")
        .delete()
        .eq("id", planId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
      toast({
        title: "Travel plan deleted",
        description: "Your travel plan has been deleted successfully.",
      });
    },
  });

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
                <p className="text-gray-400 mb-4">{plan.description}</p>
              )}
              <div className="space-y-2">
                <Button 
                  onClick={() => {
                    setSelectedPlan(plan);
                    setIsDialogOpen(true);
                  }}
                  className="w-full bg-modelboard-dark hover:bg-modelboard-gray text-white"
                >
                  <Handshake className="h-4 w-4 mr-2" />
                  Send Proposal
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // TODO: Implement edit functionality
                      toast({
                        title: "Edit functionality",
                        description: "Edit functionality coming soon.",
                      });
                    }}
                    className="text-white hover:text-modelboard-red"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAsCurrentLocation.mutate(plan.destination);
                    }}
                    className="text-white hover:text-modelboard-red"
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      deleteTravelPlan.mutate(plan.id);
                    }}
                    className="text-white hover:text-modelboard-red"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TravelPlansSection;