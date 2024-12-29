import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onLike: () => void;
}

export const LikeButton = ({ isLiked, likeCount, onLike }: LikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 text-gray-400 hover:text-white"
      onClick={onLike}
    >
      <Heart
        className={`h-4 w-4 ${isLiked ? "fill-modelboard-red text-modelboard-red" : ""}`}
      />
      <span>{likeCount}</span>
    </Button>
  );
};