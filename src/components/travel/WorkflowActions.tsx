import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Calendar,
  ShieldCheck,
  Share2,
  Upload,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import WorkflowStepModal from "./workflow/WorkflowStepModal";

interface WorkflowActionsProps {
  proposalId: string;
  onSuccess: () => void;
}

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

const WorkflowActions = ({ proposalId, onSuccess }: WorkflowActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setIsOpen(false);
  };

  return (
    <div className="p-4 rounded-lg bg-modelboard-dark border-modelboard-red/50 hover:border-2 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-modelboard-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex justify-between items-center relative z-10">
        <h3 className="text-lg font-bold text-gradient">Workflow Actions</h3>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-modelboard-red/10"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 bg-modelboard-dark border border-modelboard-red/20">
            {workflowActions.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleActionClick(item.action)}
                className={cn(
                  "flex items-center gap-3 p-3 text-white hover:bg-modelboard-red/10 cursor-pointer transition-colors",
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

      {selectedAction && (
        <WorkflowStepModal
          isOpen={!!selectedAction}
          onClose={() => setSelectedAction(null)}
          stepType={selectedAction}
          proposalId={proposalId}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
};

export default WorkflowActions;