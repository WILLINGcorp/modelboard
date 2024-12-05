import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

const Portfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPortfolioItems();
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

  const addPortfolioItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const mediaUrl = formData.get("media_url") as string;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { error } = await supabase
        .from("portfolio_items")
        .insert({
          profile_id: user.id,
          title,
          description,
          media_url: mediaUrl,
          media_type: "image", // Pour l'instant, on ne gère que les images
        });

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Élément ajouté au portfolio",
      });
      
      getPortfolioItems();
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'élément",
        variant: "destructive",
      });
    }
  };

  const deletePortfolioItem = async (id: string) => {
    try {
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

        <form onSubmit={addPortfolioItem} className="space-y-4 bg-modelboard-gray p-6 rounded-lg">
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
            <label className="text-sm font-medium text-white">URL de l'image</label>
            <Input
              name="media_url"
              type="url"
              required
              className="bg-modelboard-dark border-modelboard-gray text-white"
            />
          </div>

          <Button type="submit" className="w-full bg-modelboard-red hover:bg-red-600">
            <Plus className="mr-2" />
            Ajouter au portfolio
          </Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-modelboard-gray rounded-lg overflow-hidden">
              <img
                src={item.media_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-400 mt-2">{item.description}</p>
                <Button
                  variant="ghost"
                  className="mt-4 text-red-500 hover:text-red-600"
                  onClick={() => deletePortfolioItem(item.id)}
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