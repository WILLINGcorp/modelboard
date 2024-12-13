import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Users, CheckSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const NotificationCards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: unreadMessages = 0 } = useQuery({
    queryKey: ["unread-messages"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return 0;

      const { count, error } = await supabase
        .from("private_messages")
        .select("*", { count: 'exact', head: true })
        .eq("receiver_id", session.session.user.id)
        .eq("read", false);

      if (error) throw error;
      return count || 0;
    },
  });

  const { data: pendingProposals = 0 } = useQuery({
    queryKey: ["pending-proposals"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return 0;

      const { count, error } = await supabase
        .from("collab_proposals")
        .select("*", { count: 'exact', head: true })
        .eq("receiver_id", session.session.user.id)
        .eq("status", "pending");

      if (error) throw error;
      return count || 0;
    },
  });

  const { data: pendingApprovals = 0, refetch: refetchApprovals } = useQuery({
    queryKey: ["pending-approvals"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return 0;

      const { count, error } = await supabase
        .from("collab_approvals")
        .select("*", { count: 'exact', head: true })
        .eq("profile_id", session.session.user.id)
        .eq("status", "pending");

      if (error) throw error;
      return count || 0;
    },
  });

  const handleApproveAll = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      const { error } = await supabase
        .from("collab_approvals")
        .update({ status: "approved" })
        .eq("profile_id", session.session.user.id)
        .eq("status", "pending");

      if (error) throw error;

      toast({
        title: "Success",
        description: "All pending approvals have been approved",
      });

      refetchApprovals();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve pending items",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card 
        className="bg-modelboard-gray hover:bg-modelboard-gray/90 transition-colors cursor-pointer"
        onClick={() => navigate("/communications")}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            New Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{unreadMessages}</p>
          <p className="text-sm text-gray-400">unread messages</p>
        </CardContent>
      </Card>

      <Card 
        className="bg-modelboard-gray hover:bg-modelboard-gray/90 transition-colors cursor-pointer"
        onClick={() => navigate("/communications")}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Pending Proposals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{pendingProposals}</p>
          <p className="text-sm text-gray-400">collaboration requests</p>
        </CardContent>
      </Card>

      <Card className="bg-modelboard-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Pending Approvals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-2xl font-bold">{pendingApprovals}</p>
            <p className="text-sm text-gray-400">workflow steps requiring approval</p>
          </div>
          {pendingApprovals > 0 && (
            <button
              onClick={handleApproveAll}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-modelboard-red hover:bg-modelboard-red/90 rounded-md transition-colors"
            >
              Approve All
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};