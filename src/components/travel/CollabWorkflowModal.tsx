import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useSession } from "@supabase/auth-helpers-react";
import { WorkflowTabs } from "./workflow/navigation/WorkflowTabs";
import { ProjectChat } from "./workflow/chat/ProjectChat";
import { CollaboratorsTab } from "./workflow/tabs/CollaboratorsTab";
import { ScheduleTab } from "./workflow/tabs/ScheduleTab";
import { ProjectFilesTab } from "./workflow/project-files/ProjectFilesTab";
import { ReleaseAssetsTab } from "./workflow/tabs/ReleaseAssetsTab";
import { ProServicesTab } from "./workflow/tabs/ProServicesTab";
import { ComplianceTab } from "./workflow/tabs/ComplianceTab";
import type { Proposal } from "./types/workflow";

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
  const session = useSession();

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[95vh] bg-modelboard-dark border-t border-modelboard-red/50">
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <DrawerTitle className="text-2xl font-bold text-gradient">
                Collaboration Workflow
              </DrawerTitle>
              <DrawerDescription className="text-sm text-gray-400">
                Manage your collaboration process step by step
              </DrawerDescription>
            </div>
          </DrawerHeader>

          <div className="flex flex-col h-[calc(95vh-120px)]">
            <Tabs defaultValue="collaborators" className="flex-1 flex flex-col">
              <WorkflowTabs />
              
              <div className="flex flex-1 overflow-hidden mt-4">
                {/* Main Content Area */}
                <div className="flex-1 overflow-auto pr-4">
                  <TabsContent value="collaborators" className="m-0 h-full">
                    <CollaboratorsTab proposal={proposal} />
                  </TabsContent>

                  <TabsContent value="schedule" className="m-0 h-full">
                    <ScheduleTab proposal={proposal} />
                  </TabsContent>

                  <TabsContent value="proservices" className="m-0 h-full">
                    <ProServicesTab proposalId={proposal.id} />
                  </TabsContent>

                  <TabsContent value="compliance" className="m-0 h-full">
                    <ComplianceTab proposalId={proposal.id} />
                  </TabsContent>

                  <TabsContent value="files" className="m-0 h-full">
                    <ProjectFilesTab proposalId={proposal.id} />
                  </TabsContent>

                  <TabsContent value="release" className="m-0 h-full">
                    <ReleaseAssetsTab proposalId={proposal.id} />
                  </TabsContent>
                </div>

                {/* Project Chat Sidebar */}
                <div className="w-[320px] border-l border-modelboard-gray flex-shrink-0 overflow-hidden">
                  <div className="h-full flex flex-col">
                    {session?.user ? (
                      <ProjectChat 
                        proposalId={proposal.id} 
                        currentUserId={session.user.id} 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        Please sign in to use the project chat
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CollabWorkflowModal;