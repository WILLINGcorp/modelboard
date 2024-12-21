import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useCollabInvite = (proposalId: string, onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendInvite = async (username: string) => {
    try {
      setIsLoading(true);
      
      // First get the user's profile ID from their username
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();

      if (profileError || !profiles) {
        toast.error("User not found");
        return;
      }

      // Add the user as a collaborator
      const { error: inviteError } = await supabase
        .from('collab_workflow_steps')
        .insert({
          proposal_id: proposalId,
          step_type: 'Add Collaborator',
          data: { collaborator_id: profiles.id }
        });

      if (inviteError) {
        toast.error("Failed to send invitation");
        return;
      }

      toast.success("Invitation sent successfully");
      onSuccess();
    } catch (error) {
      toast.error("An error occurred while sending the invitation");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, sendInvite };
};