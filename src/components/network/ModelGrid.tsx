import { ModelCard } from "./ModelCard";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ModelGridProps {
  profiles: Profile[];
  isOnline: (id: string) => boolean;
}

export const ModelGrid = ({ profiles, isOnline }: ModelGridProps) => {
  // Add console.log to debug isOnline
  console.log("ModelGrid isOnline:", isOnline);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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