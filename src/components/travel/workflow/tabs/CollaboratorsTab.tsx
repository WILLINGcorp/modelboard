import { useState } from "react";
import { Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProposalDetails from "../../ProposalDetails";
import { Proposal } from "../../types/workflow";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CollaboratorsTabProps {
  proposal: Proposal;
}

export const CollaboratorsTab = ({ proposal }: CollaboratorsTabProps) => {
  const [isAddingCollaborator, setIsAddingCollaborator] = useState(false);

  // Fetch collaborators profiles (sender and receiver)
  const { data: collaborators } = useQuery({
    queryKey: ['collaborators', proposal.id],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .in('id', [proposal.sender_id, proposal.receiver_id]);

      if (error) throw error;
      return profiles;
    }
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Project Collaborators</h2>
          <Button 
            variant="outline" 
            className="bg-modelboard-dark hover:bg-modelboard-gray border-modelboard-red/20"
            onClick={() => setIsAddingCollaborator(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Collaborator
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collaborators?.map((profile) => (
            <Card 
              key={profile.id}
              className="p-4 bg-modelboard-dark border-modelboard-red/20 hover:border-modelboard-red/50 transition-all"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 ring-2 ring-modelboard-red ring-offset-2 ring-offset-modelboard-dark">
                  <AvatarImage 
                    src={profile.avatar_url || "/creator_default_profile.jpg"} 
                    alt={profile.display_name || "Profile"} 
                  />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">
                    {profile.display_name || "Anonymous"}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {profile.id === proposal.sender_id ? "Project Owner" : "Collaborator"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-modelboard-red/20">
        <h2 className="text-xl font-semibold text-white mb-4">Proposal Details</h2>
        <ProposalDetails
          location={proposal.location}
          status={proposal.status}
          message={proposal.message}
          senderName={collaborators?.find(p => p.id === proposal.sender_id)?.display_name || null}
          senderUsername={collaborators?.find(p => p.id === proposal.sender_id)?.username || null}
          receiverName={collaborators?.find(p => p.id === proposal.receiver_id)?.display_name || null}
          receiverUsername={collaborators?.find(p => p.id === proposal.receiver_id)?.username || null}
        />
      </div>
    </div>
  );
};