import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Image } from "lucide-react";
import { FileUploader } from "./components/FileUploader";
import { FileList } from "./components/FileList";

interface GalleryPicturesCardProps {
  proposalId: string;
}

export const GalleryPicturesCard = ({ proposalId }: GalleryPicturesCardProps) => {
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
          step_type: "Upload Gallery",
          data: { filePath },
        });

      if (stepError) throw stepError;

      toast({
        title: "Success",
        description: "Picture uploaded successfully",
      });
      
      event.target.value = "";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload picture",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-modelboard-dark border border-modelboard-red/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Image className="w-5 h-5 mr-2 text-modelboard-red" />
          Release Gallery Pictures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-400">
          Upload and manage pictures for the release gallery
        </div>
        <FileUploader
          onFileSelect={handleFileUpload}
          accept="image/*"
          disabled={uploading}
          label="upload pictures"
        />
        <FileList
          files={[]} // You'll need to implement fetching the files
          onDownload={handleDownload}
        />
      </CardContent>
    </Card>
  );
};
