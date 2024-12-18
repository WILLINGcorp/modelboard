import { TabsContent } from "@/components/ui/tabs";
import { CollaboratorsTab } from "../tabs/CollaboratorsTab";
import { ScheduleTab } from "../tabs/ScheduleTab";
import { ProjectFilesTab } from "../project-files/ProjectFilesTab";
import { ReleaseAssetsTab } from "../tabs/ReleaseAssetsTab";
import { ProServicesTab } from "../tabs/ProServicesTab";
import { ComplianceTab } from "../tabs/ComplianceTab";
import type { Proposal } from "../../types/workflow";

interface WorkflowContentProps {
  proposal: Proposal;
}

export const WorkflowContent = ({ proposal }: WorkflowContentProps) => {
  return (
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
  );
};