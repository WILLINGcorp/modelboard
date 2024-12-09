import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProposalStatusBadge from "./ProposalStatusBadge";
import ProposalActions from "./ProposalActions";
import MessageButton from "./MessageButton";
import type { Database } from "@/integrations/supabase/types";

type Proposal = Database["public"]["Tables"]["collab_proposals"]["Row"] & {
  sender: { id: string; display_name: string | null } | null;
  receiver: { id: string; display_name: string | null } | null;
};

interface ProposalsTableProps {
  proposals: Proposal[];
  onUpdateStatus: (proposalId: string, newStatus: string) => Promise<void>;
}

const ProposalsTable = ({ proposals, onUpdateStatus }: ProposalsTableProps) => {
  return (
    <div className="rounded-md border border-modelboard-gray">
      <Table>
        <TableHeader className="bg-modelboard-gray">
          <TableRow>
            <TableHead className="text-white">From</TableHead>
            <TableHead className="text-white">To</TableHead>
            <TableHead className="text-white">Location</TableHead>
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
              <TableCell className="text-white">{proposal.location}</TableCell>
              <TableCell className="text-white">{proposal.message}</TableCell>
              <TableCell className="text-white">
                {format(new Date(proposal.created_at), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                <ProposalStatusBadge status={proposal.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <ProposalActions
                    status={proposal.status}
                    onAccept={() => onUpdateStatus(proposal.id, "accepted")}
                    onReject={() => onUpdateStatus(proposal.id, "rejected")}
                  />
                  <MessageButton
                    receiverId={
                      proposal.sender?.id === proposal.receiver?.id
                        ? proposal.receiver.id
                        : proposal.sender?.id || ""
                    }
                    receiverName={
                      proposal.sender?.display_name ||
                      proposal.receiver?.display_name ||
                      "Anonymous"
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProposalsTable;