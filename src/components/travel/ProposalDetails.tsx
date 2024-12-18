import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
      <div className="flex justify-between items-center mb-3 relative z-10">
        <h3 className="text-lg font-bold text-gradient">
          Project Details
        </h3>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-modelboard-red border-modelboard-red hover:bg-modelboard-red/10"
          >
            Edit
          </Button>
        ) : (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
              className="text-gray-400 border-gray-400 hover:bg-gray-400/10"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isLoading}
              className="text-modelboard-red border-modelboard-red hover:bg-modelboard-red/10"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-3 text-white relative z-10">
        <div className="space-y-1">
          <span className="text-gray-400">Location:</span>
          {isEditing ? (
            <Input
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
              className="mt-1 bg-modelboard-gray border-modelboard-red/20 focus:border-modelboard-red"
            />
          ) : (
            <p>{location}</p>
          )}
        </div>
        <p className="flex items-center gap-2">
          <span className="text-gray-400">Status:</span>
          <span className={cn(
            "capitalize px-2 py-1 rounded-full text-sm",
            "bg-modelboard-red/20 text-modelboard-red"
          )}>
            {status}
          </span>
        </p>
        <div className="pt-2 border-t border-modelboard-red/10">
          <p className="text-gray-400 mb-1">Context / Concept / Description:</p>
          {isEditing ? (
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="mt-1 bg-modelboard-gray border-modelboard-red/20 focus:border-modelboard-red"
              rows={4}
            />
          ) : (
            <p className="text-sm">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;