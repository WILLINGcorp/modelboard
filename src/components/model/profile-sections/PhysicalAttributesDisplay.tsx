import { Ruler, Scale, Eye, Palette } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const PhysicalAttributesDisplay = ({ profile }: { profile: Profile }) => {
  const attributes = [];
  if (profile.height) attributes.push({ icon: Ruler, label: "Height", value: profile.height });
  if (profile.weight) attributes.push({ icon: Scale, label: "Weight", value: profile.weight });
  if (profile.eye_color) attributes.push({ icon: Eye, label: "Eyes", value: profile.eye_color });
  if (profile.hair_color) attributes.push({ icon: Palette, label: "Hair", value: profile.hair_color });
  
  if (attributes.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {attributes.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-2 text-gray-400">
          <Icon className="h-4 w-4" />
          <span>{label}: {value}</span>
        </div>
      ))}
    </div>
  );
};