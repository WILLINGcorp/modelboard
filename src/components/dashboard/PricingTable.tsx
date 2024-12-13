import { FeaturedProfileCard } from "./pricing/FeaturedProfileCard";
import { SponsorAccountCard } from "./pricing/SponsorAccountCard";
import { CollabToolsuiteCard } from "./pricing/CollabToolsuiteCard";

export const PricingTable = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeaturedProfileCard />
      <SponsorAccountCard />
      <CollabToolsuiteCard />
    </div>
  );
};