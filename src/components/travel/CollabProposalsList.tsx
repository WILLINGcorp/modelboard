import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import ProposalStatusBadge from "./ProposalStatusBadge";
import ProposalActions from "./ProposalActions";

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
          created_at,
          sender:profiles!collab_proposals_sender_id_fkey(id, display_name),
          receiver:profiles!collab_proposals_receiver_id_fkey(id, display_name)
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
      <div className="rounded-md border border-modelboard-gray">
        <Table>
          <TableHeader className="bg-modelboard-gray">
            <TableRow>
              <TableHead className="text-white">From</TableHead>
              <TableHead className="text-white">To</TableHead>
              <TableHead className="text-white">Message</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals?.map((proposal) => (
              <TableRow key={proposal.id} className="bg-modelboard-dark">
                <TableCell className="text-white">
                  {proposal.sender?.display_name || "Anonymous"}
                </TableCell>
                <TableCell className="text-white">
                  {proposal.receiver?.display_name || "Anonymous"}
                </TableCell>
                <TableCell className="text-white">{proposal.message}</TableCell>
                <TableCell className="text-white">
                  {format(new Date(proposal.created_at), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  <ProposalStatusBadge status={proposal.status} />
                </TableCell>
                <TableCell>
                  <ProposalActions
                    status={proposal.status}
                    onAccept={() => handleUpdateStatus(proposal.id, "accepted")}
                    onReject={() => handleUpdateStatus(proposal.id, "rejected")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CollabProposalsList;