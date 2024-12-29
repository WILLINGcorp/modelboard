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
      className="flex items-center gap-1 text-gray-300 hover:text-white"
      onClick={onLike}
    >
      <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
      <span>{likeCount}</span>
    </Button>
  );
};