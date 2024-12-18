import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileListProps {
  files: Array<{
    id: string;
    created_at: string;
    asset_url?: string;
  }>;
  onDownload: (url: string, filename: string) => void;
}

export const FileList = ({ files, onDownload }: FileListProps) => {
  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-2 bg-modelboard-gray/50 rounded-lg"
        >
          <span className="text-sm text-gray-400">
            {new Date(file.created_at).toLocaleDateString()}
          </span>
          {file.asset_url && (
            <Button
              variant="ghost"
              size="sm"
              className="text-modelboard-red hover:text-modelboard-red/80"
              onClick={() => onDownload(file.asset_url!, `file-${file.id}`)}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};