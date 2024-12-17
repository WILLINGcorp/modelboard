import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RawFootageCard } from "./RawFootageCard";
import { PicturesCard } from "./PicturesCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FilesList } from "./FilesList";
import { WorkflowStepWithAssets } from "./types";
import { useToast } from "@/components/ui/use-toast";

interface ProjectFilesTabProps {
  proposalId: string;
}

export const ProjectFilesTab = ({ proposalId }: ProjectFilesTabProps) => {
  const { toast } = useToast();

  const { data: files, isLoading } = useQuery({
    queryKey: ["project-files", proposalId],
    queryFn: async () => {
      // Get all workflow steps for this proposal
      const { data: steps, error: stepsError } = await supabase
        .from("collab_workflow_steps")
        .select("*")
        .eq("proposal_id", proposalId)
        .in("step_type", ["Share Footage", "Share Pictures"]);

      if (stepsError) {
        console.error("Error fetching steps:", stepsError);
        throw stepsError;
      }

      if (!steps?.length) {
        return [];
      }

      // Fetch assets for each step
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

          return {
            ...step,
            assets: assets || [],
          };
        })
      );

      return stepsWithAssets.filter(step => step.assets?.length > 0) as WorkflowStepWithAssets[];
    },
  });

  const handleDownload = async (url: string, filename: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("collab-assets")
        .createSignedUrl(url, 60); // URL valid for 60 seconds

      if (error) throw error;

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = data.signedUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Success",
        description: "File download started",
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
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