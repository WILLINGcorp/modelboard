import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reply } from "./Reply";

interface PostProps {
  post: any; // We'll improve this type later
}

export const Post = ({ post }: PostProps) => {
  return (
    <div className="bg-modelboard-gray rounded-lg p-4 space-y-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.author?.avatar_url} />
          <AvatarFallback>
            {post.author?.display_name?.[0] || post.author?.username?.[0] || "?"}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {post.author?.display_name || post.author?.username}
            </span>
            <span className="text-sm text-gray-400">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-white mt-1">{post.title}</h3>
          <p className="text-gray-300 mt-2">{post.content}</p>
        </div>
      </div>

      {post.replies?.length > 0 && (
        <div className="pl-12 space-y-3">
          {post.replies.map((reply: any) => (
            <Reply key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
};