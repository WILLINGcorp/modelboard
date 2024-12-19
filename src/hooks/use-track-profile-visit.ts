import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useTrackProfileVisit = (profileId: string | undefined) => {
  useEffect(() => {
    const trackVisit = async () => {
      if (!profileId) return;

      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      const visitorId = session.session.user.id;
      if (visitorId === profileId) return; // Don't track self-visits

      try {
        const { error } = await supabase
          .from("profile_visits")
          .insert({
            visitor_id: visitorId,
            visited_profile_id: profileId,
          });

        if (error) {
          console.error("Error tracking profile visit:", error);
        }
      } catch (error) {
        console.error("Error tracking profile visit:", error);
      }
    };

    trackVisit();
  }, [profileId]);
};