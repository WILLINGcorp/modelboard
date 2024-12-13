import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Database } from "@/integrations/supabase/types";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioFormFieldsProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  itemToEdit?: PortfolioItem | null;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PortfolioFormFields = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  itemToEdit,
  onFileChange,
}: PortfolioFormFieldsProps) => {
  return (
    <>
      <div>
        <label className="text-sm font-medium text-white">Title</label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          className="bg-modelboard-dark border-modelboard-gray text-white"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-white">Description</label>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
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
            onChange={onFileChange}
            className="bg-modelboard-dark border-modelboard-gray text-white"
          />
        </div>
      )}
    </>
  );
};

export default PortfolioFormFields;