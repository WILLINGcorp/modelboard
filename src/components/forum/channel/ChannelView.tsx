import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { PostList } from "./PostList";
import { CreatePost } from "./CreatePost";

export const ChannelView = () => {
  const { channelId } = useParams();

  const { data: channel, isLoading: isLoadingChannel } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_channels")
        .select("*")
        .eq("id", channelId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoadingChannel) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4 bg-modelboard-gray" />
        <Skeleton className="h-4 w-1/2 bg-modelboard-gray" />
        <Skeleton className="h-[400px] w-full bg-modelboard-gray" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Channel not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">#{channel.name}</h1>
        {channel.description && (
          <p className="text-gray-400 mt-1">{channel.description}</p>
        )}
      </div>
      
      <CreatePost channelId={channel.id} />
      <PostList channelId={channel.id} />
    </div>
  );
};