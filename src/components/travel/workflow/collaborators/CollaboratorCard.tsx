import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CollaboratorCardProps {
  profile: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  role: "Project Owner" | "Collaborator";
}

export const CollaboratorCard = ({ profile, role }: CollaboratorCardProps) => {
  return (
    <Card className="p-4 bg-modelboard-dark border-modelboard-red/20 hover:border-modelboard-red/50 transition-all">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12 ring-2 ring-modelboard-red ring-offset-2 ring-offset-modelboard-dark">
          <AvatarImage 
            src={profile.avatar_url || "/creator_default_profile.jpg"} 
            alt={profile.display_name || "Profile"} 
          />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-white">
            {profile.display_name || "Anonymous"}
          </h3>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
    </Card>
  );
};