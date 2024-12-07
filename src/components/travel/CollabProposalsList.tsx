import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";

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
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      proposal.status === "accepted"
                        ? "bg-green-500/20 text-green-500"
                        : proposal.status === "rejected"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-blue-500/20 text-blue-500"
                    }`}
                  >
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  {proposal.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:text-green-500"
                        onClick={() => handleUpdateStatus(proposal.id, "accepted")}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:text-red-500"
                        onClick={() => handleUpdateStatus(proposal.id, "rejected")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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