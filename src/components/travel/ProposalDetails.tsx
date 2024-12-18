import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProjectHeader } from "./proposal/ProjectHeader";
import { LocationField } from "./proposal/LocationField";
import { StatusBadge } from "./proposal/StatusBadge";
import { DescriptionField } from "./proposal/DescriptionField";

interface ProposalDetailsProps {
  id: string;
  location: string;
  status: string;
  message: string | null;
  senderName: string | null;
  senderUsername: string | null;
  receiverName: string | null;
  receiverUsername: string | null;
  onUpdate?: () => void;
}

const ProposalDetails = ({
  id,
  location,
  status,
  message,
  senderName,
  senderUsername,
  receiverName,
  receiverUsername,
  onUpdate,
}: ProposalDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLocation, setEditedLocation] = useState(location);
  const [editedMessage, setEditedMessage] = useState(message || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("collab_proposals")
        .update({
          location: editedLocation,
          message: editedMessage,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Proposal updated successfully");
      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error updating proposal:", error);
      toast.error("Failed to update proposal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-modelboard-dark border-modelboard-red/50 hover:border-2 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-modelboard-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <ProjectHeader 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isLoading={isLoading}
        onSave={handleSave}
      />

      <div className="space-y-3 text-white relative z-10">
        <LocationField
          isEditing={isEditing}
          location={editedLocation}
          onChange={setEditedLocation}
        />
        
        <StatusBadge status={status} />
        
        <DescriptionField
          isEditing={isEditing}
          description={editedMessage}
          onChange={setEditedMessage}
        />
      </div>
    </div>
  );
};

export default ProposalDetails;