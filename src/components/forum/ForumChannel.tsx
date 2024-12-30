import { MessageSquare, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

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
    
    navigate(`/forum/channels/${channel.id}`);
  };

  return (
    <Card 
      onClick={handleChannelClick}
      className={cn(
        "bg-modelboard-dark border-modelboard-gray/20 hover:border-modelboard-red/50",
        "transition-all duration-300 cursor-pointer group"
      )}
    >
      <div className="p-4 flex items-center gap-4">
        <div className="flex-shrink-0">
          {channel.is_private ? (
            <Lock className="w-5 h-5 text-modelboard-red" />
          ) : (
            <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h4 className={cn(
            "text-base font-medium truncate",
            channel.is_private ? "text-modelboard-red" : "text-white"
          )}>
            #{channel.name}
          </h4>
          {channel.description && (
            <p className="text-sm text-gray-400 truncate mt-1">{channel.description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};