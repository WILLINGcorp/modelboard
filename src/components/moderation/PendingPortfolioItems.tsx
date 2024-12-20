import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export const PendingPortfolioItems = () => {
  const { data: pendingItems, refetch } = useQuery({
    queryKey: ["pendingPortfolioItems"],
    queryFn: async () => {
      const { data } = await supabase
        .from("portfolio_items")
        .select(`
          id,
          title,
          media_url,
          profiles (
            display_name
          )
        `)
        .eq("moderation_status", "pending");
      return data || [];
    },
  });

  const handleModeration = async (itemId: string, approved: boolean) => {
    const { error } = await supabase
      .from("portfolio_items")
      .update({
        moderation_status: approved ? "approved" : "rejected",
        moderation_comment: approved ? null : "Content rejected by moderator",
      })
      .eq("id", itemId);

    if (error) {
      toast.error("Failed to moderate item");
      return;
    }

    toast.success(`Item ${approved ? "approved" : "rejected"}`);
    refetch();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pendingItems?.map((item: any) => (
        <div key={item.id} className="bg-modelboard-gray p-6 rounded-lg">
          <img
            src={item.media_url}
            alt={item.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400 mb-4">
            By {item.profiles?.display_name || "Anonymous User"}
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => handleModeration(item.id, true)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2" /> Approve
            </Button>
            <Button
              onClick={() => handleModeration(item.id, false)}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <X className="mr-2" /> Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};