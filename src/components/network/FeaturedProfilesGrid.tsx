import { FeaturedProfileCard } from "./FeaturedProfileCard";
import type { Profile } from "@/components/network/FeaturedProfiles";

interface FeaturedProfilesGridProps {
  profiles: Profile[];
  paidAdProfiles: Profile[];
  randomProfiles: Profile[];
}

export const FeaturedProfilesGrid = ({ profiles, paidAdProfiles, randomProfiles }: FeaturedProfilesGridProps) => {
  return (
    <div className="space-y-6">
      {paidAdProfiles.map((profile) => (
        <FeaturedProfileCard key={profile.id} profile={profile} isPaidAd={true} />
      ))}
      {profiles.map((profile) => (
        <FeaturedProfileCard key={profile.id} profile={profile} />
      ))}
      {randomProfiles.map((profile) => (
        <FeaturedProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};