import { TextFormField } from "../form-fields/TextFormField";
import { TextareaFormField } from "../form-fields/TextareaFormField";
import { SelectFormField } from "../form-fields/SelectFormField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface BasicInfoSectionProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

const SOCIAL_MEDIA_PLATFORMS = [
  { id: "twitter", label: "X (Twitter)" },
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "snapchat", label: "Snapchat" },
  { id: "facebook", label: "Facebook" },
  { id: "bluesky", label: "BlueSky" },
];

export const BasicInfoSection = ({ profile, onProfileUpdate }: BasicInfoSectionProps) => {
  const { toast } = useToast();
  const socialMedia = (profile.social_media as Record<string, string>) || {};

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${profile.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onProfileUpdate({
        ...profile,
        avatar_url: publicUrl,
        avatar_moderation_status: 'pending'
      });

      toast({
        title: "Success",
        description: "Avatar uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
    }
  };

  const handleSocialMediaChange = (platform: string, handle: string) => {
    const updatedSocialMedia = { ...socialMedia, [platform]: handle };
    onProfileUpdate({ ...profile, social_media: updatedSocialMedia });
  };

  const getProfileTypeLabel = (type: string | null) => {
    switch (type) {
      case 'producer':
        return 'Indie Producer';
      case 'creator':
        return 'Content Creator';
      case 'studio':
        return 'Studio Executive';
      default:
        return 'Unknown Type';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar className="h-32 w-32 ring-4 ring-modelboard-red ring-offset-4 ring-offset-modelboard-gray">
            <AvatarImage 
              src={profile.avatar_url || "/creator_default_profile.jpg"} 
              alt={profile.display_name || "Profile picture"}
              className={profile.avatar_moderation_status === 'pending' ? 'blur-md' : ''}
            />
            <AvatarFallback>
              <User className="h-16 w-16" />
            </AvatarFallback>
          </Avatar>
          <Badge 
            variant="secondary" 
            className="absolute -top-2 right-0 bg-modelboard-dark text-white"
          >
            {getProfileTypeLabel(profile.profile_type)}
          </Badge>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            className="bg-modelboard-dark hover:bg-modelboard-gray text-white"
            onClick={() => document.getElementById('avatar-upload')?.click()}
          >
            Upload New Avatar
          </Button>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
          {profile.avatar_moderation_status === 'pending' && (
            <p className="text-sm text-yellow-500">Avatar pending moderation</p>
          )}
        </div>
      </div>

      <TextFormField
        label="Username"
        value={profile.username || ""}
        onChange={(value) => onProfileUpdate({ ...profile, username: value })}
      />

      <TextFormField
        label="Display Name"
        value={profile.display_name || ""}
        onChange={(value) => onProfileUpdate({ ...profile, display_name: value })}
      />

      <TextareaFormField
        label="Bio"
        value={profile.bio || ""}
        onChange={(value) => onProfileUpdate({ ...profile, bio: value })}
      />

      <TextFormField
        label="Location"
        value={profile.location || ""}
        onChange={(value) => onProfileUpdate({ ...profile, location: value })}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Social Media</h3>
        {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
          <TextFormField
            key={platform.id}
            label={platform.label}
            value={socialMedia[platform.id] || ""}
            onChange={(value) => handleSocialMediaChange(platform.id, value)}
          />
        ))}
      </div>
    </div>
  );
};