import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useSession } from "@supabase/auth-helpers-react";
import { Proposal } from "./types/workflow";
import { WorkflowTabs } from "./workflow/navigation/WorkflowTabs";
import { ProjectChat } from "./workflow/chat/ProjectChat";
import { CollaboratorsTab } from "./workflow/tabs/CollaboratorsTab";
import { ScheduleTab } from "./workflow/tabs/ScheduleTab";
import { ProjectFilesTab } from "./workflow/project-files/ProjectFilesTab";
import { ReleaseAssetsTab } from "./workflow/tabs/ReleaseAssetsTab";
import { ProServicesTab } from "./workflow/tabs/ProServicesTab";
import { ComplianceTab } from "./workflow/tabs/ComplianceTab";

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
          </DrawerHeader>

          <div className="flex flex-col h-[calc(95vh-120px)]">
            <Tabs defaultValue="collaborators" className="flex-1 flex flex-col h-full">
              <WorkflowTabs />
              
              <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-auto">
                  <TabsContent value="collaborators" className="p-6 m-0 h-full">
                    <CollaboratorsTab proposal={proposal} />
                  </TabsContent>

                  <TabsContent value="schedule" className="p-6 m-0 h-full">
                    <ScheduleTab proposal={proposal} />
                  </TabsContent>

                  <TabsContent value="proservices" className="p-6 m-0 h-full">
                    <ProServicesTab proposalId={proposal.id} />
                  </TabsContent>

                  <TabsContent value="compliance" className="p-6 m-0 h-full">
                    <ComplianceTab proposalId={proposal.id} />
                  </TabsContent>

                  <TabsContent value="files" className="p-6 m-0 h-full">
                    <ProjectFilesTab proposalId={proposal.id} />
                  </TabsContent>

                  <TabsContent value="release" className="p-6 m-0 h-full">
                    <ReleaseAssetsTab proposalId={proposal.id} />
                  </TabsContent>
                </div>

                {session?.user && (
                  <div className="w-80 border-l border-modelboard-dark">
                    <div className="h-full">
                      <ProjectChat proposalId={proposal.id} currentUserId={session.user.id} />
                    </div>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CollabWorkflowModal;