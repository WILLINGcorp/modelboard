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