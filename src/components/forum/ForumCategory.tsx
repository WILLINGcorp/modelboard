import { MessageSquare, Users, Newspaper, Lock } from "lucide-react";
import { ForumChannel } from "./ForumChannel";
import { Card } from "@/components/ui/card";

interface ForumCategoryProps {
  category: {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    forum_channels: Array<{
      id: string;
      name: string;
      description: string | null;
      is_private: boolean;
    }>;
  };
}

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case "general discussion":
      return <MessageSquare className="w-6 h-6 text-modelboard-red" />;
    case "community":
      return <Users className="w-6 h-6 text-modelboard-red" />;
    case "announcements":
      return <Newspaper className="w-6 h-6 text-modelboard-red" />;
    default:
      return <MessageSquare className="w-6 h-6 text-modelboard-red" />;
  }
};

export const ForumCategory = ({ category }: ForumCategoryProps) => {
  return (
    <Card className="bg-modelboard-dark border-modelboard-gray/20 p-6 animate-fadeIn hover:border-modelboard-red/20 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-shrink-0">
          {getCategoryIcon(category.name)}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gradient">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-gray-400 mt-1">{category.description}</p>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {category.forum_channels.map((channel) => (
          <ForumChannel key={channel.id} channel={channel} />
        ))}
      </div>
    </Card>
  );
};