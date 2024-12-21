import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Database } from "@/integrations/supabase/types";

type ProjectMessage = Database["public"]["Tables"]["project_messages"]["Row"];

interface ProjectMessageListProps {
  proposalId: string;
  currentUserId: string;
  messages: ProjectMessage[];
}

const ProjectMessageList = ({ messages, currentUserId }: ProjectMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-2 ${
            message.sender_id === currentUserId ? "flex-row-reverse" : ""
          }`}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/creator_default_profile.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender_id === currentUserId
                ? "bg-modelboard-red text-white"
                : "bg-modelboard-gray text-white"
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs opacity-70 mt-1 block">
              {new Date(message.created_at).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ProjectMessageList;