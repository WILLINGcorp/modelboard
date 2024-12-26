import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdType } from "@/pages/Ads";

interface AdTypeSelectProps {
  value: AdType | "all";
  onChange: (value: AdType | "all") => void;
}

export const AdTypeSelect = ({ value, onChange }: AdTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">Ad Type</label>
      <Select value={value} onValueChange={(val: AdType | "all") => onChange(val)}>
        <SelectTrigger className="bg-modelboard-gray border-modelboard-gray text-white">
          <SelectValue placeholder="Select ad type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="filming_location">Finding a Filming Location</SelectItem>
          <SelectItem value="collaborator_replacement">Finding a Collaborator Replacement</SelectItem>
          <SelectItem value="videographer">Finding a Videographer</SelectItem>
          <SelectItem value="accommodation">Finding a Host for the Night</SelectItem>
          <SelectItem value="fixer">Finding a Fixer</SelectItem>
          <SelectItem value="special_props">Finding Special Props</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};