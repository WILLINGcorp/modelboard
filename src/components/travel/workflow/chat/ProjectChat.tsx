import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import MessageList from "@/components/messaging/MessageList";
import MessageInput from "@/components/messaging/MessageInput";
import type { Database } from "@/integrations/supabase/types";

type Message = Database["public"]["Tables"]["private_messages"]["Row"];

interface ProjectChatProps {
  proposalId: string;
  currentUserId: string;
}

export const ProjectChat = ({ proposalId, currentUserId }: ProjectChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, [proposalId]);

  const fetchMessages = async () => {
    try {
      const { data: proposal } = await supabase
        .from("collab_proposals")
        .select("sender_id, receiver_id")
        .eq("id", proposalId)
        .single();

      if (!proposal) return;

      const { data } = await supabase
        .from("private_messages")
        .select("*")
        .or(`and(sender_id.eq.${proposal.sender_id},receiver_id.eq.${proposal.receiver_id}),and(sender_id.eq.${proposal.receiver_id},receiver_id.eq.${proposal.sender_id})`)
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('project_chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'private_messages',
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const { data: proposal } = await supabase
        .from("collab_proposals")
        .select("sender_id, receiver_id")
        .eq("id", proposalId)
        .single();

      if (!proposal) return;

      const receiverId = proposal.sender_id === currentUserId 
        ? proposal.receiver_id 
        : proposal.sender_id;

      await supabase.from("private_messages").insert({
        sender_id: currentUserId,
        receiver_id: receiverId,
        content,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[300px] border-t border-modelboard-dark mt-4">
      <div className="p-2 border-b border-modelboard-dark">
        <h3 className="text-sm font-medium text-white">Project Chat</h3>
      </div>
      <MessageList messages={messages} currentUserId={currentUserId} />
      <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};