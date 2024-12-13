import { Button } from "@/components/ui/button";
import { Plus, Upload, Save } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioFormActionsProps {
  uploading: boolean;
  itemToEdit?: PortfolioItem | null;
  onCancel?: () => void;
}

const PortfolioFormActions = ({
  uploading,
  itemToEdit,
  onCancel,
}: PortfolioFormActionsProps) => {
  return (
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
          onClick={onCancel}
          className="bg-modelboard-dark text-white hover:bg-modelboard-gray"
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

export default PortfolioFormActions;