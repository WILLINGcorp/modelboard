import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadPortfolioImage } from "@/components/portfolio/utils/uploadUtils";

interface WorkflowStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  stepType: string;
  proposalId: string;
  onSuccess: () => void;
}

const WorkflowStepModal = ({
  isOpen,
  onClose,
  stepType,
  proposalId,
  onSuccess,
}: WorkflowStepModalProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      let data: any = {};
      
      switch (stepType) {
        case "Add Collaborator":
          data = { collaborators: collaborators.split(",").map(c => c.trim()) };
          break;
        case "Schedule Shoot":
        case "Schedule Release":
          if (!date || !time) {
            toast({
              title: "Error",
              description: "Please select both date and time",
              variant: "destructive",
            });
            return;
          }
          data = { date: date.toISOString(), time };
          break;
        case "Compliance":
          data = { description };
          break;
        case "Share Footage":
        case "Upload Promo":
        case "Upload Gallery":
        case "Upload Release":
          if (!selectedFile) {
            toast({
              title: "Error",
              description: "Please select a file to upload",
              variant: "destructive",
            });
            return;
          }
          const fileUrl = await uploadPortfolioImage(selectedFile, toast);
          if (!fileUrl) return;
          data = { fileUrl };
          break;
      }

      // Create workflow step
      const { data: stepData, error: stepError } = await supabase
        .from("collab_workflow_steps")
        .insert({
          proposal_id: proposalId,
          step_type: stepType,
          data,
        })
        .select()
        .single();

      if (stepError) throw stepError;

      // If it's a file upload step, create asset record
      if (["Share Footage", "Upload Promo", "Upload Gallery", "Upload Release"].includes(stepType) && data.fileUrl) {
        const { error: assetError } = await supabase
          .from("collab_assets")
          .insert({
            step_id: stepData.id,
            asset_type: stepType,
            asset_url: data.fileUrl,
          });

        if (assetError) throw assetError;
      }

      toast({
        title: "Success",
        description: `${stepType} step created successfully`,
      });

      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create workflow step",
        variant: "destructive",
      });
    }
  };

  const renderStepContent = () => {
    switch (stepType) {
      case "Add Collaborator":
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Enter collaborator emails (comma-separated)"
              value={collaborators}
              onChange={(e) => setCollaborators(e.target.value)}
              className="bg-modelboard-dark"
            />
          </div>
        );
      case "Schedule Shoot":
      case "Schedule Release":
        return (
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-modelboard-dark"
            />
          </div>
        );
      case "Compliance":
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Enter compliance details and requirements"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-modelboard-dark"
            />
          </div>
        );
      case "Share Footage":
      case "Upload Promo":
      case "Upload Gallery":
      case "Upload Release":
        return (
          <div className="space-y-4">
            <Input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="bg-modelboard-dark"
              accept={stepType.includes("Video") ? "video/*" : "image/*"}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-modelboard-gray">
        <DialogHeader>
          <DialogTitle className="text-white">{stepType}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {renderStepContent()}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-modelboard-red hover:bg-red-600">
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowStepModal;