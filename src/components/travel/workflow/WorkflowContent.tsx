import { TabsContent } from "@/components/ui/tabs";
import { CollaboratorsTab } from "./tabs/CollaboratorsTab";
import { ScheduleTab } from "./tabs/ScheduleTab";
import { ComplianceTab } from "./tabs/ComplianceTab";
import { ProServicesTab } from "./tabs/ProServicesTab";
import { ProjectFilesTab } from "./project-files/ProjectFilesTab";
import { ReleaseAssetsTab } from "./tabs/ReleaseAssetsTab";
import type { Proposal } from "../types/workflow";

interface WorkflowContentProps {
  proposal: Proposal;
}

export const WorkflowContent = ({ proposal }: WorkflowContentProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-2 md:px-6">
      <TabsContent value="collaborators" className="mt-0">
        <CollaboratorsTab proposal={proposal} />
      </TabsContent>
      
      <TabsContent value="schedule" className="mt-0">
        <ScheduleTab proposal={proposal} />
      </TabsContent>
      
      <TabsContent value="compliance" className="mt-0">
        <ComplianceTab proposalId={proposal.id} />
      </TabsContent>
      
      <TabsContent value="proservices" className="mt-0">
        <ProServicesTab proposalId={proposal.id} />
      </TabsContent>
      
      <TabsContent value="files" className="mt-0">
        <ProjectFilesTab proposalId={proposal.id} />
      </TabsContent>
      
      <TabsContent value="release" className="mt-0">
        <ReleaseAssetsTab proposalId={proposal.id} />
      </TabsContent>
    </div>
  );
};