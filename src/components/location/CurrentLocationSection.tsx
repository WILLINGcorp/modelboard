import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MapPin } from "lucide-react";

interface CurrentLocationSectionProps {
  profile: {
    location: string | null;
    id: string;
  } | null;
}

const CurrentLocationSection = ({ profile }: CurrentLocationSectionProps) => {
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
  );
};

export default CurrentLocationSection;