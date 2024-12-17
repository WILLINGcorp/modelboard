import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ApprovalsList from "../ApprovalsList";
import { Proposal } from "../../types/workflow";

interface ScheduleTabProps {
  proposal: Proposal;
}

export const ScheduleTab = ({ proposal }: ScheduleTabProps) => {
  const { toast } = useToast();
  const [shootDate, setShootDate] = useState<Date>();
  const [shootTime, setShootTime] = useState("");
  const [releaseDate, setReleaseDate] = useState<Date>();
  const [releaseTime, setReleaseTime] = useState("");

  const handleScheduleSubmit = async (type: 'shoot' | 'release') => {
    try {
      const { data: stepData, error: stepError } = await supabase
        .from("collab_workflow_steps")
        .insert({
          proposal_id: proposal.id,
          step_type: type === 'shoot' ? 'Schedule Shoot' : 'Schedule Release',
          data: {
            date: type === 'shoot' ? shootDate?.toISOString() : releaseDate?.toISOString(),
            time: type === 'shoot' ? shootTime : releaseTime,
          },
        })
        .select()
        .single();

      if (stepError) throw stepError;

      await supabase.from("collab_approvals").insert([
        {
          step_id: stepData.id,
          profile_id: proposal.sender?.id,
          status: 'pending',
        },
        {
          step_id: stepData.id,
          profile_id: proposal.receiver?.id,
          status: 'pending',
        },
      ]);

      toast({
        title: "Success",
        description: `${type === 'shoot' ? 'Shoot' : 'Release'} schedule created successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to schedule ${type}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-modelboard-dark border border-modelboard-red/20">
        <CardHeader>
          <CardTitle className="text-white">Schedule Shoot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Calendar
              mode="single"
              selected={shootDate}
              onSelect={setShootDate}
              className="rounded-md border"
            />
            <Input
              type="time"
              value={shootTime}
              onChange={(e) => setShootTime(e.target.value)}
              className="bg-modelboard-dark"
            />
            <Button 
              onClick={() => handleScheduleSubmit('shoot')}
              className="w-full bg-modelboard-red hover:bg-red-600"
            >
              Schedule Shoot
            </Button>
          </div>
          <ApprovalsList stepId={proposal.id} />
        </CardContent>
      </Card>

      <Card className="bg-modelboard-dark border border-modelboard-red/20">
        <CardHeader>
          <CardTitle className="text-white">Schedule Release</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Calendar
              mode="single"
              selected={releaseDate}
              onSelect={setReleaseDate}
              className="rounded-md border"
            />
            <Input
              type="time"
              value={releaseTime}
              onChange={(e) => setReleaseTime(e.target.value)}
              className="bg-modelboard-dark"
            />
            <Button 
              onClick={() => handleScheduleSubmit('release')}
              className="w-full bg-modelboard-red hover:bg-red-600"
            >
              Schedule Release
            </Button>
          </div>
          <ApprovalsList stepId={proposal.id} />
        </CardContent>
      </Card>
    </div>
  );
};