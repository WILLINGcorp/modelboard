import { PostProductionCard } from "../project-files/PostProductionCard";

interface ProServicesTabProps {
  proposalId: string;
}

export const ProServicesTab = ({ proposalId }: ProServicesTabProps) => {
  return (
    <div className="space-y-6">
      <PostProductionCard />
    </div>
  );
};