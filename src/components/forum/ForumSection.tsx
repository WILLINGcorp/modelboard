import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ForumCategory } from "./ForumCategory";
import { Skeleton } from "@/components/ui/skeleton";

export const ForumSection = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["forumCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_categories")
        .select("*, forum_channels(*)")
        .order("order_position", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full bg-modelboard-gray" />
        <Skeleton className="h-20 w-full bg-modelboard-gray" />
        <Skeleton className="h-20 w-full bg-modelboard-gray" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Community Forum</h2>
      </div>
      <div className="space-y-4">
        {categories?.map((category) => (
          <ForumCategory key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};