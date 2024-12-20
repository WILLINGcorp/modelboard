import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingAvatars } from "./PendingAvatars";
import { PendingPortfolioItems } from "./PendingPortfolioItems";
import { FeaturedProfiles } from "./FeaturedProfiles";
import { SponsorUpgrades } from "./SponsorUpgrades";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ModerationPanel = () => {
  const navigate = useNavigate();
  
  const { data: staffProfile } = useQuery({
    queryKey: ["staffProfile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("staff_type")
        .eq("id", user.id)
        .single();

      return profile;
    },
  });

  useEffect(() => {
    if (staffProfile && !staffProfile.staff_type) {
      navigate("/dashboard");
    }
  }, [staffProfile, navigate]);

  if (!staffProfile?.staff_type) {
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Moderation Panel</h1>
      
      <Tabs defaultValue="avatars" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="avatars">Profile Pictures</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Items</TabsTrigger>
          <TabsTrigger value="featured">Featured Profiles</TabsTrigger>
          <TabsTrigger value="sponsor">Sponsor Upgrades</TabsTrigger>
        </TabsList>

        <TabsContent value="avatars">
          <PendingAvatars />
        </TabsContent>

        <TabsContent value="portfolio">
          <PendingPortfolioItems />
        </TabsContent>

        <TabsContent value="featured">
          <FeaturedProfiles />
        </TabsContent>

        <TabsContent value="sponsor">
          <SponsorUpgrades />
        </TabsContent>
      </Tabs>
    </div>
  );
};