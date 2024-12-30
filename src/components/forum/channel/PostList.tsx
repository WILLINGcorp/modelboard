import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Post } from "./Post";

interface PostListProps {
  channelId: string;
}

export const PostList = ({ channelId }: PostListProps) => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", channelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_posts")
        .select(`
          *,
          author:profiles(id, display_name, username, avatar_url),
          replies:forum_replies(
            id,
            content,
            created_at,
            author:profiles(id, display_name, username, avatar_url)
          )
        `)
        .eq("channel_id", channelId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full bg-modelboard-gray" />
        <Skeleton className="h-32 w-full bg-modelboard-gray" />
        <Skeleton className="h-32 w-full bg-modelboard-gray" />
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No posts yet. Be the first to post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};