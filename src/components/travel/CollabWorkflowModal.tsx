import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { Tabs } from "@/components/ui/tabs";
import { WorkflowTabs } from "./workflow/navigation/WorkflowTabs";
import { WorkflowHeader } from "./workflow/header/WorkflowHeader";
import { WorkflowContent } from "./workflow/content/WorkflowContent";
import { WorkflowChatSidebar } from "./workflow/chat/WorkflowChatSidebar";
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
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[95vh] bg-modelboard-dark border-t border-modelboard-red/50">
        <div className="mx-auto w-full max-w-7xl px-2 sm:px-4">
          <WorkflowHeader />

          <div className="flex flex-col h-[calc(95vh-120px)]">
            <Tabs defaultValue="collaborators" className="flex-1 flex flex-col">
              <div className="overflow-x-auto -mx-2 px-2 sm:overflow-visible sm:mx-0 sm:px-0">
                <WorkflowTabs />
              </div>
              
              <div className="flex flex-col lg:flex-row flex-1 overflow-hidden mt-4 gap-4">
                <div className="flex-1 overflow-y-auto px-0 sm:px-4">
                  <WorkflowContent proposal={proposal} />
                </div>
                
                <div className="w-full lg:w-80 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-modelboard-red/20 pt-4 lg:pt-0 lg:pl-4 mt-4 lg:mt-0">
                  <WorkflowChatSidebar proposalId={proposal.id} />
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