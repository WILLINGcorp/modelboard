import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ConversationList from "@/components/messaging/ConversationList";
import ChatArea from "@/components/messaging/ChatArea";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-modelboard-dark p-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Conversations List */}
          <div>
            <ConversationList
              selectedUserId={selectedUser?.id}
              onSelectUser={setSelectedUser}
            />
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2">
            <ChatArea
              selectedUser={selectedUser}
              currentUserId={currentUserId}
            />
          </div>
        </div>

        <div className="mt-12">
          <SponsorFeaturedMembers />
        </div>
      </div>
    </div>
  );
};

export default Messages;