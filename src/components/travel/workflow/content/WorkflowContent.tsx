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
    <div className="h-full overflow-y-auto">
      <TabsContent value="collaborators" className="m-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
        <CollaboratorsTab proposal={proposal} />
      </TabsContent>

      <TabsContent value="schedule" className="m-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
        <ScheduleTab proposal={proposal} />
      </TabsContent>

      <TabsContent value="proservices" className="m-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
        <ProServicesTab proposalId={proposal.id} />
      </TabsContent>

      <TabsContent value="compliance" className="m-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
        <ComplianceTab proposalId={proposal.id} />
      </TabsContent>

      <TabsContent value="files" className="m-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
        <ProjectFilesTab proposalId={proposal.id} />
      </TabsContent>

      <TabsContent value="release" className="m-0 h-full data-[state=active]:flex data-[state=active]:flex-col">
        <ReleaseAssetsTab proposalId={proposal.id} />
      </TabsContent>
    </div>
  );
};