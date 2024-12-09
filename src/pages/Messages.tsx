import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import MessagingModal from "@/components/messaging/MessagingModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Message = Database["public"]["Tables"]["private_messages"]["Row"];

const Messages = () => {
  const [conversations, setConversations] = useState<{ profile: Profile; lastMessage: Message | null }[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    getConversations();
  }, []);

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

      // Get unique conversation partners
      const conversationPartners = new Set();
      const uniqueConversations = messages?.filter(message => {
        const partnerId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
        if (conversationPartners.has(partnerId)) return false;
        conversationPartners.add(partnerId);
        return true;
      });

      // Fetch profiles for conversation partners
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

  return (
    <div className="min-h-screen bg-modelboard-dark p-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>
        
        <div className="space-y-4">
          {conversations.map(({ profile, lastMessage }) => (
            <div
              key={profile.id}
              className="bg-modelboard-gray rounded-lg p-4 cursor-pointer hover:bg-opacity-80 transition-colors"
              onClick={() => {
                setSelectedUser({
                  id: profile.id,
                  name: profile.display_name || "Anonymous User"
                });
                setIsModalOpen(true);
              }}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatar_url || undefined} />
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

        {selectedUser && (
          <MessagingModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedUser(null);
            }}
            receiverId={selectedUser.id}
            receiverName={selectedUser.name}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;