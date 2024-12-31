import { ModelCard } from "./ModelCard";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ModelGridProps {
  profiles: Profile[];
  isOnline: (id: string) => boolean;
}

export const ModelGrid = ({ profiles, isOnline }: ModelGridProps) => {
  // Filter for content creators only
  const contentCreators = profiles.filter(profile => 
    profile.profile_type === 'creator'
  );

  // Sort by premium status
  const sortedProfiles = [...contentCreators].sort((a, b) => {
    if (a.subscription_status === 'sponsor' && b.subscription_status !== 'sponsor') return -1;
    if (a.subscription_status !== 'sponsor' && b.subscription_status === 'sponsor') return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedProfiles.map((profile) => (
        <ModelCard 
          key={profile.id}
          profile={profile}
          isOnline={isOnline}
        />
      ))}
    </div>
  );
};