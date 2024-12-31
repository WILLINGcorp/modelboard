import { TextFormField } from "../form-fields/TextFormField";
import { TextareaFormField } from "../form-fields/TextareaFormField";
import { SocialMediaFields } from "./producer/SocialMediaFields";
import { UserAvatar } from "@/components/model/profile-header/UserAvatar";
import { FileUploader } from "@/components/travel/workflow/release-assets/components/FileUploader";
import { uploadPortfolioImage } from "@/components/portfolio/utils/uploadUtils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface StudioProfileSectionProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

export const StudioProfileSection = ({ profile, onProfileUpdate }: StudioProfileSectionProps) => {
  const { toast } = useToast();

  const handleNicheTagsChange = (tags: string) => {
    const tagArray = tags.split(',').map(tag => tag.trim());
    const limitedTags = tagArray.slice(0, 6); // Limit to 6 tags
    onProfileUpdate({ 
      ...profile, 
      roles: limitedTags 
    });
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ 
          avatar_url: publicUrl,
          avatar_moderation_status: 'pending'
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <UserAvatar profile={profile} />
        <FileUploader
          onFileSelect={handleAvatarUpload}
          accept="image/*"
          label="upload studio avatar"
        />
      </div>

      <TextFormField
        label="Username"
        value={profile.username || ""}
        onChange={(value) => onProfileUpdate({ ...profile, username: value })}
      />

      <TextFormField
        label="Studio Display Name"
        value={profile.display_name || ""}
        onChange={(value) => onProfileUpdate({ ...profile, display_name: value })}
      />

      <TextareaFormField
        label="Description"
        value={profile.bio || ""}
        onChange={(value) => onProfileUpdate({ ...profile, bio: value })}
      />

      <TextFormField
        label="Niche Tags (comma-separated, max 6)"
        value={Array.isArray(profile.roles) ? profile.roles.join(', ') : ''}
        onChange={handleNicheTagsChange}
      />

      <TextFormField
        label="Parent Company"
        value={profile.business_model?.[0] || ""}
        onChange={(value) => onProfileUpdate({ 
          ...profile, 
          business_model: [value]
        })}
      />

      <TextFormField
        label="Headquarter Location"
        value={profile.location || ""}
        onChange={(value) => onProfileUpdate({ ...profile, location: value })}
      />

      <TextFormField
        label="Website"
        type="url"
        value={profile.website || ""}
        onChange={(value) => onProfileUpdate({ ...profile, website: value })}
      />

      <SocialMediaFields
        socialMedia={profile.social_media as Record<string, string> || {}}
        onSocialMediaChange={(platform, handle) => {
          const updatedSocialMedia = {
            ...(profile.social_media as Record<string, string> || {}),
            [platform]: handle,
          };
          onProfileUpdate({ ...profile, social_media: updatedSocialMedia });
        }}
      />
    </div>
  );
};