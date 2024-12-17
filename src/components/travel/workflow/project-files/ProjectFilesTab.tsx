import { RawFootageCard } from "./RawFootageCard";
import { PicturesCard } from "./PicturesCard";
import { PostProductionCard } from "./PostProductionCard";

export const ProjectFilesTab = ({ proposalId }: { proposalId: string }) => {
  return (
    <div className="space-y-6">
      <RawFootageCard proposalId={proposalId} />
      <PicturesCard proposalId={proposalId} />
      <PostProductionCard />
    </div>
  );
};