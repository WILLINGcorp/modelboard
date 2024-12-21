import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useCollabInvite = (proposalId: string, onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendInvite = async (username: string) => {
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

      // Here you would typically call your invite collaborator endpoint
      // For now, we'll just show a success message
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