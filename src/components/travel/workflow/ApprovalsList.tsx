import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ApprovalsListProps {
  stepId: string;
}

const ApprovalsList = ({ stepId }: ApprovalsListProps) => {
  const [approvals, setApprovals] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchApprovals();
  }, [stepId]);

  const fetchApprovals = async () => {
    const { data, error } = await supabase
      .from("collab_approvals")
      .select(`
        *,
        profile:profiles(display_name, username)
      `)
      .eq("step_id", stepId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch approvals",
        variant: "destructive",
      });
      return;
    }

    setApprovals(data || []);
  };

  const handleApproval = async (status: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("collab_approvals")
        .update({ status })
        .eq("step_id", stepId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Step ${status} successfully`,
      });

      fetchApprovals();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update approval status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Approvals</h3>
      <div className="space-y-2">
        {approvals.map((approval) => (
          <div
            key={approval.id}
            className="flex items-center justify-between p-3 bg-modelboard-dark rounded-lg"
          >
            <div>
              <p className="text-white">
                {approval.profile.display_name || approval.profile.username}
              </p>
              <p className="text-sm text-gray-400">Status: {approval.status}</p>
            </div>
            {approval.status === "pending" && (
              <div className="space-x-2">
                <Button
                  onClick={() => handleApproval("approved")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleApproval("rejected")}
                  variant="destructive"
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalsList;