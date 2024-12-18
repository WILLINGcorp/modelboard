import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Film, Download, Upload } from "lucide-react";

interface VideoTrailersCardProps {
  proposalId: string;
}

export const VideoTrailersCard = ({ proposalId }: VideoTrailersCardProps) => {
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
          step_type: "Upload Trailer",
          data: { filePath },
        });

      if (stepError) throw stepError;

      toast({
        title: "Success",
        description: "Video trailer uploaded successfully",
      });
      
      event.target.value = "";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload video trailer",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="bg-modelboard-dark border border-modelboard-red/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Film className="w-5 h-5 mr-2 text-modelboard-red" />
          Video Trailers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-400">
          Upload and manage video trailers for the release
        </div>
        <div className="flex items-center justify-center w-full">
          <label className="w-full">
            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-modelboard-red/20 border-dashed rounded-lg cursor-pointer bg-modelboard-dark/50 hover:bg-modelboard-red/5 transition-colors">
              <Upload className="w-8 h-8 text-modelboard-red mb-2" />
              <p className="text-sm text-gray-400">Click to upload video trailer</p>
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