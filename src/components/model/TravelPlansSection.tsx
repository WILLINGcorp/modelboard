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
} from "@/components/ui/dialog";
import { useState } from "react";
import CollabProposalForm from "@/components/travel/CollabProposalForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

type TravelPlan = Database['public']['Tables']['travel_plans']['Row'];

interface TravelPlansSectionProps {
  travelPlans: TravelPlan[];
}

const TravelPlansSection = ({ travelPlans }: TravelPlansSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    destination: "",
    description: "",
    start_date: new Date(),
    end_date: new Date()
  });
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

  const updateTravelPlan = useMutation({
    mutationFn: async (data: { 
      id: string;
      destination: string;
      description: string | null;
      start_date: Date;
      end_date: Date;
    }) => {
      const { error } = await supabase
        .from("travel_plans")
        .update({
          destination: data.destination,
          description: data.description,
          start_date: data.start_date.toISOString(),
          end_date: data.end_date.toISOString(),
        })
        .eq("id", data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
      setIsEditDialogOpen(false);
      toast({
        title: "Travel plan updated",
        description: "Your travel plan has been updated successfully.",
      });
    },
  });

  const handleEditClick = (plan: TravelPlan) => {
    setEditFormData({
      destination: plan.destination,
      description: plan.description || "",
      start_date: new Date(plan.start_date),
      end_date: new Date(plan.end_date)
    });
    setSelectedPlan(plan);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!selectedPlan) return;
    
    if (!editFormData.destination) {
      toast({
        title: "Destination required",
        description: "Please enter a destination.",
        variant: "destructive",
      });
      return;
    }

    updateTravelPlan.mutate({
      id: selectedPlan.id,
      destination: editFormData.destination,
      description: editFormData.description || null,
      start_date: editFormData.start_date,
      end_date: editFormData.end_date,
    });
  };

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
                    onClick={() => handleEditClick(plan)}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-modelboard-gray text-white">
          <DialogHeader>
            <DialogTitle>Edit Travel Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Destination</label>
              <Input
                value={editFormData.destination}
                onChange={(e) => setEditFormData(prev => ({ ...prev, destination: e.target.value }))}
                className="bg-modelboard-dark border-modelboard-gray"
                placeholder="Enter destination"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                value={editFormData.description}
                onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-modelboard-dark border-modelboard-gray"
                placeholder="Enter description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Start Date</label>
                <Calendar
                  mode="single"
                  selected={editFormData.start_date}
                  onSelect={(date) => date && setEditFormData(prev => ({ ...prev, start_date: date }))}
                  className="bg-modelboard-dark rounded-md border border-modelboard-gray"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">End Date</label>
                <Calendar
                  mode="single"
                  selected={editFormData.end_date}
                  onSelect={(date) => date && setEditFormData(prev => ({ ...prev, end_date: date }))}
                  className="bg-modelboard-dark rounded-md border border-modelboard-gray"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditSubmit}
                disabled={updateTravelPlan.isPending}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TravelPlansSection;