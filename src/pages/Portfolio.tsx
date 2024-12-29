import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";
import PortfolioForm from "@/components/portfolio/PortfolioForm";
import PortfolioItem from "@/components/portfolio/PortfolioItem";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";

type PortfolioItemType = Database['public']['Tables']['portfolio_items']['Row'];

const Portfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemToEdit, setItemToEdit] = useState<PortfolioItemType | null>(null);

  const getPortfolioItems = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to load portfolio",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePortfolioItem = async (id: string, mediaUrl: string) => {
    try {
      const filePath = mediaUrl.split("/").slice(-2).join("/");
      await supabase.storage
        .from("portfolio")
        .remove([filePath]);

      const { error } = await supabase
        .from("portfolio_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Item removed from portfolio",
      });
      
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to delete item",
        variant: "destructive",
      });
    }
  };

  const handleUpdateItem = (item: PortfolioItemType) => {
    setItemToEdit(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    getPortfolioItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-modelboard-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
        </div>
        
        <PortfolioForm 
          onItemAdded={() => {
            getPortfolioItems();
            setItemToEdit(null);
          }}
          itemToEdit={itemToEdit}
          onCancelEdit={() => setItemToEdit(null)}
        />

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {items.map((item) => (
            <PortfolioItem
              key={item.id}
              item={item}
              onDelete={deletePortfolioItem}
              onUpdate={handleUpdateItem}
            />
          ))}
        </div>

        <SponsorFeaturedMembers />
      </div>
    </div>
  );
};

export default Portfolio;