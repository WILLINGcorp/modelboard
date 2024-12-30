import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReplyProps {
  reply: any; // We'll improve this type later
}

export const Reply = ({ reply }: ReplyProps) => {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={reply.author?.avatar_url} />
        <AvatarFallback>
          {reply.author?.display_name?.[0] || reply.author?.username?.[0] || "?"}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {reply.author?.display_name || reply.author?.username}
          </span>
          <span className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-gray-300 mt-1">{reply.content}</p>
      </div>
    </div>
  );
};