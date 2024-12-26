import { FeaturedProfileCard } from "./FeaturedProfileCard";
import type { Profile } from "@/components/network/FeaturedProfiles";

interface FeaturedProfilesGridProps {
  profiles: Profile[];
  paidAdProfiles: Profile[];
  randomProfile: Profile | null;
}

export const FeaturedProfilesGrid = ({ profiles, paidAdProfiles, randomProfile }: FeaturedProfilesGridProps) => {
  return (
    <div className="space-y-8">
      {paidAdProfiles.map((profile) => (
        <FeaturedProfileCard key={profile.id} profile={profile} isPaidAd={true} />
      ))}
      {profiles.map((profile) => (
        <FeaturedProfileCard key={profile.id} profile={profile} />
      ))}
      {randomProfile && (
        <FeaturedProfileCard key={randomProfile.id} profile={randomProfile} />
      )}
    </div>
  );
};