import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreatorPlatformsField } from "./CreatorPlatformsField";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileFormProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

export const ProfileForm = ({ profile, onProfileUpdate }: ProfileFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", profile.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      onProfileUpdate(profile);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-modelboard-gray p-6 rounded-lg">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-white">Username</label>
          <Input
            type="text"
            value={profile?.username || ""}
            onChange={(e) => onProfileUpdate({ ...profile, username: e.target.value })}
            className="bg-modelboard-dark border-modelboard-gray text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white">Display Name</label>
          <Input
            type="text"
            value={profile?.display_name || ""}
            onChange={(e) => onProfileUpdate({ ...profile, display_name: e.target.value })}
            className="bg-modelboard-dark border-modelboard-gray text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white">Bio</label>
          <Textarea
            value={profile?.bio || ""}
            onChange={(e) => onProfileUpdate({ ...profile, bio: e.target.value })}
            className="bg-modelboard-dark border-modelboard-gray text-white"
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white">Website</label>
          <Input
            type="url"
            value={profile?.website || ""}
            onChange={(e) => onProfileUpdate({ ...profile, website: e.target.value })}
            className="bg-modelboard-dark border-modelboard-gray text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white">Creator Platforms</label>
          <CreatorPlatformsField
            value={profile?.creator_platforms || []}
            onChange={(platforms) => onProfileUpdate({ ...profile, creator_platforms: platforms })}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-modelboard-red hover:bg-red-600"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};