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
      // First get the workflow steps for this proposal
      const { data: steps, error: stepsError } = await supabase
        .from("collab_workflow_steps")
        .select("*")
        .eq("proposal_id", proposalId)
        .in("step_type", ["Share Footage", "Share Pictures"]);

      if (stepsError) throw stepsError;

      // Then fetch the associated assets for each step
      const stepsWithAssets = await Promise.all(
        steps.map(async (step) => {
          const { data: assets, error: assetsError } = await supabase
            .from("collab_assets")
            .select("*")
            .eq("step_id", step.id)
            .order("created_at", { ascending: false });

          if (assetsError) throw assetsError;

          return {
            ...step,
            assets: assets || [],
          };
        })
      );

      return stepsWithAssets as WorkflowStepWithAssets[];
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