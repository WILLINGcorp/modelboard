import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProposalsTable from "./ProposalsTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CollabProposalsList = () => {
  const { toast } = useToast();

  const { data: proposals, refetch } = useQuery({
    queryKey: ["collab-proposals"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return [];

      const { data, error } = await supabase
        .from("collab_proposals")
        .select(`
          id,
          status,
          message,
          location,
          created_at,
          sender:profiles!collab_proposals_sender_id_fkey(id, display_name, username),
          receiver:profiles!collab_proposals_receiver_id_fkey(id, display_name, username)
        `)
        .or(`sender_id.eq.${session.session.user.id},receiver_id.eq.${session.session.user.id}`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleUpdateStatus = async (proposalId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("collab_proposals")
        .update({ status: newStatus })
        .eq("id", proposalId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Proposal ${newStatus}`,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update proposal status",
        variant: "destructive",
      });
    }
  };

  const filterProposalsByStatus = (status: string) => {
    return proposals?.filter(proposal => proposal.status === status) || [];
  };

  return (
    <Card className="bg-modelboard-gray border-modelboard-red/20">
      <Tabs defaultValue="all" className="w-full p-6">
        <TabsList className="grid grid-cols-5 gap-4 bg-modelboard-dark">
          <TabsTrigger value="all">All Proposals</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <ProposalsTable proposals={proposals || []} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <ProposalsTable proposals={filterProposalsByStatus('pending')} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
        
        <TabsContent value="accepted" className="mt-6">
          <ProposalsTable proposals={filterProposalsByStatus('accepted')} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-6">
          <ProposalsTable proposals={filterProposalsByStatus('rejected')} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <ProposalsTable proposals={filterProposalsByStatus('completed')} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CollabProposalsList;