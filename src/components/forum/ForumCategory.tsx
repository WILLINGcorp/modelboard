import { MessageSquare } from "lucide-react";
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

export const ForumCategory = ({ category }: ForumCategoryProps) => {
  return (
    <Card className="bg-modelboard-dark border-modelboard-gray/20 p-6 animate-fadeIn hover:border-modelboard-red/20 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-2xl text-modelboard-red">{category.icon}</div>
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