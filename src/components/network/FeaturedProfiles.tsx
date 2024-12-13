import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { FeaturedProfilesGrid } from "./FeaturedProfilesGrid";

export type Profile = Database['public']['Tables']['profiles']['Row'];

export const FeaturedProfiles = () => {
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [paidAdProfiles, setPaidAdProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProfiles();
  }, []);

  const getFeaturedProfiles = async () => {
    try {
      // Get creator profiles with active ads
      const { data: activeAds } = await supabase
        .from('paid_ads')
        .select('profile_id')
        .eq('status', 'active')
        .gt('end_time', new Date().toISOString());

      const paidAdProfileIds = activeAds?.map(ad => ad.profile_id) || [];
      
      if (paidAdProfileIds.length) {
        const { data: paidProfiles } = await supabase
          .from('profiles')
          .select('*')
          .in('id', paidAdProfileIds)
          .eq('profile_type', 'content_creator');
          
        setPaidAdProfiles(paidProfiles || []);
      }

      // If we have less than 4 paid ad spots, fill with random creator profiles
      const spotsToFill = 4 - (paidAdProfileIds.length || 0);
      
      if (spotsToFill > 0) {
        const { data: randomProfiles } = await supabase
          .from('profiles')
          .select('*')
          .eq('profile_type', 'content_creator')
          .not('id', 'in', `(${paidAdProfileIds.join(',')})`)
          .limit(spotsToFill)
          .order('created_at', { ascending: false });
          
        setFeaturedProfiles(randomProfiles || []);
      } else {
        setFeaturedProfiles([]);
      }
    } catch (error) {
      console.error('Error fetching featured profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading featured profiles...</div>;
  }

  if (!featuredProfiles.length && !paidAdProfiles.length) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Ready to Collab Now</h2>
      <FeaturedProfilesGrid 
        profiles={featuredProfiles}
        paidAdProfiles={paidAdProfiles}
      />
    </div>
  );
};