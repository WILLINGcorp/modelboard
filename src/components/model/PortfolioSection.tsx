import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

const PortfolioSection = ({ portfolio }: PortfolioSectionProps) => {
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
      const { data: likesData } = await supabase
        .from("portfolio_likes")
        .select("portfolio_item_id")
        .in("portfolio_item_id", portfolio.map(item => item.id));

      const counts: Record<string, number> = {};
      likesData?.forEach(like => {
        counts[like.portfolio_item_id] = (counts[like.portfolio_item_id] || 0) + 1;
      });
      setLikeCounts(counts);

      // Get user's likes
      const { data: userLikes } = await supabase
        .from("portfolio_likes")
        .select("portfolio_item_id")
        .eq("profile_id", user.id)
        .in("portfolio_item_id", portfolio.map(item => item.id));

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
          .eq("portfolio_item_id", itemId)
          .eq("profile_id", user.id);

        if (error) throw error;

        setLikedItems(prev => ({ ...prev, [itemId]: false }));
        setLikeCounts(prev => ({ ...prev, [itemId]: (prev[itemId] || 1) - 1 }));
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
      toast({
        title: "Error",
        description: "Unable to process like",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">Portfolio</h2>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {portfolio.map((item) => (
          <Card
            key={item.id}
            className="bg-modelboard-gray overflow-hidden break-inside-avoid mb-6"
          >
            <img
              src={item.media_url}
              alt={item.title}
              className="w-full object-cover"
              loading="lazy"
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-300">{item.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 ${
                    likedItems[item.id] ? "text-red-500" : "text-gray-400"
                  }`}
                  onClick={() => handleLike(item.id)}
                >
                  <Heart className={`h-4 w-4 ${likedItems[item.id] ? "fill-current" : ""}`} />
                  <span>{likeCounts[item.id] || 0}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PortfolioSection;