import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Grid, Calendar, File, Package } from "lucide-react";
import { Proposal } from "./types/workflow";
import { CollaboratorsTab } from "./workflow/tabs/CollaboratorsTab";
import { ScheduleTab } from "./workflow/tabs/ScheduleTab";
import { ProjectFilesTab } from "./workflow/project-files/ProjectFilesTab";
import { ReleaseAssetsTab } from "./workflow/tabs/ReleaseAssetsTab";

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

              <TabsContent value="collaborators" className="p-6">
                <CollaboratorsTab proposal={proposal} />
              </TabsContent>

              <TabsContent value="schedule" className="p-6">
                <ScheduleTab proposal={proposal} />
              </TabsContent>

              <TabsContent value="files" className="p-6">
                <ProjectFilesTab proposalId={proposal.id} />
              </TabsContent>

              <TabsContent value="release" className="p-6">
                <ReleaseAssetsTab proposalId={proposal.id} />
              </TabsContent>
            </Tabs>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CollabWorkflowModal;