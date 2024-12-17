import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Grid, Calendar, File, Package } from "lucide-react";
import ProposalDetails from "./ProposalDetails";
import WorkflowActions from "./WorkflowActions";
import WorkflowStepItem from "./workflow/WorkflowStepItem";
import { Proposal, WorkflowStep } from "./types/workflow";

interface CollabWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal;
}

const CollabWorkflowModal = ({
  isOpen,
  onClose,
  proposal,
}: CollabWorkflowModalProps) => {
  const { toast } = useToast();
  const [steps, setSteps] = useState<WorkflowStep[]>([]);

  useEffect(() => {
    if (proposal.id) {
      fetchWorkflowSteps();
    }
  }, [proposal.id]);

  const fetchWorkflowSteps = async () => {
    const { data, error } = await supabase
      .from("collab_workflow_steps")
      .select("*")
      .eq("proposal_id", proposal.id)
      .order("created_at", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load workflow steps",
        variant: "destructive",
      });
      return;
    }

    setSteps(data || []);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[95vh] bg-modelboard-dark border-t border-modelboard-red/50">
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <DrawerTitle className="text-2xl font-bold text-gradient">
                Collaboration Workflow
              </DrawerTitle>
              <DrawerDescription className="text-sm text-gray-400">
                Manage your collaboration process step by step
              </DrawerDescription>
            </div>
            
            <Tabs defaultValue="collaborators" className="w-full md:w-auto mt-4 md:mt-0">
              <TabsList className="bg-modelboard-dark border border-modelboard-red/20">
                <TabsTrigger 
                  value="collaborators"
                  className="data-[state=active]:bg-modelboard-red/10"
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Collaborators
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule"
                  className="data-[state=active]:bg-modelboard-red/10"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </TabsTrigger>
                <TabsTrigger 
                  value="files"
                  className="data-[state=active]:bg-modelboard-red/10"
                >
                  <File className="h-4 w-4 mr-2" />
                  Project Files
                </TabsTrigger>
                <TabsTrigger 
                  value="release"
                  className="data-[state=active]:bg-modelboard-red/10"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Release Assets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="collaborators" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
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
                  
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    <h3 className="text-lg font-bold text-gradient sticky top-0 bg-modelboard-dark py-2">
                      Workflow Steps
                    </h3>
                    {steps.map((step) => (
                      <WorkflowStepItem key={step.id} step={step} />
                    ))}
                  </div>
                </div>

                <WorkflowActions
                  proposalId={proposal.id}
                  onSuccess={fetchWorkflowSteps}
                />
              </TabsContent>

              <TabsContent value="schedule" className="p-6">
                <div className="text-center text-gray-400">
                  Schedule content will be implemented here
                </div>
              </TabsContent>

              <TabsContent value="files" className="p-6">
                <div className="text-center text-gray-400">
                  Project files content will be implemented here
                </div>
              </TabsContent>

              <TabsContent value="release" className="p-6">
                <div className="text-center text-gray-400">
                  Release assets content will be implemented here
                </div>
              </TabsContent>
            </Tabs>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CollabWorkflowModal;