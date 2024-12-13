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
import { Button } from "@/components/ui/button";
import { Workflow } from "lucide-react";
import { useState } from "react";
import CollabWorkflowModal from "./CollabWorkflowModal";

interface Proposal {
  id: string;
  status: string;
  message: string | null;
  location: string;
  created_at: string;
  sender: { id: string; display_name: string | null } | null;
  receiver: { id: string; display_name: string | null } | null;
}

interface ProposalsTableProps {
  proposals: Proposal[];
  onUpdateStatus: (proposalId: string, newStatus: string) => Promise<void>;
}

const ProposalsTable = ({ proposals, onUpdateStatus }: ProposalsTableProps) => {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  return (
    <>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-modelboard-red"
                      onClick={() => setSelectedProposal(proposal)}
                    >
                      <Workflow className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedProposal && (
        <CollabWorkflowModal
          isOpen={!!selectedProposal}
          onClose={() => setSelectedProposal(null)}
          proposal={selectedProposal}
        />
      )}
    </>
  );
};

export default ProposalsTable;