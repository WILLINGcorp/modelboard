import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useCollabInvite = (proposalId: string, onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendInvite = async (username: string) => {
    if (!username.trim()) {
      toast.error("Please enter a valid username");
      return;
    }

    setIsLoading(true);
    try {
      const { data: profiles, error: searchError } = await supabase
        .from("profiles")
        .select("id")
        .or(`username.eq.${username},display_name.eq.${username}`)
        .single();

      if (searchError || !profiles) {
        throw new Error("User not found");
      }

      const { error: inviteError } = await supabase
        .from("collab_workflow_steps")
        .insert({
          proposal_id: proposalId,
          step_type: "Add Collaborator",
          status: "pending",
          data: {
            collaborator_id: profiles.id
          }
        });

      if (inviteError) throw inviteError;

      toast.success("Invitation sent successfully!");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to send invitation");
      console.error("Error sending invite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sendInvite,
  };
};