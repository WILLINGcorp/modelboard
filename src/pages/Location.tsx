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
import { Plus, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TravelPlanForm from "@/components/travel/TravelPlanForm";
import TravelPlanCard from "@/components/travel/TravelPlanCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const TravelPlans = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const updateLocationMutation = useMutation({
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
      setIsEditingLocation(false);
      toast({
        title: "Location updated",
        description: "Your current location has been updated successfully.",
      });
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
  });

  const handleLocationUpdate = () => {
    if (!newLocation.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location.",
        variant: "destructive",
      });
      return;
    }
    updateLocationMutation.mutate(newLocation);
  };

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Current Location Section */}
        <div className="bg-card rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Current Location
            </h2>
          </div>
          {isEditingLocation ? (
            <div className="flex gap-4">
              <Input
                placeholder="Enter your current location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleLocationUpdate}
                disabled={updateLocationMutation.isPending}
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditingLocation(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-lg text-muted-foreground">
                {profile?.location || "No location set"}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setNewLocation(profile?.location || "");
                  setIsEditingLocation(true);
                }}
              >
                Update Location
              </Button>
            </div>
          )}
        </div>

        {/* Travel Plans Section */}
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
      </div>
    </div>
  );
};

export default TravelPlans;