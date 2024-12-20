import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { toast } from "sonner";

const DURATION_OPTIONS = [
  { label: "7 days", days: 7 },
  { label: "15 days", days: 15 },
  { label: "30 days", days: 30 },
];

export const SponsorUpgrades = () => {
  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, subscription_status, subscription_end_date");
      return data || [];
    },
  });

  const handleUpgrade = async (profileId: string, days: number) => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_status: "sponsor",
        subscription_end_date: endDate.toISOString(),
      })
      .eq("id", profileId);

    if (error) {
      toast.error("Failed to upgrade account");
      return;
    }

    toast.success(`Account upgraded for ${days} days`);
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
          <h3 className="text-xl font-semibold text-white mb-2">
            {profile.display_name || "Anonymous User"}
          </h3>
          <p className="text-gray-400 mb-4">
            Status: {profile.subscription_status || "free"}
            {profile.subscription_end_date && (
              <> until {new Date(profile.subscription_end_date).toLocaleDateString()}</>
            )}
          </p>
          <div className="space-y-2">
            {DURATION_OPTIONS.map((option) => (
              <Button
                key={option.days}
                onClick={() => handleUpgrade(profile.id, option.days)}
                className="w-full bg-modelboard-red hover:bg-red-600"
              >
                <Crown className="mr-2" /> Upgrade for {option.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};