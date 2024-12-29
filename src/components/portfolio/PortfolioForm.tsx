import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";
import { uploadPortfolioImage } from "./utils/uploadUtils";
import PortfolioFormFields from "./components/PortfolioFormFields";
import PortfolioFormActions from "./components/PortfolioFormActions";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioFormProps {
  onItemAdded: () => void;
  itemToEdit?: PortfolioItem | null;
  onCancelEdit?: () => void;
}

const PortfolioForm = ({ onItemAdded, itemToEdit, onCancelEdit }: PortfolioFormProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description || "");
    }
  }, [itemToEdit]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const publicUrl = await uploadPortfolioImage(file, toast);
      if (publicUrl) {
        await addPortfolioItem(publicUrl);
      }
      
      event.target.value = "";
    } finally {
      setUploading(false);
    }
  };

  const addPortfolioItem = async (mediaUrl?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      if (itemToEdit) {
        const { error } = await supabase
          .from("portfolio_items")
          .update({
            title,
            description,
          })
          .eq("id", itemToEdit.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Portfolio item updated",
        });
      } else {
        if (!mediaUrl) return;
        
        const { error } = await supabase
          .from("portfolio_items")
          .insert({
            profile_id: user.id,
            title,
            description,
            media_url: mediaUrl,
            media_type: "image",
          });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Item added to portfolio",
        });
      }
      
      onItemAdded();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to save item",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form 
      id="portfolio-form" 
      className="space-y-4 bg-modelboard-gray p-6 rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        if (itemToEdit) {
          addPortfolioItem();
        }
      }}
    >
      <PortfolioFormFields
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        itemToEdit={itemToEdit}
        onFileChange={handleFileUpload}
      />
      
      <PortfolioFormActions
        uploading={uploading}
        itemToEdit={itemToEdit}
        onCancel={resetForm}
      />
    </form>
  );
};

export default PortfolioForm;