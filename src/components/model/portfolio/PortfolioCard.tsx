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
    <Card className="bg-modelboard-gray overflow-hidden break-inside-avoid mb-6 hover:shadow-xl transition-all duration-300">
      <div className="relative group">
        <img
          src={item.media_url}
          alt={item.title}
          className={`w-full object-cover transition-all duration-300 ${
            isPending ? 'blur-md' : 'group-hover:scale-105'
          }`}
          loading="lazy"
        />
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            <span className="bg-modelboard-dark px-4 py-2 rounded-full text-sm font-medium">
              Pending Moderation
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-modelboard-red transition-colors">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-gray-300 text-sm">{item.description}</p>
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