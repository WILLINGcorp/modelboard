import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, MapPin, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CollabProposalForm from "@/components/travel/CollabProposalForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { TravelPlan } from "./types";

interface TravelPlanCardProps {
  plan: TravelPlan;
  onLocationUpdate: () => void;
}

export const TravelPlanCard = ({ plan, onLocationUpdate }: TravelPlanCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const setAsCurrentLocation = useMutation({
    mutationFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("No session");

      const { error } = await supabase
        .from("profiles")
        .update({ location: plan.destination })
        .eq("id", session.session.user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      onLocationUpdate();
      toast({
        title: "Location updated",
        description: "Your current location has been updated successfully.",
      });
    },
  });

  const deleteTravelPlan = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("travel_plans")
        .delete()
        .eq("id", plan.id);

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

  return (
    <Card className="bg-modelboard-gray overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{plan.destination}</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
          {format(new Date(plan.start_date), "MMM d, yyyy")} -{" "}
          {format(new Date(plan.end_date), "MMM d, yyyy")}
        </div>
        {plan.description && (
          <p className="text-gray-400 mb-4">{plan.description}</p>
        )}
        <div className="space-y-2">
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="w-full bg-modelboard-dark hover:bg-modelboard-gray text-white"
          >
            <Handshake className="h-4 w-4 mr-2" />
            Send Proposal
          </Button>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              onClick={() => {/* TODO: Implement edit functionality */}}
              className="text-white hover:text-modelboard-red"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setAsCurrentLocation.mutate()}
              className="text-white hover:text-modelboard-red"
            >
              <MapPin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => deleteTravelPlan.mutate()}
              className="text-white hover:text-modelboard-red"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};