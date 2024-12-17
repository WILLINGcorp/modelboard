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
    <div className="space-y-6">
      {files.map((step) => (
        <div key={step.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {step.step_type.replace("Share ", "")}
          </h3>
          <div className="grid gap-4">
            {step.assets?.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between p-4 bg-modelboard-gray rounded-lg border border-modelboard-red/10 hover:border-modelboard-red/30 transition-colors"
              >
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">
                    Uploaded on {new Date(asset.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    Type: {asset.asset_type}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-modelboard-red hover:text-modelboard-red/80 hover:bg-modelboard-red/10"
                  onClick={() => onDownload(asset.asset_url, `${step.step_type.toLowerCase().replace(" ", "-")}-${asset.id}`)}
                >
                  <Download className="h-4 w-4" />
                  <span className="ml-2">Download</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};