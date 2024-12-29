import type { Database } from "@/integrations/supabase/types";
import { PortfolioCard } from "./PortfolioCard";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioGridProps {
  items: PortfolioItem[];
  likedItems: Record<string, boolean>;
  likeCounts: Record<string, number>;
  onLike: (itemId: string) => void;
}

export const PortfolioGrid = ({ 
  items, 
  likedItems, 
  likeCounts, 
  onLike 
}: PortfolioGridProps) => {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {items.map((item) => (
        <PortfolioCard
          key={item.id}
          item={item}
          isLiked={likedItems[item.id]}
          likeCount={likeCounts[item.id] || 0}
          onLike={() => onLike(item.id)}
        />
      ))}
    </div>
  );
};