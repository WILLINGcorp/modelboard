import { useSession } from "@supabase/auth-helpers-react";
import { ProjectChat } from "./ProjectChat";

interface WorkflowChatSidebarProps {
  proposalId: string;
}

export const WorkflowChatSidebar = ({ proposalId }: WorkflowChatSidebarProps) => {
  const session = useSession();

  return (
    <div className="w-[320px] border-l border-modelboard-gray flex-shrink-0 overflow-hidden">
      <div className="h-full flex flex-col">
        {session?.user ? (
          <ProjectChat 
            proposalId={proposalId} 
            currentUserId={session.user.id} 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Please sign in to use the project chat
          </div>
        )}
      </div>
    </div>
  );
};