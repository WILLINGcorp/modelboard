import { ModelCard } from "./ModelCard";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ModelGridProps {
  profiles: Profile[];
  isOnline: (id: string) => boolean;
}

export const ModelGrid = ({ profiles, isOnline }: ModelGridProps) => {
  return (
    <div className="grid-responsive">
      {profiles.map((profile) => (
        <ModelCard 
          key={profile.id}
          profile={profile}
          isOnline={isOnline}
        />
      ))}
    </div>
  );
};