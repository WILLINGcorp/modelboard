import { MessageSquare, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ForumChannelProps {
  channel: {
    id: string;
    name: string;
    description: string | null;
    is_private: boolean;
  };
}

export const ForumChannel = ({ channel }: ForumChannelProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md hover:bg-modelboard-gray transition-colors cursor-pointer group">
      <div className="flex-shrink-0">
        {channel.is_private ? (
          <Lock className="w-5 h-5 text-red-500" />
        ) : (
          <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <h4 className={cn(
          "text-sm font-medium truncate",
          channel.is_private ? "text-red-500" : "text-white"
        )}>
          #{channel.name}
        </h4>
        {channel.description && (
          <p className="text-sm text-gray-400 truncate">{channel.description}</p>
        )}
      </div>
    </div>
  );
};