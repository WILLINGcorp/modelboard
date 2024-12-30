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
      <div className="space-y-6 animate-fadeIn">
        <div className="bg-modelboard-gray rounded-xl p-6">
          <Skeleton className="h-8 w-1/4 bg-modelboard-dark" />
          <Skeleton className="h-4 w-1/2 bg-modelboard-dark mt-4" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full bg-modelboard-dark rounded-xl" />
          <Skeleton className="h-[200px] w-full bg-modelboard-dark rounded-xl" />
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="text-center py-8 bg-modelboard-gray rounded-xl">
        <p className="text-gray-400">Channel not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-modelboard-gray rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-2xl font-bold text-white">#{channel.name}</h1>
        {channel.description && (
          <p className="text-gray-400 mt-2">{channel.description}</p>
        )}
      </div>
      
      <div className="bg-modelboard-gray rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CreatePost channelId={channel.id} />
      </div>

      <div className="bg-modelboard-gray rounded-xl p-6 shadow-lg">
        <PostList channelId={channel.id} />
      </div>
    </div>
  );
};