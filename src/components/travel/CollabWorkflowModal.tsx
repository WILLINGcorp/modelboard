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
import { cn } from "@/lib/utils";
import ProposalDetails from "./ProposalDetails";
import WorkflowActions from "./WorkflowActions";
import ApprovalsList from "./workflow/ApprovalsList";

interface Proposal {
  id: string;
  status: string;
  message: string | null;
  location: string;
  created_at: string;
  sender: {
    id: string;
    display_name: string | null;
    username: string | null;
  } | null;
  receiver: {
    id: string;
    display_name: string | null;
    username: string | null;
  } | null;
}

interface WorkflowStep {
  id: string;
  step_type: string;
  status: string;
  data: any;
  created_at: string;
}

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

  const renderStepContent = (step: WorkflowStep) => {
    const data = step.data || {};
    
    switch (step.step_type) {
      case "Add Collaborator":
        return (
          <div>
            <p className="text-gray-400">Added collaborators:</p>
            <ul className="list-disc list-inside">
              {data.collaborators?.map((email: string, index: number) => (
                <li key={index} className="text-white">{email}</li>
              ))}
            </ul>
          </div>
        );
      case "Schedule Shoot":
      case "Schedule Release":
        return (
          <div>
            <p className="text-gray-400">Scheduled for:</p>
            <p className="text-white">
              {new Date(data.date).toLocaleDateString()} at {data.time}
            </p>
          </div>
        );
      case "Compliance":
        return (
          <div>
            <p className="text-gray-400">Compliance details:</p>
            <p className="text-white">{data.description}</p>
          </div>
        );
      case "Share Footage":
      case "Upload Promo":
      case "Upload Gallery":
      case "Upload Release":
        return (
          <div>
            <p className="text-gray-400">Uploaded file:</p>
            {data.fileUrl && (
              <a
                href={data.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-modelboard-red hover:underline"
              >
                View File
              </a>
            )}
          </div>
        );
      default:
        return null;
    }
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
              <div
                key={step.id}
                className="p-4 bg-modelboard-dark rounded-lg space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-semibold">{step.step_type}</h4>
                    <p className="text-sm text-gray-400">
                      {new Date(step.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-sm",
                      step.status === "approved"
                        ? "bg-green-500/20 text-green-500"
                        : step.status === "rejected"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    )}
                  >
                    {step.status}
                  </span>
                </div>
                {renderStepContent(step)}
                <ApprovalsList stepId={step.id} />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollabWorkflowModal;