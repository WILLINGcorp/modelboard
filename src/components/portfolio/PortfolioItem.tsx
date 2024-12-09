import { Button } from "@/components/ui/button";
import { MessageCircle, Trash2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioItemProps {
  item: PortfolioItem;
  onDelete: (id: string, mediaUrl: string) => void;
  onMessageClick: (profileId: string) => void;
}

const PortfolioItem = ({ item, onDelete, onMessageClick }: PortfolioItemProps) => {
  return (
    <div className="bg-modelboard-gray rounded-lg overflow-hidden break-inside-avoid mb-6">
      <img
        src={item.media_url}
        alt={item.title}
        className="w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <p className="text-gray-400 mt-2">{item.description}</p>
        <div className="flex justify-between mt-4">
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-600"
            onClick={() => onDelete(item.id, item.media_url)}
          >
            <Trash2 className="mr-2" />
            Delete
          </Button>
          <Button
            variant="ghost"
            className="text-modelboard-red hover:text-red-600"
            onClick={() => onMessageClick(item.profile_id)}
          >
            <MessageCircle className="mr-2" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;