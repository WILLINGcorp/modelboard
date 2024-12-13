import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserPlus,
  Calendar,
  ShieldCheck,
  Share2,
  Upload,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Proposal {
  id: string;
  status: string;
  message: string | null;
  location: string;
  created_at: string;
  sender: { id: string; display_name: string | null } | null;
  receiver: { id: string; display_name: string | null } | null;
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
      <DialogContent className="bg-modelboard-dark text-white">
        <DialogHeader>
          <DialogTitle>Collaboration Workflow</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border-b border-gray-700 pb-4">
            <h3 className="font-semibold mb-2">Proposal Details</h3>
            <p className="text-gray-300">Location: {proposal.location}</p>
            <p className="text-gray-300">
              Status: <span className="capitalize">{proposal.status}</span>
            </p>
            {proposal.message && (
              <p className="text-gray-300">Message: {proposal.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Workflow Actions</h3>
            <DropdownMenu open={isActionsOpen} onOpenChange={setIsActionsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-modelboard-gray text-white">
                <DropdownMenuItem onClick={() => handleActionClick("Add Collaborator")}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add an extra collaborator
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleActionClick("Schedule Shoot")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Date and Time of Shoot
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleActionClick("Compliance")}>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Achieve Regulatory Compliance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleActionClick("Share Footage")}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Raw Footage and Pictures
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleActionClick("Schedule Release")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Release Date and Time
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleActionClick("Upload Promo")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Promotional Assets
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleActionClick("Upload Gallery")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Pictures to Release Gallery
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleActionClick("Upload Release")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Release Audio/Video Assets
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollabWorkflowModal;