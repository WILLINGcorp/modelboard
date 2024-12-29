import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import PortfolioForm from "@/components/portfolio/PortfolioForm";
import PortfolioItem from "@/components/portfolio/PortfolioItem";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

const MyPortfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToEdit, setItemToEdit] = useState<PortfolioItem | null>(null);
  const { toast } = useToast();

  const fetchPortfolio = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: portfolioItems, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolio(portfolioItems || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load portfolio items",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleDelete = async (id: string, mediaUrl: string) => {
    try {
      // Delete from storage first
      const fileName = mediaUrl.split('/').pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from('portfolio')
          .remove([fileName]);

        if (storageError) throw storageError;
      }

      // Then delete from database
      const { error: dbError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Portfolio item deleted",
      });

      fetchPortfolio();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete item",
      });
    }
  };

  const handleUpdate = (item: PortfolioItem) => {
    setItemToEdit(item);
  };

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-modelboard-gray rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">My Portfolio</h2>
          <PortfolioForm
            onItemAdded={fetchPortfolio}
            itemToEdit={itemToEdit}
            onCancelEdit={() => setItemToEdit(null)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-modelboard-red"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {portfolio.map((item) => (
              <PortfolioItem
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPortfolio;