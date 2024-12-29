import PortfolioSection from "@/components/model/PortfolioSection";
import { SponsorFeaturedMembers } from "@/components/sponsor/SponsorFeaturedMembers";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <PortfolioSection portfolio={[]} />
        <SponsorFeaturedMembers />
      </div>
    </div>
  );
};

export default Portfolio;