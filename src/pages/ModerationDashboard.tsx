import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingAvatars } from "@/components/moderation/PendingAvatars";
import { PendingPortfolioItems } from "@/components/moderation/PendingPortfolioItems";
import { useToast } from "@/components/ui/use-toast";

const ModerationDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is a moderator
  const { data: isModerator, isLoading, error } = useQuery({
    queryKey: ["isModerator"],
    queryFn: async () => {
      try {
        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        console.log("Auth check:", { user, authError });
        
        if (authError) {
          console.error("Auth error:", authError);
          return false;
        }
        
        if (!user) {
          console.log("No user found - redirecting to auth");
          navigate("/auth");
          return false;
        }

        // Check if user is a moderator
        const { data, error: moderatorError } = await supabase
          .from("moderators")
          .select("id")
          .eq("id", user.id)
          .single();

        console.log("Moderator check:", { 
          userId: user.id,
          data,
          error: moderatorError,
          query: `moderators?select=id&id=eq.${user.id}`
        });

        if (moderatorError) {
          console.error("Error checking moderator status:", moderatorError);
          toast({
            title: "Error",
            description: "Failed to verify moderator status",
            variant: "destructive",
          });
          return false;
        }

        const isMod = !!data;
        console.log("Is moderator:", isMod);
        return isMod;
      } catch (error) {
        console.error("Unexpected error:", error);
        return false;
      }
    },
  });

  if (isLoading) {
    console.log("Loading moderator status...");
    return (
      <div className="min-h-screen bg-modelboard-dark p-4 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    console.error("Query error:", error);
    return (
      <div className="min-h-screen bg-modelboard-dark p-4 flex items-center justify-center">
        <div className="text-white">Error loading moderator status. Please try again.</div>
      </div>
    );
  }

  if (!isModerator) {
    console.log("Access denied - not a moderator");
    toast({
      title: "Access Denied",
      description: "You don't have moderator privileges",
      variant: "destructive",
    });
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