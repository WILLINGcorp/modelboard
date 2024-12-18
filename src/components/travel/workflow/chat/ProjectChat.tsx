import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import MessageInput from "@/components/messaging/MessageInput";
import ProjectMessageList from "./ProjectMessageList";
import type { Database } from "@/integrations/supabase/types";

type ProjectMessage = Database["public"]["Tables"]["project_messages"]["Row"];

interface ProjectChatProps {
  proposalId: string;
  currentUserId: string;
}

export const ProjectChat = ({ proposalId, currentUserId }: ProjectChatProps) => {
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("project_messages")
        .select("*")
        .eq("proposal_id", proposalId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("project_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "project_messages",
          filter: `proposal_id=eq.${proposalId}`,
        },
        (payload) => {
          const newMessage = payload.new as ProjectMessage;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [proposalId]);

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("project_messages").insert({
        proposal_id: proposalId,
        sender_id: currentUserId,
        content,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-modelboard-dark">
      <div className="p-4 border-b border-modelboard-gray">
        <h3 className="text-lg font-semibold text-white">Project Chat</h3>
        <p className="text-sm text-gray-400">
          Communicate with all project collaborators
        </p>
      </div>

      <ProjectMessageList
        messages={messages}
        currentUserId={currentUserId}
      />

      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};