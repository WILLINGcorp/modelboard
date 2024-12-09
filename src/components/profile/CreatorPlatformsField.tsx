import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PLATFORMS = [
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
];

interface CreatorPlatform {
  platform: string;
  handle: string;
}

interface CreatorPlatformsFieldProps {
  value: CreatorPlatform[];
  onChange: (platforms: CreatorPlatform[]) => void;
}

export const CreatorPlatformsField = ({
  value,
  onChange,
}: CreatorPlatformsFieldProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [handle, setHandle] = useState<string>("");

  const handleAdd = () => {
    if (selectedPlatform && handle) {
      onChange([...value, { platform: selectedPlatform, handle }]);
      setSelectedPlatform("");
      setHandle("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const availablePlatforms = PLATFORMS.filter(
    (platform) => !value.some((p) => p.platform === platform)
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {value.map((platform, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-modelboard-gray rounded-full px-3 py-1"
          >
            <span className="text-white">{platform.platform}</span>
            <span className="text-gray-400">@{platform.handle}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full hover:bg-red-500/20 hover:text-red-500"
              onClick={() => handleRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Select
          value={selectedPlatform}
          onValueChange={setSelectedPlatform}
        >
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
          onChange={(e) => setHandle(e.target.value)}
          className="bg-modelboard-dark flex-1"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleAdd}
          disabled={!selectedPlatform || !handle}
          className="hover:bg-green-500/20 hover:text-green-500"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};