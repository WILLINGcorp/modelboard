import { useState } from "react";
import { FormField } from "../form-fields/FormField";
import { PlatformTag } from "./PlatformTag";
import { PlatformInput } from "./PlatformInput";
import { PLATFORMS } from "@/constants/platforms";
import type { Json } from "@/integrations/supabase/types";

interface CreatorPlatform {
  platform: string;
  handle: string;
}

interface CreatorPlatformsFieldProps {
  value: Json[];
  onChange: (platforms: Json[]) => void;
}

export const CreatorPlatformsField = ({
  value,
  onChange,
}: CreatorPlatformsFieldProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [handle, setHandle] = useState<string>("");

  const platforms = Array.isArray(value) 
    ? (value as unknown as CreatorPlatform[]).filter(
        (p): p is CreatorPlatform => 
          typeof p === 'object' && 
          p !== null && 
          'platform' in p && 
          'handle' in p
      )
    : [];

  const handleAdd = () => {
    if (selectedPlatform && handle) {
      const newPlatform = {
        platform: selectedPlatform,
        handle,
      };
      
      onChange([...platforms, newPlatform] as unknown as Json[]);
      setSelectedPlatform("");
      setHandle("");
    }
  };

  const handleRemove = (index: number) => {
    const updatedPlatforms = platforms.filter((_, i) => i !== index);
    onChange(updatedPlatforms as unknown as Json[]);
  };

  const availablePlatforms = PLATFORMS.filter(
    (platform) => !platforms.some((p) => p.platform === platform)
  );

  return (
    <FormField label="Creator Platforms">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform, index) => (
            <PlatformTag
              key={index}
              platform={platform.platform}
              handle={platform.handle}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>

        <PlatformInput
          selectedPlatform={selectedPlatform}
          handle={handle}
          availablePlatforms={availablePlatforms}
          onPlatformChange={setSelectedPlatform}
          onHandleChange={setHandle}
          onAdd={handleAdd}
        />
      </div>
    </FormField>
  );
};