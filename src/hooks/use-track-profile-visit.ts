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
        const { error } = await supabase.rpc('handle_profile_visit', {
          visitor: visitorId,
          visited: profileId
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