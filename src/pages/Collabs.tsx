import { useEffect } from "react";
import CollabProposalsList from "@/components/travel/CollabProposalsList";
import { AppLayout } from "@/components/layout/AppLayout";

const Collabs = () => {
  useEffect(() => {
    document.title = "Collaborations | ModelBoard";
  }, []);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Collaboration Proposals</h1>
        <CollabProposalsList />
      </div>
    </AppLayout>
  );
};

export default Collabs;