import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { PortfolioHeader } from "./portfolio/PortfolioHeader";
import { PortfolioContainer } from "./portfolio/PortfolioContainer";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

const PortfolioSection = ({ portfolio }: PortfolioSectionProps) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const isOwnPortfolio = portfolio.length > 0 && portfolio[0].profile_id === currentUserId;

  return (
    <>
      <PortfolioHeader isOwnPortfolio={isOwnPortfolio} />
      <PortfolioContainer 
        portfolio={portfolio}
        isOwnPortfolio={isOwnPortfolio}
      />
    </>
  );
};

export default PortfolioSection;