import { Card, CardContent } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";
import { LikeButton } from "./LikeButton";

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row'];

interface PortfolioCardProps {
  item: PortfolioItem;
  isLiked: boolean;
  likeCount: number;
  onLike: () => void;
}

export const PortfolioCard = ({ item, isLiked, likeCount, onLike }: PortfolioCardProps) => {
  const isPending = item.moderation_status === 'pending';

  return (
    <Card className="bg-modelboard-gray overflow-hidden break-inside-avoid mb-6">
      <div className="relative">
        <img
          src={item.media_url}
          alt={item.title}
          className={`w-full object-cover ${isPending ? 'blur-md' : ''}`}
          loading="lazy"
        />
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            Pending Moderation
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            {item.description && (
              <p className="text-gray-300">{item.description}</p>
            )}
          </div>
          <LikeButton 
            isLiked={isLiked} 
            likeCount={likeCount} 
            onClick={onLike} 
          />
        </div>
      </CardContent>
    </Card>
  );
};