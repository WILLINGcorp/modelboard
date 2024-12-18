import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, MapPin, Globe, MessageSquare, Ruler, Scale, Eye, Palette, HandshakeIcon, Building2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import CollabProposalForm from "@/components/travel/CollabProposalForm";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileHeaderProps {
  profile: Profile;
  onMessageClick?: () => void;
}

const ProfileHeader = ({ profile, onMessageClick }: ProfileHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMood, setCurrentMood] = useState(profile.current_mood || "");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const platforms = Array.isArray(profile.creator_platforms) 
    ? profile.creator_platforms.filter(
        (p): p is { platform: string; handle: string } => 
          typeof p === 'object' && 
          p !== null && 
          'platform' in p && 
          'handle' in p
      )
    : [];

  const socialMedia = profile.social_media as Record<string, string> || {};
  const brandsWorkedWith = (profile.brands_worked_with as string[]) || [];

  const handleMoodUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          current_mood: currentMood,
          current_mood_updated_at: new Date().toISOString()
        })
        .eq("id", profile.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Mood updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update mood",
        variant: "destructive",
      });
    }
  };

  const renderPhysicalAttributes = () => {
    const attributes = [];
    if (profile.height) attributes.push({ icon: Ruler, label: "Height", value: profile.height });
    if (profile.weight) attributes.push({ icon: Scale, label: "Weight", value: profile.weight });
    if (profile.eye_color) attributes.push({ icon: Eye, label: "Eyes", value: profile.eye_color });
    if (profile.hair_color) attributes.push({ icon: Palette, label: "Hair", value: profile.hair_color });
    
    return attributes.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {attributes.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2 text-gray-400">
            <Icon className="h-4 w-4" />
            <span>{label}: {value}</span>
          </div>
        ))}
      </div>
    ) : null;
  };

  const renderSexualPreferences = () => {
    if (!profile.sexual_orientation && !profile.preferred_role) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {profile.sexual_orientation && (
          <span className="bg-modelboard-dark px-3 py-1 rounded-full text-sm text-gray-300">
            {profile.sexual_orientation}
          </span>
        )}
        {profile.preferred_role && (
          <span className="bg-modelboard-dark px-3 py-1 rounded-full text-sm text-gray-300">
            {profile.preferred_role}
          </span>
        )}
      </div>
    );
  };

  const renderSocialMedia = () => {
    if (!Object.keys(socialMedia).length) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(socialMedia).map(([platform, handle]) => (
          <div key={platform} className="bg-modelboard-dark rounded-full px-3 py-1">
            <span className="text-white capitalize">{platform}</span>
            <span className="text-gray-400 ml-1">@{handle}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderBrandsWorkedWith = () => {
    if (!brandsWorkedWith.length) return null;

    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Brands & Studios
        </h3>
        <div className="flex flex-wrap gap-2">
          {brandsWorkedWith.map((brand, index) => (
            <span key={index} className="bg-modelboard-dark px-3 py-1 rounded-full text-sm text-gray-300">
              {brand}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-modelboard-gray rounded-lg p-8 mb-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative group">
          <Avatar className="h-48 w-48 ring-4 ring-modelboard-red ring-offset-4 ring-offset-modelboard-gray">
            <AvatarImage 
              src={profile.avatar_url || "/creator_default_profile.jpg"} 
              alt={profile.display_name || "Profile picture"}
              className="object-cover"
            />
            <AvatarFallback>
              <User className="h-24 w-24" />
            </AvatarFallback>
          </Avatar>
          {profile.gender && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-modelboard-dark px-3 py-1 rounded-full text-sm text-white">
              {profile.gender}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {profile.display_name || profile.username || "Anonymous Model"}
            </h1>
            {profile.location && (
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="h-4 w-4" />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {profile.website}
                </a>
              </div>
            )}
          </div>

          {profile.current_mood && (
            <div className="bg-modelboard-dark p-4 rounded-lg">
              <p className="text-gray-300 italic">
                "{profile.current_mood}"
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {new Date(profile.current_mood_updated_at || "").toLocaleDateString()}
              </p>
            </div>
          )}

          {profile.bio && (
            <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
          )}
          
          {renderPhysicalAttributes()}
          {renderSexualPreferences()}
          {renderBrandsWorkedWith()}
          
          {platforms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-modelboard-dark rounded-full px-3 py-1"
                >
                  <span className="text-white">{platform.platform}</span>
                  <span className="text-gray-400">@{platform.handle}</span>
                </div>
              ))}
            </div>
          )}

          {renderSocialMedia()}
        </div>

        <div className="flex flex-col gap-2 self-start">
          <Button
            onClick={onMessageClick}
            className="bg-modelboard-red hover:bg-red-600 text-white"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-modelboard-dark hover:bg-modelboard-gray text-white"
              >
                <HandshakeIcon className="h-4 w-4 mr-2" />
                Send Proposal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-modelboard-gray text-white">
              <DialogHeader>
                <DialogTitle>Send Collaboration Proposal</DialogTitle>
              </DialogHeader>
              <CollabProposalForm
                travelPlanId=""
                receiverId={profile.id}
                location={profile.location || ""}
                onSuccess={() => setIsDialogOpen(false)}
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {currentUserId === profile.id && (
            <div className="mt-4">
              <Input
                placeholder="How are you feeling? (52 chars max)"
                value={currentMood}
                onChange={(e) => setCurrentMood(e.target.value.slice(0, 52))}
                className="mb-2"
              />
              <Button 
                onClick={handleMoodUpdate}
                className="w-full bg-modelboard-dark hover:bg-modelboard-gray text-white"
              >
                Update Mood
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;