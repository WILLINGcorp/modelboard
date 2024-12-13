import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Message = Database["public"]["Tables"]["private_messages"]["Row"];

interface ConversationListProps {
  selectedUserId?: string;
  onSelectUser: (user: { id: string; name: string }) => void;
}

const ConversationList = ({ selectedUserId, onSelectUser }: ConversationListProps) => {
  const [conversations, setConversations] = useState<{ profile: Profile; lastMessage: Message | null }[]>([]);
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

  return (
    <div className="space-y-4">
      {conversations.map(({ profile, lastMessage }) => (
        <div
          key={profile.id}
          className={`bg-modelboard-gray rounded-lg p-4 cursor-pointer hover:bg-opacity-80 transition-colors ${
            selectedUserId === profile.id ? 'border-2 border-modelboard-red' : ''
          }`}
          onClick={() => {
            onSelectUser({
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
  );
};

export default ConversationList;