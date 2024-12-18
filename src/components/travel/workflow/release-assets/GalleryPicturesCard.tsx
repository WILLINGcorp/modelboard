import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Image, Download, Upload } from "lucide-react";

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
        <div className="flex items-center justify-center w-full">
          <label className="w-full">
            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-modelboard-red/20 border-dashed rounded-lg cursor-pointer bg-modelboarI'll help you create the Release Assets Tab with the requested cards for managing video trailers, video files, and pictures. Let's implement this step by step.

<lov-code>
First, let's update the ReleaseAssetsTab component with the new cards:

<lov-write file_path="src/components/travel/workflow/tabs/ReleaseAssetsTab.tsx">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Film, Video, Image, Upload, Download } from "lucide-react";

interface ReleaseAssetsTabProps {
  proposalId: string;
}

interface AssetFile {
  id: string;
  asset_url: string;
  asset_type: string;
  created_at: string;
}

export const ReleaseAssetsTab = ({ proposalId }: ReleaseAssetsTabProps) => {
  const [uploading, setUploading] = useState(false);
  const [assets, setAssets] = useState<AssetFile[]>([]);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, assetType: string) => {
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

      const { data: { publicUrl } } = supabase.storage
        .from("collab-assets")
        .getPublicUrl(filePath);

      const { error: stepError } = await supabase
        .from("collab_workflow_steps")
        .insert({
          proposal_id: proposalId,
          step_type: `Upload ${assetType}`,
          data: { filePath },
        })
        .select()
        .single();

      if (stepError) throw stepError;

      toast({
        title: "Success",
        description: `${assetType} uploaded successfully`,
      });

      // Refresh assets list
      fetchAssets();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (event.target) event.target.value = "";
    }
  };

  const fetchAssets = async () => {
    try {
      const { data: steps, error } = await supabase
        .from("collab_workflow_steps")
        .select(`
          id,
          step_type,
          data,
          created_at,
          collab_assets (
            id,
            asset_url,
            asset_type,
            created_at
          )
        `)
        .eq("proposal_id", proposalId)
        .in("step_type", ["Upload Trailer", "Upload Video", "Upload Picture"]);

      if (error) throw error;

      const assets = steps.flatMap(step => 
        step.collab_assets?.map(asset => ({
          ...asset,
          step_type: step.step_type
        })) || []
      );

      setAssets(assets);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch assets",
        variant: "destructive",
      });
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

  const AssetCard = ({ title, icon: Icon, accept, type }: { 
    title: string;
    icon: React.ComponentType<any>;
    accept: string;
    type: string;
  }) => (
    <Card className="bg-modelboard-dark border border-modelboard-red/20">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Icon className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="w-full">
              <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-modelboard-red/20 border-dashed rounded-lg cursor-pointer bg-modelboard-dark/50 hover:bg-modelboard-red/5 transition-colors">
                <Upload className="w-8 h-8 text-modelboard-red mb-2" />
                <p className="text-sm text-gray-400">Click to upload {type}</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept={accept}
                onChange={(e) => handleFileUpload(e, type)}
                disabled={uploading}
              />
            </label>
          </div>
          
          <div className="space-y-2">
            {assets
              .filter(asset => asset.step_type === `Upload ${type}`)
              .map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-2 bg-modelboard-gray/50 rounded-lg"
                >
                  <span className="text-sm text-gray-400">
                    {new Date(asset.created_at).toLocaleDateString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-modelboard-red hover:text-modelboard-red/80"
                    onClick={() => handleDownload(asset.asset_url, `${type.toLowerCase()}-${asset.id}`)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <AssetCard
        title="Video Trailers"
        icon={Film}
        accept="video/*"
        type="Trailer"
      />
      
      <AssetCard
        title="Release Videos"
        icon={Video}
        accept="video/*"
        type="Video"
      />
      
      <AssetCard
        title="Release Gallery"
        icon={Image}
        accept="image/*"
        type="Picture"
      />
    </div>
  );
};