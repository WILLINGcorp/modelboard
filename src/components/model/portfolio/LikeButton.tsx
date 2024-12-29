import { Button } from "@/components/ui/button";
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
      className={`flex items-center gap-1 transition-colors duration-200 ${
        isLiked ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-300"
      }`}
      onClick={onClick}
    >
      <Heart className={`h-4 w-4 transition-all duration-200 ${isLiked ? "fill-current scale-110" : "scale-100"}`} />
      <span className="font-medium">{likeCount}</span>
    </Button>
  );
};