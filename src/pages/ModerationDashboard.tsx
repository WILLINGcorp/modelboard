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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setIsInitialized(true);

      if (!currentSession) {
        navigate("/auth");
        return;
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: isModerator, isLoading } = useQuery({
    queryKey: ["isModerator", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return false;

      const { data, error } = await supabase
        .from("moderators")
        .select("id")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error checking moderator status:", error);
        return false;
      }

      return !!data;
    },
    enabled: !!session?.user?.id,
    staleTime: 30000, // Cache the result for 30 seconds
    retry: false,
  });

  // Wait for auth initialization before rendering
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-modelboard-dark p-4 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Don't show anything while checking auth
  if (!session) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-modelboard-dark p-4 flex items-center justify-center">
        <div className="text-white">Loading...</div>
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