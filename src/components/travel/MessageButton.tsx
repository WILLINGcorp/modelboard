import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import MessagingModal from "@/components/messaging/MessagingModal";

interface MessageButtonProps {
  receiverId: string;
  receiverName: string;
}

const MessageButton = ({ receiverId, receiverName }: MessageButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="ml-2"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>

      <MessagingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        receiverId={receiverId}
        receiverName={receiverName}
      />
    </>
  );
};

export default MessageButton;