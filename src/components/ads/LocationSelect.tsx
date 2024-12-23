import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  defaultLocation: string;
}

export const LocationSelect = ({ value, onChange, defaultLocation }: LocationSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">Location</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-modelboard-gray border-modelboard-gray text-white">
          <SelectValue placeholder={defaultLocation || "Select location"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Locations</SelectItem>
          <SelectItem value="los_angeles">Los Angeles</SelectItem>
          <SelectItem value="new_york">New York</SelectItem>
          <SelectItem value="miami">Miami</SelectItem>
          <SelectItem value="las_vegas">Las Vegas</SelectItem>
          <SelectItem value="london">London</SelectItem>
          <SelectItem value="paris">Paris</SelectItem>
          <SelectItem value="berlin">Berlin</SelectItem>
          <SelectItem value="tokyo">Tokyo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};