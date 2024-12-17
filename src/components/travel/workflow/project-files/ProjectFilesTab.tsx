import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RawFootageCard } from "./RawFootageCard";
import { PicturesCard } from "./PicturesCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FilesList } from "./FilesList";
import { WorkflowStepWithAssets } from "./types";

interface ProjectFilesTabProps {
  proposalId: string;
}

export const ProjectFilesTab = ({ proposalId }: ProjectFilesTabProps) => {
  const { data: files, isLoading } = useQuery({
    queryKey: ["project-files", proposalId],
    queryFn: async () => {
      console.log("Fetching files for proposal:", proposalId);
      
      // First get the workflow steps for this proposal that are completed
      const { data: steps, error: stepsError } = await supabase
        .from("collab_workflow_steps")
        .select("*")
        .eq("proposal_id", proposalId)
        .eq("status", "completed")
        .in("step_type", ["Share Footage", "Share Pictures"]);

      if (stepsError) {
        console.error("Error fetching steps:", stepsError);
        throw stepsError;
      }

      console.log("Found workflow steps:", steps);

      if (!steps?.length) {
        console.log("No completed workflow steps found");
        return [];
      }

      // Then fetch the associated assets for each step
      const stepsWithAssets = await Promise.all(
        steps.map(async (step) => {
          const { data: assets, error: assetsError } = await supabase
            .from("collab_assets")
            .select("id, asset_type, asset_url, created_at")
            .eq("step_id", step.id);

          if (assetsError) {
            console.error("Error fetching assets for step:", step.id, assetsError);
            throw assetsError;
          }

          console.log("Found assets for step:", step.id, assets);

          return {
            ...step,
            assets: assets || [],
          };
        })
      );

      // Filter out steps with no assets
      const filteredSteps = stepsWithAssets.filter(step => step.assets?.length > 0);
      console.log("Final filtered steps with assets:", filteredSteps);
      
      return filteredSteps as WorkflowStepWithAssets[];
    },
  });

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RawFootageCard proposalId={proposalId} />
        <PicturesCard proposalId={proposalId} />
      </div>

      <Card className="bg-modelboard-dark border border-modelboard-red/20">
        <CardHeader>
          <CardTitle className="text-white">Project Files</CardTitle>
        </CardHeader>
        <CardContent>
          <FilesList
            files={files || []}
            isLoading={isLoading}
            onDownload={handleDownload}
          />
        </CardContent>
      </Card>
    </div>
  );
};