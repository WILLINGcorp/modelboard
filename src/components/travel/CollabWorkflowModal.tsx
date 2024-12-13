import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { cn } from "@/lib/utils";

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

  const workflowActions = [
    {
      icon: <UserPlus className="h-4 w-4" />,
      label: "Add an extra collaborator",
      action: "Add Collaborator",
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: "Schedule Date and Time of Shoot",
      action: "Schedule Shoot",
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      label: "Achieve Regulatory Compliance",
      action: "Compliance",
    },
    {
      icon: <Share2 className="h-4 w-4" />,
      label: "Share Raw Footage and Pictures",
      action: "Share Footage",
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: "Schedule Release Date and Time",
      action: "Schedule Release",
    },
    {
      icon: <Upload className="h-4 w-4" />,
      label: "Upload Promotional Assets",
      action: "Upload Promo",
    },
    {
      icon: <Upload className="h-4 w-4" />,
      label: "Upload Pictures to Release Gallery",
      action: "Upload Gallery",
    },
    {
      icon: <Upload className="h-4 w-4" />,
      label: "Upload Release Audio/Video Assets",
      action: "Upload Release",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-[#1A1F2C] to-[#2A2A2A] text-white border border-[#9b87f5]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">
            Collaboration Workflow
          </DialogTitle>
          <DialogDescription className="text-[#8E9196]">
            Manage your collaboration process step by step
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-[#2A2A2A]/50 border border-[#9b87f5]/10 animate-fade-in">
            <h3 className="text-lg font-semibold text-[#D6BCFA] mb-3">
              Proposal Details
            </h3>
            <div className="space-y-2 text-[#E5DEFF]">
              <p className="flex items-center gap-2">
                <span className="text-[#8E9196]">Location:</span>
                {proposal.location}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#8E9196]">Status:</span>
                <span className="capitalize px-2 py-1 rounded-full text-sm bg-[#9b87f5]/20 text-[#D6BCFA]">
                  {proposal.status}
                </span>
              </p>
              {proposal.message && (
                <p className="flex items-center gap-2">
                  <span className="text-[#8E9196]">Message:</span>
                  {proposal.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#D6BCFA]">
                Workflow Actions
              </h3>
              <DropdownMenu open={isActionsOpen} onOpenChange={setIsActionsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#9b87f5]/10"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 bg-[#2A2A2A] border border-[#9b87f5]/20">
                  {workflowActions.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleActionClick(item.action)}
                      className={cn(
                        "flex items-center gap-3 p-3 text-[#E5DEFF] hover:bg-[#9b87f5]/10 cursor-pointer transition-colors",
                        "animate-fade-in",
                        { "animation-delay-100": index > 0 }
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollabWorkflowModal;