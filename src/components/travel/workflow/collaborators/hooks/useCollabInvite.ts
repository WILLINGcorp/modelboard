import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useCollabInvite = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendInvite = async (username: string) => {
    if (!username.trim()) return;
    
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: senderProfile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      const { data: receiverProfiles, error: receiverError } = await supabase
        .from("profiles")
        .select("id")
        .or(`username.eq.${username.trim()},display_name.eq.${username.trim()}`);

      if (receiverError) throw receiverError;
      if (!receiverProfiles || receiverProfiles.length === 0) {
        throw new Error("User not found with this username");
      }

      const receiverProfile = receiverProfiles[0];

      const { error: proposalError } = await supabase
        .from("collab_proposals")
        .insert({
          sender_id: user.id,
          receiver_id: receiverProfile.id,
          status: "pending",
          message: `Collaboration invitation from ${senderProfile?.display_name || "a user"}`,
          location: "Remote",
        });

      if (proposalError) throw proposalError;

      toast({
        title: "Success",
        description: "Collaboration invitation sent successfully",
      });
      onSuccess();
    } catch (error: any) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sendInvite
  };
};