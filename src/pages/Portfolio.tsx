import { useEffect, useState } from "react";
import PortfolioSection from "@/components/model/PortfolioSection";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data: portfolioItems, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPortfolio(portfolioItems || []);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load portfolio items. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [toast]);

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-modelboard-red"></div>
          </div>
        ) : (
          <PortfolioSection portfolio={portfolio} />
        )}
        <SponsorFeaturedMembers />
      </div>
    </div>
  );
};

export default Portfolio;