import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCollabInvite } from "./hooks/useCollabInvite";

interface InviteCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const InviteCollaboratorModal = ({
  isOpen,
  onClose,
  onSuccess = () => {},
}: InviteCollaboratorModalProps) => {
  const [displayName, setDisplayName] = useState("");
  const { isLoading, sendInvite } = useCollabInvite(onSuccess);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-modelboard-dark text-white">
        <DialogHeader>
          <DialogTitle>Invite Collaborator</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the display name of the user you want to invite
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="displayName" className="text-sm font-medium">
              Display Name
            </label>
            <Input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter display name"
              className="bg-modelboard-gray border-modelboard-gray"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-modelboard-gray hover:bg-modelboard-gray/90"
            >
              Cancel
            </Button>
            <Button
              onClick={() => sendInvite(displayName)}
              disabled={isLoading || !displayName.trim()}
              className="bg-modelboard-red hover:bg-modelboard-red/90"
            >
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCollaboratorModal;