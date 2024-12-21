import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollaboratorCard } from "./CollaboratorCard";
import InviteCollaboratorModal from "../collaborators/InviteCollaboratorModal";
import { useState } from "react";

interface CollaboratorsListProps {
  collaborators: any[];
  proposalId: string;
  senderId: string;
  onInviteSuccess: () => void;
}

export const CollaboratorsList = ({ 
  collaborators, 
  proposalId, 
  senderId,
  onInviteSuccess 
}: CollaboratorsListProps) => {
  const [isAddingCollaborator, setIsAddingCollaborator] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Project Collaborators</h2>
        <Button 
          variant="outline" 
          className="bg-modelboard-dark hover:bg-modelboard-gray border-modelboard-red/20"
          onClick={() => setIsAddingCollaborator(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Collaborator
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collaborators?.map((profile) => (
          <CollaboratorCard
            key={profile.id}
            profile={profile}
            role={profile.id === senderId ? "Project Owner" : "Collaborator"}
          />
        ))}
      </div>

      <InviteCollaboratorModal
        isOpen={isAddingCollaborator}
        onClose={() => setIsAddingCollaborator(false)}
        onSuccess={onInviteSuccess}
      />
    </div>
  );
};