import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Ad {
  id: string;
  title: string;
  description: string;
  location: string;
  ad_type: string;
  created_at: string;
  profiles: {
    display_name: string | null;
    avatar_url: string | null;
  };
}

interface AdsListProps {
  ads: Ad[];
  isLoading: boolean;
}

export const AdsList = ({ ads, isLoading }: AdsListProps) => {
  if (isLoading) {
    return <div className="text-white">Loading ads...</div>;
  }

  if (!ads.length) {
    return (
      <div className="text-center py-8 text-gray-400">
        No ads found for the selected criteria
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ads.map((ad) => (
        <Card key={ad.id} className="bg-modelboard-gray p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={ad.profiles.avatar_url || undefined} />
              <AvatarFallback>
                {ad.profiles.display_name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-semibold">{ad.profiles.display_name}</h3>
              <p className="text-sm text-gray-400">
                {formatDistanceToNow(new Date(ad.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium">{ad.title}</h4>
            <p className="text-gray-400 text-sm">{ad.description}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{ad.location}</span>
            <span className="capitalize">{ad.ad_type.replace("_", " ")}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};