import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, Globe, LogOut, Upload, Camera } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const filePath = `${profile.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      setProfile({ ...profile, avatar_url: publicUrl });
      toast({
        title: "Succès",
        description: "Photo de profil mise à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la photo de profil",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", profile.id);

      if (error) throw error;
      toast({
        title: "Succès",
        description: "Profil mis à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-modelboard-dark flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Mon Profil</h1>
          <Button variant="ghost" onClick={handleSignOut} className="text-white">
            <LogOut className="mr-2" />
            Déconnexion
          </Button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            <label 
              htmlFor="avatar-upload" 
              className="absolute bottom-0 right-0 p-2 bg-modelboard-red rounded-full cursor-pointer hover:bg-red-600 transition-colors"
            >
              <Camera className="h-4 w-4 text-white" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <form onSubmit={updateProfile} className="space-y-6 bg-modelboard-gray p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Nom d'utilisateur</label>
              <Input
                type="text"
                value={profile?.username || ""}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="bg-modelboard-dark border-modelboard-gray text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">Nom d'affichage</label>
              <Input
                type="text"
                value={profile?.display_name || ""}
                onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                className="bg-modelboard-dark border-modelboard-gray text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">Bio</label>
              <Textarea
                value={profile?.bio || ""}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="bg-modelboard-dark border-modelboard-gray text-white"
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">Localisation</label>
              <Input
                type="text"
                value={profile?.location || ""}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="bg-modelboard-dark border-modelboard-gray text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">Site web</label>
              <Input
                type="url"
                value={profile?.website || ""}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="bg-modelboard-dark border-modelboard-gray text-white"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-modelboard-red hover:bg-red-600">
            Sauvegarder les modifications
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;