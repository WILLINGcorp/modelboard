import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface CurrentMoodProps {
  profile: Profile;
}

export const CurrentMood = ({ profile }: CurrentMoodProps) => {
  if (!profile.current_mood) return null;

  return (
    <div className="bg-modelboard-dark p-4 rounded-lg">
      <p className="text-gray-300 italic">
        "{profile.current_mood}"
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Last updated: {new Date(profile.current_mood_updated_at || "").toLocaleDateString()}
      </p>
    </div>
  );
};