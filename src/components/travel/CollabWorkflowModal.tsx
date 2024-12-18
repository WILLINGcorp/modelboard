import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { TabsContent } from "@/components/ui/tabs";
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
  const { session } = useSession();

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
            
            <WorkflowTabs defaultValue="collaborators" />
          </DrawerHeader>

          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto">
              <TabsContent value="collaborators" className="p-6">
                <CollaboratorsTab proposal={proposal} />
              </TabsContent>

              <TabsContent value="schedule" className="p-6">
                <ScheduleTab proposal={proposal} />
              </TabsContent>

              <TabsContent value="proservices" className="p-6">
                <ProServicesTab proposalId={proposal.id} />
              </TabsContent>

              <TabsContent value="compliance" className="p-6">
                <ComplianceTab proposalId={proposal.id} />
              </TabsContent>

              <TabsContent value="files" className="p-6">
                <ProjectFilesTab proposalId={proposal.id} />
              </TabsContent>

              <TabsContent value="release" className="p-6">
                <ReleaseAssetsTab proposalId={proposal.id} />
              </TabsContent>
            </div>

            {session?.user && (
              <div className="px-6 pb-6">
                <ProjectChat proposalId={proposal.id} currentUserId={session.user.id} />
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CollabWorkflowModal;