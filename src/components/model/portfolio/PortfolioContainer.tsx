import type { Database } from "@/integrations/supabase/types";
import { PortfolioGrid } from "./PortfolioGrid";
import { usePortfolioLikes } from "../../../hooks/use-portfolio-likes";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioContainerProps {
  portfolio: PortfolioItem[];
  isOwnPortfolio: boolean;
}

export const PortfolioContainer = ({ 
  portfolio,
  isOwnPortfolio 
}: PortfolioContainerProps) => {
  const { likedItems, likeCounts, handleLike } = usePortfolioLikes(portfolio);

  return (
    <PortfolioGrid
      items={portfolio}
      likedItems={likedItems}
      likeCounts={likeCounts}
      onLike={handleLike}
    />
  );
};