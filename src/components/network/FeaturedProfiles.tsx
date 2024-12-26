import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { FeaturedProfilesGrid } from "./FeaturedProfilesGrid";
import { PurchaseFeaturedSpot } from "./featured/PurchaseFeaturedSpot";

export type Profile = Database['public']['Tables']['profiles']['Row'];

export const FeaturedProfiles = () => {
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [paidAdProfiles, setPaidAdProfiles] = useState<Profile[]>([]);
  const [randomProfiles, setRandomProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProfiles();
  }, []);

  const getFeaturedProfiles = async () => {
    try {
      // Get featured profiles
      const { data: featuredData } = await supabase
        .from('featured_profiles')
        .select('profile_id')
        .gt('end_time', new Date().toISOString());

      const featuredProfileIds = featuredData?.map(fp => fp.profile_id) || [];
      
      if (featuredProfileIds.length) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('*')
          .in('id', featuredProfileIds);
          
        setFeaturedProfiles(profiles || []);
      }

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

      // If we don't have enough featured profiles, get random ones to fill the row
      const totalFeaturedCount = (featuredProfileIds.length + paidAdProfileIds.length);
      if (totalFeaturedCount < 4) {
        const excludeIds = [...featuredProfileIds, ...paidAdProfileIds];
        const { data: randomProfilesData } = await supabase
          .from('profiles')
          .select('*')
          .not('id', 'in', `(${excludeIds.join(',')})`)
          .limit(4 - totalFeaturedCount)
          .order('created_at', { ascending: false });

        setRandomProfiles(randomProfilesData || []);
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

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Featured Profiles</h2>
        <PurchaseFeaturedSpot />
      </div>
      <FeaturedProfilesGrid 
        profiles={featuredProfiles}
        paidAdProfiles={paidAdProfiles}
        randomProfiles={randomProfiles}
      />
    </div>
  );
};