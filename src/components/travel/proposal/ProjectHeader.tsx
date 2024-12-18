import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  isLoading: boolean;
  onSave: () => void;
}

export const ProjectHeader = ({ 
  isEditing, 
  setIsEditing, 
  isLoading, 
  onSave 
}: ProjectHeaderProps) => {
  return (
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
            onClick={onSave}
            disabled={isLoading}
            className="text-modelboard-red border-modelboard-red hover:bg-modelboard-red/10"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      )}
    </div>
  );
};