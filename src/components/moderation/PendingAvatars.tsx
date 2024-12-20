import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export const PendingAvatars = () => {
  const { data: pendingAvatars, refetch } = useQuery({
    queryKey: ["pendingAvatars"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .eq("avatar_moderation_status", "pending");
      return data || [];
    },
  });

  const handleModeration = async (profileId: string, approved: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        avatar_moderation_status: approved ? "approved" : "rejected",
        avatar_moderation_comment: approved ? null : "Avatar rejected by moderator",
      })
      .eq("id", profileId);

    if (error) {
      toast.error("Failed to moderate avatar");
      return;
    }

    toast.success(`Avatar ${approved ? "approved" : "rejected"}`);
    refetch();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pendingAvatars?.map((profile) => (
        <div key={profile.id} className="bg-modelboard-gray p-6 rounded-lg">
          <img
            src={profile.avatar_url}
            alt={profile.display_name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-white mb-4">
            {profile.display_name || "Anonymous User"}
          </h3>
          <div className="flex gap-4">
            <Button
              onClick={() => handleModeration(profile.id, true)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2" /> Approve
            </Button>
            <Button
              onClick={() => handleModeration(profile.id, false)}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <X className="mr-2" /> Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};