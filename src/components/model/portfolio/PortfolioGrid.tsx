import type { Database } from "@/integrations/supabase/types";
import { PortfolioCard } from "./PortfolioCard";
import { motion } from "framer-motion";

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
    <motion.div 
      className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PortfolioCard
            item={item}
            isLiked={likedItems[item.id]}
            likeCount={likeCounts[item.id] || 0}
            onLike={() => onLike(item.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};