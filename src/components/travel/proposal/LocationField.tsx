import { Input } from "@/components/ui/input";

interface LocationFieldProps {
  isEditing: boolean;
  location: string;
  onChange: (value: string) => void;
}

export const LocationField = ({ isEditing, location, onChange }: LocationFieldProps) => {
  return (
    <div className="space-y-1">
      <span className="text-gray-400">Location:</span>
      {isEditing ? (
        <Input
          value={location}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 bg-modelboard-gray border-modelboard-red/20 focus:border-modelboard-red"
        />
      ) : (
        <p>{location}</p>
      )}
    </div>
  );
};