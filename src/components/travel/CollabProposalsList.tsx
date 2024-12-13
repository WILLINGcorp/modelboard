import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import ProposalsTable from "./ProposalsTable";

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

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Collaboration Proposals</h2>
      <ProposalsTable proposals={proposals || []} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};

export default CollabProposalsList;