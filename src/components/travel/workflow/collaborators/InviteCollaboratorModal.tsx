import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

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

  const handleInviteExisting = async () => {
    try {
      setIsLoading(true);
      
      // First, find the user by username
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

      // Create a workflow step for adding collaborator
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
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteNew = async () => {
    try {
      setIsLoading(true);

      // Create a workflow step for inviting new user
      const { error: stepError } = await supabase
        .from("collab_workflow_steps")
        .insert({
          proposal_id: proposalId,
          step_type: "Invite New Collaborator",
          data: { email, message },
        });

      if (stepError) throw stepError;

      // Send invitation email using edge function
      const { data, error } = await supabase.functions.invoke('send-collab-invitation', {
        body: JSON.stringify({
          email,
          message,
          proposalId,
        }),
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
      <DialogContent className="sm:max-w-[500px] bg-modelboard-gray">
        <DialogHeader>
          <DialogTitle className="text-white">Invite Collaborator</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="existing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-modelboard-dark">
            <TabsTrigger value="existing">Existing User</TabsTrigger>
            <TabsTrigger value="new">New User</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-modelboard-dark"
            />
            <Textarea
              placeholder="Add a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-modelboard-dark"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleInviteExisting}
                disabled={!username || isLoading}
                className="bg-modelboard-red hover:bg-red-600"
              >
                Send Invitation
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-modelboard-dark"
            />
            <Textarea
              placeholder="Add a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-modelboard-dark"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleInviteNew}
                disabled={!email || isLoading}
                className="bg-modelboard-red hover:bg-red-600"
              >
                Send Invitation
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};