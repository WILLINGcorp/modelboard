import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InviteCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
  onSuccess?: () => void;
}

const InviteCollaboratorModal = ({
  isOpen,
  onClose,
  proposalId,
  onSuccess,
}: InviteCollaboratorModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInvite = async () => {
    if (!email.trim()) return;
    
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

      // Find receiver by email
      const { data: receiverProfiles, error: receiverError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email.trim());

      if (receiverError) throw receiverError;
      if (!receiverProfiles || receiverProfiles.length === 0) {
        throw new Error("User not found with this email");
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
          location: "Remote", // Adding default location as required by the schema
        });

      if (proposalError) throw proposalError;

      // Send email invitation using Edge Function
      const { error: inviteError } = await supabase.functions.invoke(
        "send-collab-invitation",
        {
          body: {
            receiverEmail: email.trim(),
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
      onSuccess?.();
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
          <DialogDescription className="text-gray-400">
            Enter the email address of the person you want to collaborate with.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
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
              disabled={isLoading || !email.trim()}
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