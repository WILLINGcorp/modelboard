import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProjectChat } from "./ProjectChat";

interface WorkflowChatSidebarProps {
  proposalId: string;
}

export const WorkflowChatSidebar = ({ proposalId }: WorkflowChatSidebarProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="w-[320px] border-l border-modelboard-gray flex-shrink-0 overflow-hidden">
      <div className="h-full flex flex-col">
        {userId ? (
          <ProjectChat 
            proposalId={proposalId} 
            currentUserId={userId} 
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