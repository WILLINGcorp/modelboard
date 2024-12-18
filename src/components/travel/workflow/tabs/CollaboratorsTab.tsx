import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProposalDetails from "../../ProposalDetails";
import { Proposal } from "../../types/workflow";
import { CollaboratorsList } from "../collaborators/CollaboratorsList";

interface CollaboratorsTabProps {
  proposal: Proposal;
}

export const CollaboratorsTab = ({ proposal }: CollaboratorsTabProps) => {
  const { data: collaborators, refetch: refetchCollaborators } = useQuery({
    queryKey: ['collaborators', proposal.id],
    queryFn: async () => {
      const ids = [
        proposal.sender?.id,
        proposal.receiver?.id
      ].filter(Boolean) as string[];

      if (ids.length === 0) return [];

      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .in('id', ids);

      if (error) throw error;
      return profiles;
    },
    enabled: Boolean(proposal.sender?.id || proposal.receiver?.id)
  });

  return (
    <div className="space-y-8">
      <CollaboratorsList
        collaborators={collaborators || []}
        proposalId={proposal.id}
        senderId={proposal.sender?.id || ''}
        onInviteSuccess={refetchCollaborators}
      />

      <div className="pt-6 border-t border-modelboard-red/20">
        <h2 className="text-xl font-semibold text-white mb-4">Proposal Details</h2>
        <ProposalDetails
          id={proposal.id}
          location={proposal.location}
          status={proposal.status}
          message={proposal.message}
          senderName={collaborators?.find(p => p.id === proposal.sender?.id)?.display_name || null}
          senderUsername={collaborators?.find(p => p.id === proposal.sender?.id)?.username || null}
          receiverName={collaborators?.find(p => p.id === proposal.receiver?.id)?.display_name || null}
          receiverUsername={collaborators?.find(p => p.id === proposal.receiver?.id)?.username || null}
          onUpdate={refetchCollaborators}
        />
      </div>
    </div>
  );
};