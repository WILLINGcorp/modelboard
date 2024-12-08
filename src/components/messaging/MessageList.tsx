import { useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Message = Database["public"]["Tables"]["private_messages"]["Row"];

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender_id === currentUserId ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex items-start space-x-2 max-w-[70%] ${
              message.sender_id === currentUserId ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div
              className={`rounded-lg p-3 ${
                message.sender_id === currentUserId
                  ? "bg-modelboard-red text-white"
                  : "bg-modelboard-gray text-white"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {formatDistanceToNow(new Date(message.created_at), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;