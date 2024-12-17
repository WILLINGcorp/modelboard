import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RawFootageCard } from "./RawFootageCard";
import { PicturesCard } from "./PicturesCard";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
      const assetsPromises = steps.map(async (step) => {
        const { data: assets, error: assetsError } = await supabase
          .from("collab_assets")
          .select("*")
          .eq("step_id", step.id)
          .order("created_at", { ascending: false });

        if (assetsError) throw assetsError;

        return {
          ...step,
          collab_assets: assets
        };
      });

      const stepsWithAssets = await Promise.all(assetsPromises);
      return stepsWithAssets;
    },
  });

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
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

  const getFileIcon = (assetType: string) => {
    return <Download className="h-4 w-4" />;
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
          {isLoading ? (
            <p className="text-gray-400">Loading files...</p>
          ) : files?.length === 0 ? (
            <p className="text-gray-400">No files uploaded yet</p>
          ) : (
            <div className="space-y-4">
              {files?.map((step) => (
                step.collab_assets?.map((asset) => (
                  <div 
                    key={asset.id}
                    className="flex items-center justify-between p-4 bg-modelboard-gray rounded-lg border border-modelboard-red/10 hover:border-modelboard-red/30 transition-colors"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {step.step_type.replace("Share ", "")}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(asset.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-modelboard-red hover:text-modelboard-red/80 hover:bg-modelboard-red/10"
                      onClick={() => handleDownload(
                        asset.asset_url,
                        `${step.step_type.toLowerCase().replace(" ", "-")}-${asset.id}`
                      )}
                    >
                      {getFileIcon(asset.asset_type)}
                      <span className="ml-2">Download</span>
                    </Button>
                  </div>
                ))
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};