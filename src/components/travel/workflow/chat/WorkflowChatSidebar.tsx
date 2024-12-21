import { ProjectChat } from "./ProjectChat";
import { ProjectMessageList } from "./ProjectMessageList";

interface WorkflowChatSidebarProps {
  proposalId: string;
}

export const WorkflowChatSidebar = ({ proposalId }: WorkflowChatSidebarProps) => {
  return (
    <div className="bg-modelboard-gray rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-modelboard-dark">
        <h2 className="text-white font-semibold">Project Chat</h2>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col">
        <ProjectMessageList proposalId={proposalId} />
        <ProjectChat proposalId={proposalId} />
      </div>
    </div>
  );
};