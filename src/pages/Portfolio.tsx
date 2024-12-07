import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2, Upload } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import TravelPlanCard from "@/components/travel/TravelPlanCard";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];
type TravelPlan = Database['public']['Tables']['travel_plans']['Row'];

const Portfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getPortfolioItems();
    getUpcomingTravelPlans();
  }, []);

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("portfolio")
        .getPublicUrl(filePath);

      const formData = new FormData(event.target.closest("form") as HTMLFormElement);
      await addPortfolioItem(formData, publicUrl);
      
      event.target.value = "";
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'uploader l'image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const addPortfolioItem = async (formData: FormData, mediaUrl: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("portfolio_items")
        .insert({
          profile_id: user.id,
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          media_url: mediaUrl,
          media_type: "image",
        });

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Élément ajouté au portfolio",
      });
      
      getPortfolioItems();
      (document.getElementById("portfolio-form") as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'élément",
        variant: "destructive",
      });
    }
  };

  const deletePortfolioItem = async (id: string, mediaUrl: string) => {
    try {
      // Delete the file from storage
      const filePath = mediaUrl.split("/").slice(-2).join("/");
      await supabase.storage
        .from("portfolio")
        .remove([filePath]);

      // Delete the database record
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

  if (loading) {
    return (
      <div className="min-h-screen bg-modelboard-dark flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Mon Portfolio</h1>

        {travelPlans.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Voyages à venir</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {travelPlans.map((plan) => (
                <TravelPlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        )}

        <form id="portfolio-form" className="space-y-4 bg-modelboard-gray p-6 rounded-lg">
          <div>
            <label className="text-sm font-medium text-white">Titre</label>
            <Input
              name="title"
              required
              className="bg-modelboard-dark border-modelboard-gray text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white">Description</label>
            <Textarea
              name="description"
              className="bg-modelboard-dark border-modelboard-gray text-white"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white">Image</label>
            <Input
              name="media"
              type="file"
              accept="image/*"
              required
              onChange={handleFileUpload}
              className="bg-modelboard-dark border-modelboard-gray text-white"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-modelboard-red hover:bg-red-600"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Upload en cours...
              </>
            ) : (
              <>
                <Plus className="mr-2" />
                Ajouter au portfolio
              </>
            )}
          </Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-modelboard-gray rounded-lg overflow-hidden">
              <div className="aspect-square">
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-400 mt-2">{item.description}</p>
                <Button
                  variant="ghost"
                  className="mt-4 text-red-500 hover:text-red-600"
                  onClick={() => deletePortfolioItem(item.id, item.media_url)}
                >
                  <Trash2 className="mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;