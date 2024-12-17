import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface InviteCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
  onSuccess: () => void;
}

export const InviteCollaboratorModal = ({
  isOpen,
  onClose,
  proposalId,
  onSuccess,
}: InviteCollaboratorModalProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInviteExistingUser = async () => {
    if (!username.trim()) return;

    setIsLoading(true);
    try {
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username);

      if (profileError) throw profileError;
      
      if (!profiles || profiles.length === 0) {
        toast({
          title: "Error",
          description: "User not found",
          variant: "destructive",
        });
        return;
      }

      // Create workflow step for the invitation
      const { error: stepError } = await supabase
        .from("collab_workflow_steps")
        .insert({
          proposal_id: proposalId,
          step_type: "Add Collaborator",
          data: { collaborator_id: profiles[0].id, message },
        });

      if (stepError) throw stepError;

      toast({
        title: "Success",
        description: "Invitation sent successfully",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Invitation error:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteNewUser = async () => {
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      // Create workflow step for the invitation
      const { error: stepError } = await supabase
        .from("collab_workflow_steps")
        .insert({
          proposal_id: proposalId,
          step_type: "Add Collaborator",
          data: { email, message, pending_registration: true },
        });

      if (stepError) throw stepError;

      // Send invitation email using edge function
      const { data, error } = await supabase.functions.invoke('send-collab-invitation', {
        body: {
          email,
          message,
          proposalId,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Invitation sent successfully",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Invitation error:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-modelboard-dark text-white">
        <DialogHeader>
          <DialogTitle>Invite Collaborator</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="existing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Existing User</TabsTrigger>
            <TabsTrigger value="new">New User</TabsTrigger>
          </TabsList>
          <TabsContent value="existing" className="space-y-4">
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Textarea
              placeholder="Add a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              onClick={handleInviteExistingUser}
              disabled={isLoading || !username.trim()}
              className="w-full"
            >
              Send Invitation
            </Button>
          </TabsContent>
          <TabsContent value="new" className="space-y-4">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              placeholder="Add a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              onClick={handleInviteNewUser}
              disabled={isLoading || !email.trim()}
              className="w-full"
            >
              Send Invitation
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};