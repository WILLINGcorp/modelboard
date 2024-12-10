import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PLATFORMS = [
  "OnlyFans",
  "JustForFans",
  "Top4Fans",
  "My.Club",
  "ManyVids",
  "Clip4Sale",
  "Fansly",
  "MYM",
  "ModelHub",
  "FapHouse",
  "FanCentro",
] as const;

interface PlatformInputProps {
  selectedPlatform: string;
  handle: string;
  availablePlatforms: string[];
  onPlatformChange: (platform: string) => void;
  onHandleChange: (handle: string) => void;
  onAdd: () => void;
}

export const PlatformInput = ({
  selectedPlatform,
  handle,
  availablePlatforms,
  onPlatformChange,
  onHandleChange,
  onAdd,
}: PlatformInputProps) => (
  <div className="flex gap-2">
    <Select value={selectedPlatform} onValueChange={onPlatformChange}>
      <SelectTrigger className="w-[200px] bg-modelboard-dark">
        <SelectValue placeholder="Select platform" />
      </SelectTrigger>
      <SelectContent>
        {availablePlatforms.map((platform) => (
          <SelectItem key={platform} value={platform}>
            {platform}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Input
      placeholder="Username"
      value={handle}
      onChange={(e) => onHandleChange(e.target.value)}
      className="bg-modelboard-dark flex-1"
    />

    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onAdd}
      disabled={!selectedPlatform || !handle}
      className="hover:bg-green-500/20 hover:text-green-500"
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);