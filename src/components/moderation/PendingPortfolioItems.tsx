import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

export const PendingPortfolioItems = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<string>("");

  const { data: pendingItems, isLoading } = useQuery({
    queryKey: ["pendingPortfolioItems"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("moderation_status", "pending");

      if (error) throw error;
      return data as PortfolioItem[];
    },
  });

  const moderateMutation = useMutation({
    mutationFn: async ({ itemId, status }: { itemId: string, status: 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from("portfolio_items")
        .update({
          moderation_status: status,
          moderation_comment: comment,
        })
        .eq("id", itemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingPortfolioItems"] });
      toast({
        title: "Success",
        description: "Moderation status updated",
      });
      setComment("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update moderation status",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!pendingItems?.length) {
    return <div className="text-white">No pending portfolio items to moderate.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pendingItems.map((item) => (
        <Card key={item.id} className="bg-modelboard-gray">
          <CardContent className="p-4">
            <img
              src={item.media_url}
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
              <Textarea
                placeholder="Moderation comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-modelboard-dark text-white"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 p-4">
            <Button
              onClick={() => moderateMutation.mutate({ itemId: item.id, status: 'approved' })}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
            <Button
              onClick={() => moderateMutation.mutate({ itemId: item.id, status: 'rejected' })}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Reject
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};