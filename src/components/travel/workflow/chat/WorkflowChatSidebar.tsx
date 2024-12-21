import { ProjectChat } from "./ProjectChat";
import ProjectMessageList from "./ProjectMessageList";
import { useAuth } from "@/hooks/use-auth";

interface WorkflowChatSidebarProps {
  proposalId: string;
}

export const WorkflowChatSidebar = ({ proposalId }: WorkflowChatSidebarProps) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-modelboard-gray rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-modelboard-dark">
        <h2 className="text-white font-semibold">Project Chat</h2>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col">
        <ProjectMessageList proposalId={proposalId} currentUserId={user.id} />
        <ProjectChat proposalId={proposalId} currentUserId={user.id} />
      </div>
    </div>
  );
};