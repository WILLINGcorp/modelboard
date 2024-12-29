import { Button } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onClick: () => void;
}

export const LikeButton = ({ isLiked, likeCount, onClick }: LikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center gap-1 ${
        isLiked ? "text-red-500" : "text-gray-400"
      }`}
      onClick={onClick}
    >
      <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
      <span>{likeCount}</span>
    </Button>
  );
};