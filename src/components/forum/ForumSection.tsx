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
        .order("order_position", { ascending: true })
        .neq('name', 'Technical Support');

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-[300px] w-full bg-modelboard-gray rounded-lg" />
        <Skeleton className="h-[300px] w-full bg-modelboard-gray rounded-lg" />
        <Skeleton className="h-[300px] w-full bg-modelboard-gray rounded-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Community Forum</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <ForumCategory key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};