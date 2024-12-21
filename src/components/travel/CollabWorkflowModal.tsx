import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { WorkflowTabs } from "./workflow/navigation/WorkflowTabs";
import { WorkflowHeader } from "./workflow/header/WorkflowHeader";
import { WorkflowContent } from "./workflow/content/WorkflowContent";
import { WorkflowChatSidebar } from "./workflow/chat/WorkflowChatSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Proposal } from "./types/workflow";
import { useState } from "react";

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
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("collaborators");

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[95vh] bg-modelboard-dark border-t border-modelboard-red/50">
        <div className="mx-auto w-full max-w-7xl h-full flex flex-col">
          <div className="flex-shrink-0 px-4 pt-4">
            <WorkflowHeader />
          </div>

          <div className="flex-1 min-h-0 flex flex-col px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
              <div className="flex-shrink-0 -mx-4 px-4 bg-modelboard-dark sticky top-0 z-10 py-2">
                <WorkflowTabs defaultValue={activeTab} onValueChange={setActiveTab} />
              </div>
              
              <div className="flex-1 min-h-0 mt-4">
                <div className="h-full flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <WorkflowContent proposal={proposal} />
                  </div>
                  
                  {!isMobile && (
                    <div className="w-full lg:w-80 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-modelboard-red/20 pt-4 lg:pt-0 lg:pl-4 overflow-y-auto">
                      <WorkflowChatSidebar proposalId={proposal.id} />
                    </div>
                  )}

                  <TabsContent value="chat" className="mt-0 h-full">
                    {isMobile && <WorkflowChatSidebar proposalId={proposal.id} />}
                  </TabsContent>
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