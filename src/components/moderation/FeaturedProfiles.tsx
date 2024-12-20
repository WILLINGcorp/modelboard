import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

export const FeaturedProfiles = () => {
  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .eq("avatar_moderation_status", "approved");
      return data || [];
    },
  });

  const handleFeature = async (profileId: string) => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 6);

    const { error } = await supabase
      .from("featured_profiles")
      .insert({
        profile_id: profileId,
        end_time: endTime.toISOString(),
      });

    if (error) {
      toast.error("Failed to feature profile");
      return;
    }

    toast.success("Profile featured for 6 hours");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles?.map((profile) => (
        <div key={profile.id} className="bg-modelboard-gray p-6 rounded-lg">
          <img
            src={profile.avatar_url || "/creator_default_profile.jpg"}
            alt={profile.display_name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-white mb-4">
            {profile.display_name || "Anonymous User"}
          </h3>
          <Button
            onClick={() => handleFeature(profile.id)}
            className="w-full bg-modelboard-red hover:bg-red-600"
          >
            <Star className="mr-2" /> Feature for 6 hours
          </Button>
        </div>
      ))}
    </div>
  );
};