import { RawFootageCard } from "./RawFootageCard";
import { PicturesCard } from "./PicturesCard";
import { PostProductionCard } from "./PostProductionCard";

interface ProjectFilesTabProps {
  proposalId: string;
}

export const ProjectFilesTab = ({ proposalId }: ProjectFilesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RawFootageCard proposalId={proposalId} />
        <PicturesCard proposalId={proposalId} />
      </div>
      <PostProductionCard />
    </div>
  );
};