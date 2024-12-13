import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Upload, Save } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

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

      await addPortfolioItem(publicUrl);
      
      event.target.value = "";
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to upload image",
        variant: "destructive",
      });
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
      <div>
        <label className="text-sm font-medium text-white">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-modelboard-dark border-modelboard-gray text-white"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-white">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-modelboard-dark border-modelboard-gray text-white"
          rows={3}
        />
      </div>

      {!itemToEdit && (
        <div>
          <label className="text-sm font-medium text-white">Image</label>
          <Input
            type="file"
            accept="image/*"
            required
            onChange={handleFileUpload}
            className="bg-modelboard-dark border-modelboard-gray text-white"
          />
        </div>
      )}

      <div className="flex gap-2">
        <Button 
          type="submit" 
          className="flex-1 bg-modelboard-red hover:bg-red-600"
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : itemToEdit ? (
            <>
              <Save className="mr-2" />
              Update item
            </>
          ) : (
            <>
              <Plus className="mr-2" />
              Add to portfolio
            </>
          )}
        </Button>
        {itemToEdit && (
          <Button 
            type="button" 
            variant="outline"
            onClick={resetForm}
            className="bg-modelboard-dark text-white hover:bg-modelboard-gray"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default PortfolioForm;