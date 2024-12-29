import { format } from "date-fns";
import { MapPin, Calendar as CalendarIcon, UserPlus, CheckSquare, Edit2, XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CollabProposalForm from "./CollabProposalForm";

interface TravelPlan {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  description: string | null;
  status: string;
  profile_id: string;
}

interface TravelPlanCardProps {
  plan: TravelPlan;
  onLocationUpdate: () => void;
}

const TravelPlanCard = ({ plan, onLocationUpdate }: TravelPlanCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

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
      onLocationUpdate();
      toast({
        title: "Travel plan deleted",
        description: "Your travel plan has been deleted successfully.",
      });
    },
  });

  return (
    <div className="bg-modelboard-gray rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          <MapPin className="h-5 w-5" />
          <h3 className="text-xl font-semibold">{plan.destination}</h3>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:text-modelboard-red">
              <UserPlus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-modelboard-gray text-white">
            <DialogHeader>
              <DialogTitle>Propose Collaboration</DialogTitle>
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
      
      {plan.description && (
        <p className="text-gray-400">{plan.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {format(new Date(plan.start_date), "dd/MM/yyyy")} -{" "}
              {format(new Date(plan.end_date), "dd/MM/yyyy")}
            </span>
          </div>
          
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              plan.status === "upcoming"
                ? "bg-blue-500/20 text-blue-500"
                : "bg-green-500/20 text-green-500"
            }`}
          >
            {plan.status === "upcoming" ? "Upcoming" : "Completed"}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAsCurrentLocation.mutate()}
            className="text-white hover:text-modelboard-red"
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            Set as Current
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {/* TODO: Implement edit functionality */}}
            className="text-white hover:text-modelboard-red"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteTravelPlan.mutate()}
            className="text-white hover:text-modelboard-red"
          >
            <XOctagon className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanCard;