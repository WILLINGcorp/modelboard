import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

type ProfileAnalytics = {
  views_count: number;
  unique_visitors_count: number;
  last_viewed_at: string | null;
};

export const ProfileAnalytics = () => {
  const { data: analytics } = useQuery<ProfileAnalytics>({
    queryKey: ["profile-analytics"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error("No session");

      const { data, error } = await supabase
        .from("profile_analytics")
        .select("views_count, unique_visitors_count, last_viewed_at")
        .eq("profile_id", session.session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="bg-modelboard-gray">
      <CardHeader>
        <CardTitle className="text-modelboard-red flex items-center gap-2">
          Profile Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Total Views</p>
            <p className="text-2xl font-bold text-white">
              {analytics?.views_count || 0}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Unique Visitors</p>
            <p className="text-2xl font-bold text-white">
              {analytics?.unique_visitors_count || 0}
            </p>
          </div>
        </div>
        {analytics?.last_viewed_at && (
          <p className="text-sm text-gray-400 mt-4">
            Last viewed{" "}
            {formatDistanceToNow(new Date(analytics.last_viewed_at), {
              addSuffix: true,
            })}
          </p>
        )}
      </CardContent>
    </Card>
  );
};