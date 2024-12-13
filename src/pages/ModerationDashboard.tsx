import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingAvatars } from "@/components/moderation/PendingAvatars";
import { PendingPortfolioItems } from "@/components/moderation/PendingPortfolioItems";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const ModerationDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState(null);

  // First, ensure we have a valid session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Check if user is a moderator
  const { data: isModerator, isLoading, error } = useQuery({
    queryKey: ["isModerator"],
    queryFn: async () => {
      if (!session?.user?.id) return false;

      try {
        const { data, error: moderatorError } = await supabase
          .from("moderators")
          .select("id")
          .eq("id", session.user.id)
          .single();

        console.log("Moderator check:", { 
          userId: session.user.id,
          data,
          error: moderatorError
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

        return !!data;
      } catch (error) {
        console.error("Unexpected error:", error);
        return false;
      }
    },
    enabled: !!session?.user?.id,
  });

  if (!session) {
    return null; // Let the useEffect handle the redirect
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-modelboard-dark p-4 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-modelboard-dark p-4 flex items-center justify-center">
        <div className="text-white">Error loading moderator status. Please try again.</div>
      </div>
    );
  }

  if (!isModerator) {
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