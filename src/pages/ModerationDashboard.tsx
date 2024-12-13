import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingAvatars } from "@/components/moderation/PendingAvatars";
import { PendingPortfolioItems } from "@/components/moderation/PendingPortfolioItems";

const ModerationDashboard = () => {
  const navigate = useNavigate();

  // Check if user is a moderator
  const { data: isModerator, isLoading } = useQuery({
    queryKey: ["isModerator"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return false;
      }

      const { data } = await supabase
        .from("moderators")
        .select("id")
        .eq("id", user.id)
        .single();

      return !!data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isModerator) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Moderation Dashboard</h1>
        
        <Tabs defaultValue="avatars" className="w-full">
          <TabsList className="bg-modelboard-gray">
            <TabsTrigger value="avatars">Profile Pictures</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Items</TabsTrigger>
          </TabsList>
          <TabsContent value="avatars">
            <PendingAvatars />
          </TabsContent>
          <TabsContent value="portfolio">
            <PendingPortfolioItems />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModerationDashboard;