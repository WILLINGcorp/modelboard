import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Database } from "@/integrations/supabase/types";

type ProjectMessage = Database["public"]["Tables"]["project_messages"]["Row"];

interface ProjectMessageListProps {
  proposalId: string;
  currentUserId: string;
}

const ProjectMessageList = ({ proposalId, currentUserId }: ProjectMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ProjectMessageList;