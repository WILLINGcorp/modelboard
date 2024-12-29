import { Button } from "@/components/ui/button";
import { MessageSquare, HandshakeIcon, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CollabProposalForm from "@/components/travel/CollabProposalForm";
import { useNavigate } from "react-router-dom";
import { MoodUpdater } from "./MoodUpdater";

interface ActionButtonsProps {
  isOwnProfile: boolean;
  profileId: string;
  currentMood: string;
  location: string;
  onMessageClick?: () => void;
}

export const ActionButtons = ({ 
  isOwnProfile, 
  profileId, 
  currentMood,
  location,
  onMessageClick 
}: ActionButtonsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  if (isOwnProfile) {
    return (
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => navigate('/my-profile')}
          className="bg-modelboard-dark hover:bg-modelboard-gray text-white"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
        <MoodUpdater 
          profileId={profileId} 
          initialMood={currentMood}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={onMessageClick}
        className="bg-modelboard-red hover:bg-red-600 text-white"
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Message
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            className="bg-modelboard-dark hover:bg-modelboard-gray text-white"
          >
            <HandshakeIcon className="h-4 w-4 mr-2" />
            Send Proposal
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-modelboard-gray text-white">
          <DialogHeader>
            <DialogTitle>Send Collaboration Proposal</DialogTitle>
          </DialogHeader>
          <CollabProposalForm
            travelPlanId=""
            receiverId={profileId}
            location={location}
            onSuccess={() => setIsDialogOpen(false)}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};