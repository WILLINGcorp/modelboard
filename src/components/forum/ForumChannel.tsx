import { MessageSquare, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

interface ForumChannelProps {
  channel: {
    id: string;
    name: string;
    description: string | null;
    is_private: boolean;
  };
}

export const ForumChannel = ({ channel }: ForumChannelProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleChannelClick = async () => {
    if (channel.is_private) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', user?.id)
        .single();

      if (profile?.subscription_status !== 'sponsor') {
        toast({
          title: "Sponsor Access Required",
          description: "This channel is only available to sponsor members.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Navigate to channel (you can implement the channel view later)
    navigate(`/forum/channels/${channel.id}`);
  };

  return (
    <div 
      onClick={handleChannelClick}
      className="flex items-center gap-3 p-3 rounded-md hover:bg-modelboard-gray/50 transition-all cursor-pointer group hover-effect"
    >
      <div className="flex-shrink-0">
        {channel.is_private ? (
          <Lock className="w-5 h-5 text-modelboard-red" />
        ) : (
          <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <h4 className={cn(
          "text-sm font-medium truncate",
          channel.is_private ? "text-modelboard-red" : "text-white"
        )}>
          #{channel.name}
        </h4>
        {channel.description && (
          <p className="text-sm text-gray-400 truncate">{channel.description}</p>
        )}
      </div>
    </div>
  );
};