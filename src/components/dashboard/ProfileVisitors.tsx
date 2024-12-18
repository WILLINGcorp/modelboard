import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

export const ProfileVisitors = () => {
  const navigate = useNavigate();

  const { data: visitors } = useQuery({
    queryKey: ["profile-visitors"],
    queryFn: async () => {
      const { data: visits, error } = await supabase
        .from("profile_visits")
        .select(`
          visitor_id,
          visited_at,
          profiles:visitor_id (
            display_name,
            avatar_url,
            username
          )
        `)
        .order("visited_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return visits;
    },
  });

  const handleVisitorClick = (visitorId: string) => {
    navigate(`/model/${visitorId}`);
  };

  return (
    <Card className="bg-modelboard-gray">
      <CardHeader>
        <CardTitle className="text-modelboard-red flex items-center gap-2">
          Recent Profile Visitors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {visitors?.length === 0 && (
            <p className="text-gray-400 text-sm">No recent visitors</p>
          )}
          {visitors?.map((visit) => (
            <div
              key={`${visit.visitor_id}-${visit.visited_at}`}
              className="flex items-center gap-3 cursor-pointer hover:bg-modelboard-gray/90 p-2 rounded-lg transition-colors"
              onClick={() => handleVisitorClick(visit.visitor_id)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={visit.profiles.avatar_url || undefined} />
                <AvatarFallback>
                  {visit.profiles.display_name?.[0] || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-white font-medium">
                  {visit.profiles.display_name || "Anonymous User"}
                </p>
                <p className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(visit.visited_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};