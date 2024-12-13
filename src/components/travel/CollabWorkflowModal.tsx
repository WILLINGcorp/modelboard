import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
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
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[95vh] bg-modelboard-dark border-t border-modelboard-red/50">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-gradient">
              Collaboration Workflow
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-400">
              Manage your collaboration process step by step
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 space-y-6">
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

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              <h3 className="text-lg font-bold text-gradient sticky top-0 bg-modelboard-dark py-2">
                Workflow Steps
              </h3>
              {steps.map((step) => (
                <WorkflowStepItem key={step.id} step={step} />
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CollabWorkflowModal;