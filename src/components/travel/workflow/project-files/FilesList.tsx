import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowStepWithAssets } from "./types";

interface FilesListProps {
  files: WorkflowStepWithAssets[];
  isLoading: boolean;
  onDownload: (url: string, filename: string) => void;
}

export const FilesList = ({ files, isLoading, onDownload }: FilesListProps) => {
  if (isLoading) {
    return <p className="text-gray-400">Loading files...</p>;
  }

  if (!files?.length) {
    return <p className="text-gray-400">No files uploaded yet</p>;
  }

  return (
    <div className="space-y-4">
      {files.map((step) =>
        step.assets?.map((asset) => (
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
              onClick={() =>
                onDownload(
                  asset.asset_url,
                  `${step.step_type.toLowerCase().replace(" ", "-")}-${asset.id}`
                )
              }
            >
              <Download className="h-4 w-4" />
              <span className="ml-2">Download</span>
            </Button>
          </div>
        ))
      )}
    </div>
  );
};