import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const PendingAvatars = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<string>("");

  const { data: pendingAvatars, isLoading } = useQuery({
    queryKey: ["pendingAvatars"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("avatar_moderation_status", "pending")
        .not("avatar_url", "is", null);

      if (error) throw error;
      return data as Profile[];
    },
  });

  const moderateMutation = useMutation({
    mutationFn: async ({ profileId, status }: { profileId: string, status: 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_moderation_status: status,
          avatar_moderation_comment: comment,
        })
        .eq("id", profileId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingAvatars"] });
      toast({
        title: "Success",
        description: "Moderation status updated",
      });
      setComment("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update moderation status",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pendingAvatars?.length) {
    return <div className="text-white">No pending profile pictures to moderate.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pendingAvatars.map((profile) => (
        <Card key={profile.id} className="bg-modelboard-gray">
          <CardContent className="p-4">
            <img
              src={profile.avatar_url || "/creator_default_profile.jpg"}
              alt={`${profile.display_name}'s avatar`}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">
                {profile.display_name || "Anonymous User"}
              </h3>
              <Textarea
                placeholder="Moderation comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-modelboard-dark text-white"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 p-4">
            <Button
              onClick={() => moderateMutation.mutate({ profileId: profile.id, status: 'approved' })}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
            <Button
              onClick={() => moderateMutation.mutate({ profileId: profile.id, status: 'rejected' })}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Reject
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};