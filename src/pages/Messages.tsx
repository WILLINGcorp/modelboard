import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import MessageList from "@/components/messaging/MessageList";
import MessageInput from "@/components/messaging/MessageInput";
import CollabProposalsList from "@/components/travel/CollabProposalsList";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Message = Database["public"]["Tables"]["private_messages"]["Row"];

const Messages = () => {
  const [conversations, setConversations] = useState<{ profile: Profile; lastMessage: Message | null }[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    getUser();
    getConversations();
  }, []);

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

  const getConversations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: messages, error: messagesError } = await supabase
        .from("private_messages")
        .select("*")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (messagesError) throw messagesError;

      const conversationPartners = new Set();
      const uniqueConversations = messages?.filter(message => {
        const partnerId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
        if (conversationPartners.has(partnerId)) return false;
        conversationPartners.add(partnerId);
        return true;
      });

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .in("id", Array.from(conversationPartners));

      if (profilesError) throw profilesError;

      const conversationsWithProfiles = uniqueConversations?.map(message => {
        const partnerId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
        const profile = profiles?.find(p => p.id === partnerId);
        return {
          profile: profile!,
          lastMessage: message
        };
      });

      setConversations(conversationsWithProfiles || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    }
  };

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

  return (
    <div className="min-h-screen bg-modelboard-dark p-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Conversations List */}
          <div className="space-y-4">
            {conversations.map(({ profile, lastMessage }) => (
              <div
                key={profile.id}
                className={`bg-modelboard-gray rounded-lg p-4 cursor-pointer hover:bg-opacity-80 transition-colors ${
                  selectedUser?.id === profile.id ? 'border-2 border-modelboard-red' : ''
                }`}
                onClick={() => {
                  setSelectedUser({
                    id: profile.id,
                    name: profile.display_name || "Anonymous User"
                  });
                }}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage 
                      src={profile.avatar_url || "/creator_default_profile.jpg"} 
                      alt={profile.display_name || "Profile picture"}
                    />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">
                      {profile.display_name || "Anonymous User"}
                    </h3>
                    {lastMessage && (
                      <p className="text-gray-400 text-sm truncate">
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2">
            {selectedUser ? (
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
            ) : (
              <div className="bg-modelboard-gray rounded-lg h-[600px] flex items-center justify-center">
                <p className="text-gray-400">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <CollabProposalsList />
        </div>
      </div>
    </div>
  );
};

export default Messages;