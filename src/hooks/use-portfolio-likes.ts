import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

export const usePortfolioLikes = (portfolio: PortfolioItem[]) => {
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchLikes();
  }, [portfolio]);

  const fetchLikes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get like counts
      const { data: likesData, error: countError } = await supabase
        .from("portfolio_likes")
        .select("portfolio_item_id")
        .in("portfolio_item_id", portfolio.map(item => item.id));

      if (countError) throw countError;

      const counts: Record<string, number> = {};
      likesData?.forEach(like => {
        counts[like.portfolio_item_id] = (counts[like.portfolio_item_id] || 0) + 1;
      });
      setLikeCounts(counts);

      // Get user's likes
      const { data: userLikes, error: likesError } = await supabase
        .from("portfolio_likes")
        .select("portfolio_item_id")
        .eq("profile_id", user.id)
        .in("portfolio_item_id", portfolio.map(item => item.id));

      if (likesError) throw likesError;

      const liked: Record<string, boolean> = {};
      userLikes?.forEach(like => {
        liked[like.portfolio_item_id] = true;
      });
      setLikedItems(liked);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const handleLike = async (itemId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Please sign in to like items",
          variant: "destructive",
        });
        return;
      }

      if (likedItems[itemId]) {
        // Unlike
        const { error } = await supabase
          .from("portfolio_likes")
          .delete()
          .match({ 
            portfolio_item_id: itemId,
            profile_id: user.id 
          });

        if (error) throw error;

        setLikedItems(prev => ({ ...prev, [itemId]: false }));
        setLikeCounts(prev => ({ ...prev, [itemId]: Math.max((prev[itemId] || 1) - 1, 0) }));
      } else {
        // Like
        const { error } = await supabase
          .from("portfolio_likes")
          .insert({
            portfolio_item_id: itemId,
            profile_id: user.id,
          });

        if (error) throw error;

        setLikedItems(prev => ({ ...prev, [itemId]: true }));
        setLikeCounts(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
      }
    } catch (error) {
      console.error("Like error:", error);
      toast({
        title: "Error",
        description: "Unable to process like",
        variant: "destructive",
      });
    }
  };

  return {
    likedItems,
    likeCounts,
    handleLike
  };
};