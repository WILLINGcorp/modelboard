import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Grid, Calendar, File, Package } from "lucide-react";
import ProposalDetails from "./ProposalDetails";
import { ProjectFilesTab } from "./workflow/project-files/ProjectFilesTab";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Proposal } from "./types/workflow";
import ApprovalsList from "./workflow/ApprovalsList";

interface CollabWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal;
}

const CollabWorkflowModal = ({
  isOpen,
  onClose,
  proposal,
}: CollabWorkflowModalProps) => {
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
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[95vh] bg-modelboard-dark border-t border-modelboard-red/50">
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <DrawerTitle className="text-2xl font-bold text-gradient">
                Collaboration Workflow
              </DrawerTitle>
              <DrawerDescription className="text-sm text-gray-400">
                Manage your collaboration process step by step
              </DrawerDescription>
            </div>
            
            <Tabs defaultValue="collaborators" className="w-full md:w-auto mt-4 md:mt-0">
              <TabsList className="bg-modelboard-dark border border-modelboard-red/20">
                <TabsTrigger 
                  value="collaborators"
                  className="data-[state=active]:bg-modelboard-red/10"
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Collaborators
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule"
                  className="data-[state=active]:bg-modelboard-red/10"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </TabsTrigger>
                <TabsTrigger 
                  value="files"
                  className="data-[state=active]:bg-modelboard-red/10"
                >
                  <File className="h-4 w-4 mr-2" />
                  Project Files
                </TabsTrigger>
                <TabsTrigger 
                  value="release"
                  className="data-[state=active]:bg-modelboard-red/10"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Release Assets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="collaborators" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProposalDetails
                    location={proposal.location}
                    status={proposal.status}
                    message={proposal.message}
                    senderName={proposal.sender?.display_name}
                    senderUsername={proposal.sender?.username}
                    receiverName={proposal.receiver?.display_name}
                    receiverUsername={proposal.receiver?.username}
                  />
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-modelboard-dark border border-modelboard-red/20">
                    <CardHeader>
                      <CardTitle className="text-white">Schedule Shoot</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <CalendarComponent
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
                        <CalendarComponent
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
              </TabsContent>

              <TabsContent value="files" className="p-6">
                <ProjectFilesTab proposalId={proposal.id} />
              </TabsContent>

              <TabsContent value="release" className="p-6">
                <div className="text-center text-gray-400">
                  Release assets content will be implemented here
                </div>
              </TabsContent>
            </Tabs>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CollabWorkflowModal;