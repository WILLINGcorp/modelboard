import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProposalDetails from "./ProposalDetails";
import WorkflowActions from "./WorkflowActions";
import WorkflowStepItem from "./workflow/WorkflowStepItem";
import { Proposal, WorkflowStep } from "./types/workflow";

interface CollabWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal;
}

const CollabWorkflowModal = ({
  isOpen,
  onClose,
  proposal,
}: CollabWorkflowModalProps) => {
  const { toast } = useToast();
  const [steps, setSteps] = useState<WorkflowStep[]>([]);

  useEffect(() => {
    if (proposal.id) {
      fetchWorkflowSteps();
    }
  }, [proposal.id]);

  const fetchWorkflowSteps = async () => {
    const { data, error } = await supabase
      .from("collab_workflow_steps")
      .select("*")
      .eq("proposal_id", proposal.id)
      .order("created_at", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load workflow steps",
        variant: "destructive",
      });
      return;
    }

    setSteps(data || []);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-modelboard-gray border-modelboard-red/50 hover:border-2 transition-all duration-300 relative overflow-hidden group fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-modelboard-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            Collaboration Workflow
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Manage your collaboration process step by step
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 relative z-10">
          <ProposalDetails
            location={proposal.location}
            status={proposal.status}
            message={proposal.message}
            senderName={proposal.sender?.display_name}
            senderUsername={proposal.sender?.username}
            receiverName={proposal.receiver?.display_name}
            receiverUsername={proposal.receiver?.username}
          />

          <WorkflowActions
            proposalId={proposal.id}
            onSuccess={fetchWorkflowSteps}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gradient">Workflow Steps</h3>
            {steps.map((step) => (
              <WorkflowStepItem key={step.id} step={step} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollabWorkflowModal;