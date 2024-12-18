import { Textarea } from "@/components/ui/textarea";

interface DescriptionFieldProps {
  isEditing: boolean;
  description: string;
  onChange: (value: string) => void;
}

export const DescriptionField = ({ 
  isEditing, 
  description, 
  onChange 
}: DescriptionFieldProps) => {
  return (
    <div className="pt-2 border-t border-modelboard-red/10">
      <p className="text-gray-400 mb-1">Context / Concept / Description:</p>
      {isEditing ? (
        <Textarea
          value={description}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 bg-modelboard-gray border-modelboard-red/20 focus:border-modelboard-red"
          rows={4}
        />
      ) : (
        <p className="text-sm">{description}</p>
      )}
    </div>
  );
};