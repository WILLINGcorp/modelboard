import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import ProfileHeader from "@/components/model/ProfileHeader";
import TravelPlansSection from "@/components/model/TravelPlansSection";
import PortfolioSection from "@/components/model/PortfolioSection";
import MessagingModal from "@/components/messaging/MessagingModal";
import { useTrackProfileVisit } from "@/hooks/use-track-profile-visit";

type Profile = Database['public']['Tables']['profiles']['Row'];
type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];
type TravelPlan = Database['public']['Tables']['travel_plans']['Row'];

const ModelProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Track profile visit
  useTrackProfileVisit(id);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (!id) {
          setError("No profile ID provided");
          setLoading(false);
          return;
        }

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select()
          .match({ id })
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch portfolio items
        const { data: portfolioData, error: portfolioError } = await supabase
          .from("portfolio_items")
          .select()
          .match({ profile_id: id })
          .order("created_at", { ascending: false });

        if (portfolioError) throw portfolioError;
        setPortfolio(portfolioData);

        // Fetch upcoming travel plans
        const { data: travelData, error: travelError } = await supabase
          .from("travel_plans")
          .select()
          .match({ profile_id: id, status: 'upcoming' })
          .order("start_date", { ascending: true });

        if (travelError) throw travelError;
        setTravelPlans(travelData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    getProfileData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-modelboard-dark flex items-center justify-center px-[100px]">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-modelboard-dark flex items-center justify-center px-[100px]">
        <div className="text-white">{error || "Profile not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-modelboard-dark p-4 pt-24 px-[100px]">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader 
          profile={profile} 
          onMessageClick={() => setIsMessageModalOpen(true)}
        />
        <TravelPlansSection travelPlans={travelPlans} />
        <PortfolioSection portfolio={portfolio} />

        <MessagingModal
          isOpen={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
          receiverId={profile?.id || ""}
          receiverName={profile?.display_name || "Anonymous User"}
        />
      </div>
    </div>
  );
};

export default ModelProfile;
