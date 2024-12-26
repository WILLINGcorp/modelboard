import { FeaturedProfileCard } from "./FeaturedProfileCard";
import type { Profile } from "@/components/network/FeaturedProfiles";

interface FeaturedProfilesGridProps {
  profiles: Profile[];
  paidAdProfiles: Profile[];
  randomProfiles: Profile[];
}

export const FeaturedProfilesGrid = ({ profiles, paidAdProfiles, randomProfiles }: FeaturedProfilesGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {paidAdProfiles.map((profile) => (
        <FeaturedProfileCard key={profile.id} profile={profile} isPaidAd={true} />
      ))}
      {profiles.map((profile) => (
        <FeaturedProfileCard key={profile.id} profile={profile} />
      ))}
      {randomProfiles.map((profile) => (
        <FeaturedProfileCard key={profile.id} profile={profile} isRandomFill={true} />
      ))}
    </div>
  );
};