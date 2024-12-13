import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import type { Database } from "@/integrations/supabase/types";

type Message = Database["public"]["Tables"]["private_messages"]["Row"];

interface ChatAreaProps {
  selectedUser: { id: string; name: string } | null;
  currentUserId: string | null;
}

const ChatArea = ({ selectedUser, currentUserId }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedUser?.id || !currentUserId) return;
    fetchMessages(currentUserId, selectedUser.id);

    const channel = supabase
      .channel('private_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'private_messages',
          filter: `sender_id=eq.${currentUserId},receiver_id=eq.${selectedUser.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedUser?.id, currentUserId]);

  const fetchMessages = async (userId: string, partnerId: string) => {
    try {
      const { data, error } = await supabase
        .from("private_messages")
        .select("*")
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${userId})`)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentUserId || !selectedUser) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.from("private_messages").insert({
        sender_id: currentUserId,
        receiver_id: selectedUser.id,
        content,
      });

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedUser) {
    return (
      <div className="bg-modelboard-gray rounded-lg h-[600px] flex items-center justify-center">
        <p className="text-gray-400">Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="bg-modelboard-gray rounded-lg h-[600px] flex flex-col">
      <div className="p-4 border-b border-modelboard-dark">
        <h2 className="text-white font-semibold">{selectedUser.name}</h2>
      </div>
      {currentUserId && (
        <>
          <MessageList messages={messages} currentUserId={currentUserId} />
          <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default ChatArea;