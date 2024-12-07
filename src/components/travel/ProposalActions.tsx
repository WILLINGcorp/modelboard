import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProposalActionsProps {
  status: string;
  onAccept: () => void;
  onReject: () => void;
}

const ProposalActions = ({ status, onAccept, onReject }: ProposalActionsProps) => {
  if (status !== "pending") return null;

  return (
    <div className="flex space-x-2">
      <Button
        size="icon"
        variant="ghost"
        className="hover:text-green-500"
        onClick={onAccept}
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="hover:text-red-500"
        onClick={onReject}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProposalActions;