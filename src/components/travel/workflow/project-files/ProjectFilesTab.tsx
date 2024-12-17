import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RawFootageCard } from "./RawFootageCard";
import { PicturesCard } from "./PicturesCard";
import { FileDownload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectFilesTabProps {
  proposalId: string;
}

export const ProjectFilesTab = ({ proposalId }: ProjectFilesTabProps) => {
  const { data: files, isLoading } = useQuery({
    queryKey: ["project-files", proposalId],
    queryFn: async () => {
      const { data: steps, error } = await supabase
        .from("collab_workflow_steps")
        .select(`
          id,
          step_type,
          collab_assets (
            id,
            asset_type,
            asset_url,
            created_at
          )
        `)
        .eq("proposal_id", proposalId)
        .in("step_type", ["Share Footage", "Share Pictures"]);

      if (error) throw error;
      return steps;
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RawFootageCard proposalId={proposalId} />
        <PicturesCard proposalId={proposalId} />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Project Files</h3>
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
                  className="flex items-center justify-between p-4 bg-modelboard-dark rounded-lg border border-modelboard-red/20"
                >
                  <div>
                    <p className="text-white">{step.step_type.replace("Share ", "")}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(asset.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => handleDownload(
                      asset.asset_url,
                      `${step.step_type.toLowerCase().replace(" ", "-")}-${asset.id}`
                    )}
                  >
                    <FileDownload className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))
            ))}
          </div>
        )}
      </div>
    </div>
  );
};