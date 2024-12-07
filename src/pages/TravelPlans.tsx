import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TravelPlanForm from "@/components/travel/TravelPlanForm";
import TravelPlanCard from "@/components/travel/TravelPlanCard";
import CollabProposalsList from "@/components/travel/CollabProposalsList";

const TravelPlans = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">My Travel Plans</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-modelboard-red hover:bg-red-600">
                <Plus className="mr-2" />
                Plan a Trip
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-modelboard-gray text-white">
              <DialogHeader>
                <DialogTitle>Plan a New Trip</DialogTitle>
              </DialogHeader>
              <TravelPlanForm
                onSuccess={refetch}
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelPlans?.map((plan) => (
            <TravelPlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <CollabProposalsList />
      </div>
    </div>
  );
};

export default TravelPlans;