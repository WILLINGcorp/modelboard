import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import MessagingModal from "@/components/messaging/MessagingModal";
import PortfolioForm from "@/components/portfolio/PortfolioForm";
import PortfolioItem from "@/components/portfolio/PortfolioItem";
import TravelPlansSection from "@/components/portfolio/TravelPlansSection";

type PortfolioItemType = Database['public']['Tables']['portfolio_items']['Row'];
type TravelPlan = Database['public']['Tables']['travel_plans']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

const Portfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItemType[]>([]);
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

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
        title: "Erreur",
        description: "Impossible de charger le portfolio",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingTravelPlans = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from("travel_plans")
        .select("*")
        .eq("profile_id", user.id)
        .eq("status", "upcoming")
        .order("start_date", { ascending: true });

      if (error) throw error;
      setTravelPlans(data || []);
    } catch (error) {
      console.error("Error fetching travel plans:", error);
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
        title: "Succès",
        description: "Élément supprimé du portfolio",
      });
      
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'élément",
        variant: "destructive",
      });
    }
  };

  const handleMessageClick = async (profileId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileId)
        .single();

      if (error) throw error;
      setSelectedProfile(data);
      setIsMessagingOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile information",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getPortfolioItems();
    getUpcomingTravelPlans();
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
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
          <Button
            onClick={() => handleMessageClick(items[0]?.profile_id)}
            className="bg-modelboard-red hover:bg-red-600"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Message
          </Button>
        </div>

        <TravelPlansSection travelPlans={travelPlans} />
        
        <PortfolioForm onItemAdded={getPortfolioItems} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <PortfolioItem
              key={item.id}
              item={item}
              onDelete={deletePortfolioItem}
              onMessageClick={handleMessageClick}
            />
          ))}
        </div>
      </div>

      {selectedProfile && (
        <MessagingModal
          isOpen={isMessagingOpen}
          onClose={() => {
            setIsMessagingOpen(false);
            setSelectedProfile(null);
          }}
          receiverId={selectedProfile.id}
          receiverName={selectedProfile.display_name || "User"}
        />
      )}
    </div>
  );
};

export default Portfolio;