import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InviteCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
}

const InviteCollaboratorModal = ({
  isOpen,
  onClose,
  proposalId,
}: InviteCollaboratorModalProps) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInvite = async () => {
    if (!username.trim()) return;
    
    setIsLoading(true);
    try {
      // Get current user's name
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: senderProfile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      // Find receiver by username
      const { data: receiverProfiles, error: receiverError } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("username", username.trim());

      if (receiverError) throw receiverError;
      if (!receiverProfiles || receiverProfiles.length === 0) {
        throw new Error("User not found");
      }

      const receiverProfile = receiverProfiles[0];

      // Create collaboration proposal
      const { error: proposalError } = await supabase
        .from("collab_proposals")
        .insert({
          sender_id: user.id,
          receiver_id: receiverProfile.id,
          status: "pending",
          message: `Collaboration invitation from ${senderProfile?.display_name || "a user"}`,
        });

      if (proposalError) throw proposalError;

      // Send email invitation using Edge Function
      const { error: inviteError } = await supabase.functions.invoke(
        "send-collab-invitation",
        {
          body: {
            receiverEmail: username,
            senderName: senderProfile?.display_name || "A Modelboard User",
            proposalId,
          },
        }
      );

      if (inviteError) throw inviteError;

      toast({
        title: "Success",
        description: "Collaboration invitation sent successfully",
      });
      onClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-modelboard-dark text-white">
        <DialogHeader>
          <DialogTitle>Invite Collaborator</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="bg-modelboard-gray border-modelboard-gray"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-modelboard-gray hover:bg-modelboard-gray/90"
            >
              Cancel
            </Button>
            <Button
              onClick={handleInvite}
              disabled={isLoading || !username.trim()}
              className="bg-modelboard-red hover:bg-modelboard-red/90"
            >
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCollaboratorModal;