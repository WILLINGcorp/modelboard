import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, MapPin, Globe, MessageSquare, HandshakeIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CollabProposalForm from "@/components/travel/CollabProposalForm";
import { PhysicalAttributesDisplay } from "./profile-sections/PhysicalAttributesDisplay";
import { SexualPreferencesDisplay } from "./profile-sections/SexualPreferencesDisplay";
import { SocialMediaDisplay } from "./profile-sections/SocialMediaDisplay";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileHeaderProps {
  profile: Profile;
  onMessageClick?: () => void;
}

const ProfileHeader = ({ profile, onMessageClick }: ProfileHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-modelboard-gray rounded-lg p-8 mb-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative group">
          <Avatar className="h-32 w-32 ring-2 ring-modelboard-red ring-offset-2 ring-offset-modelboard-gray">
            <AvatarImage 
              src={profile.avatar_url || "/creator_default_profile.jpg"} 
              alt={profile.display_name || "Profile picture"}
              className="object-cover"
            />
            <AvatarFallback>
              <User className="h-16 w-16" />
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

          {profile.bio && (
            <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
          )}
          
          <PhysicalAttributesDisplay profile={profile} />
          <SexualPreferencesDisplay profile={profile} />
          <SocialMediaDisplay profile={profile} />
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
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;