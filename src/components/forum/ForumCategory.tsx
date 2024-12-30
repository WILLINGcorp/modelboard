import { MessageSquare } from "lucide-react";
import { ForumChannel } from "./ForumChannel";

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
    <div className="rounded-lg glass p-4 border border-modelboard-gray animate-fadeIn">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-2xl">{category.icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gradient">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-gray-400">{category.description}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {category.forum_channels.map((channel) => (
          <ForumChannel key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  );
};