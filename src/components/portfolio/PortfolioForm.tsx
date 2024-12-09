import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Upload } from "lucide-react";

interface PortfolioFormProps {
  onItemAdded: () => void;
}

const PortfolioForm = ({ onItemAdded }: PortfolioFormProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

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
      
      onItemAdded();
      (document.getElementById("portfolio-form") as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'élément",
        variant: "destructive",
      });
    }
  };

  return (
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
  );
};

export default PortfolioForm;