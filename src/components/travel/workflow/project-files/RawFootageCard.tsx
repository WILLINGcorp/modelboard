import { Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const RawFootageCard = ({ proposalId }: { proposalId: string }) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const filePath = `${proposalId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("collab-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: stepError } = await supabase
        .from("collab_workflow_steps")
        .insert({
          proposal_id: proposalId,
          step_type: "Share Footage",
          data: { filePath },
        });

      if (stepError) throw stepError;

      toast({
        title: "Success",
        description: "Raw footage uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload footage",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (event.target) event.target.value = "";
    }
  };

  return (
    <Card className="bg-modelboard-dark border border-modelboard-red/20">
      <CardHeader>
        <CardTitle className="text-white">Share Project Raw Footage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-400">
          Upload your raw footage files for collaboration
        </div>
        <div className="flex items-center justify-center w-full">
          <label className="w-full">
            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-modelboard-red/20 border-dashed rounded-lg cursor-pointer bg-modelboard-dark/50 hover:bg-modelboard-red/5 transition-colors">
              <Upload className="w-8 h-8 text-modelboard-red mb-2" />
              <p className="text-sm text-gray-400">Click to upload video files</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
};