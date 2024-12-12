import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PlatformTagProps {
  platform: string;
  handle: string;
  onRemove: () => void;
}

export const PlatformTag = ({ platform, handle, onRemove }: PlatformTagProps) => (
  <div className="flex items-center gap-2 bg-modelboard-gray rounded-full px-3 py-1">
    <span className="text-white">{platform}</span>
    <span className="text-gray-400">@{handle}</span>
    <Button
      variant="ghost"
      size="icon"
      className="h-5 w-5 rounded-full hover:bg-red-500/20 hover:text-white"
      onClick={onRemove}
    >
      <X className="h-3 w-3" />
    </Button>
  </div>
);