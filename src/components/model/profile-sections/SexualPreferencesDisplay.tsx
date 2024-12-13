import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export const SexualPreferencesDisplay = ({ profile }: { profile: Profile }) => {
  if (!profile.sexual_orientation && !profile.preferred_role) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {profile.sexual_orientation && (
        <span className="bg-modelboard-dark px-3 py-1 rounded-full text-sm text-gray-300">
          {profile.sexual_orientation}
        </span>
      )}
      {profile.preferred_role && (
        <span className="bg-modelboard-dark px-3 py-1 rounded-full text-sm text-gray-300">
          {profile.preferred_role}
        </span>
      )}
    </div>
  );
};