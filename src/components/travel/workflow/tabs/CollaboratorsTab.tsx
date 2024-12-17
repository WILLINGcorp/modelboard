import ProposalDetails from "../../ProposalDetails";
import { Proposal } from "../../types/workflow";

interface CollaboratorsTabProps {
  proposal: Proposal;
}

export const CollaboratorsTab = ({ proposal }: CollaboratorsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProposalDetails
        location={proposal.location}
        status={proposal.status}
        message={proposal.message}
        senderName={proposal.sender?.display_name}
        senderUsername={proposal.sender?.username}
        receiverName={proposal.receiver?.display_name}
        receiverUsername={proposal.receiver?.username}
      />
    </div>
  );
};