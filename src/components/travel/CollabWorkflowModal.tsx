import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import ProposalDetails from "./ProposalDetails";
import WorkflowActions from "./WorkflowActions";

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
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const handleActionClick = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} - This feature is coming soon!`,
    });
    setIsActionsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-[#1A1F2C] to-[#2A2A2A] text-white border border-modelboard-red/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-modelboard-red to-red-400">
            Collaboration Workflow
          </DialogTitle>
          <DialogDescription className="text-[#8E9196]">
            Manage your collaboration process step by step
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
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
            onActionClick={handleActionClick}
            isOpen={isActionsOpen}
            onOpenChange={setIsActionsOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollabWorkflowModal;