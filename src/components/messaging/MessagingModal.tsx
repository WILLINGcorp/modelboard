import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import type { Database } from "@/integrations/supabase/types";

type Message = Database["public"]["Tables"]["private_messages"]["Row"];

interface MessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiverId: string;
  receiverName: string;
}

const MessagingModal = ({
  isOpen,
  onClose,
  receiverId,
  receiverName,
}: MessagingModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
        fetchMessages(user.id);
      }
    };
    getUser();
  }, [receiverId]);

  useEffect(() => {
    if (!currentUserId) return;

    const channel = supabase
      .channel('private_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'private_messages',
          filter: `sender_id=eq.${currentUserId},receiver_id=eq.${receiverId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, receiverId]);

  const fetchMessages = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("private_messages")
        .select("*")
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
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
    if (!currentUserId) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.from("private_messages").insert({
        sender_id: currentUserId,
        receiver_id: receiverId,
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

  if (!currentUserId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col bg-modelboard-dark text-white">
        <DialogHeader>
          <DialogTitle>Chat with {receiverName}</DialogTitle>
        </DialogHeader>
        <MessageList messages={messages} currentUserId={currentUserId} />
        <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default MessagingModal;