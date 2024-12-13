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

interface WorkflowActionsProps {
  onActionClick: (action: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
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

const WorkflowActions = ({ onActionClick, isOpen, onOpenChange }: WorkflowActionsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-modelboard-red">
          Workflow Actions
        </h3>
        <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-modelboard-red/10"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 bg-[#2A2A2A] border border-modelboard-red/20">
            {workflowActions.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => onActionClick(item.action)}
                className={cn(
                  "flex items-center gap-3 p-3 text-[#E5DEFF] hover:bg-modelboard-red/10 cursor-pointer transition-colors",
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
  );
};

export default WorkflowActions;