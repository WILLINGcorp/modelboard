import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdTypeSelect } from "@/components/ads/AdTypeSelect";
import { LocationSelect } from "@/components/ads/LocationSelect";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DurationOption {
  hours: number;
  price: number;
  label: string;
}

const DURATION_OPTIONS: DurationOption[] = [
  { hours: 24, price: 4.95, label: "24 Hours" },
  { hours: 72, price: 11.95, label: "3 Days" },
  { hours: 168, price: 14.95, label: "7 Days" },
];

export const PurchaseAdSpot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adType, setAdType] = useState<string>("all");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePurchase = async (duration: DurationOption) => {
    try {
      setIsLoading(true);
      
      // First upload the image if one is selected
      let imageUrl = "";
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("ads")
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("ads")
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }

      const { data, error } = await supabase.functions.invoke("create-ad-checkout", {
        body: { 
          hours: duration.hours,
          price: duration.price,
          adData: {
            title,
            description,
            location,
            ad_type: adType,
            image_url: imageUrl,
          }
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to initiate checkout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default"
          className="w-full bg-modelboard-red hover:bg-red-600 text-white"
        >
          Place an Ad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-modelboard-dark text-white">
        <DialogHeader>
          <DialogTitle>Place an Ad</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <AdTypeSelect
              value={adType}
              onChange={setAdType}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-modelboard-gray border-modelboard-gray"
            />
          </div>

          <div className="space-y-2">
            <LocationSelect
              value={location}
              onChange={setLocation}
              defaultLocation=""
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-modelboard-gray border-modelboard-gray"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Ad Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-modelboard-gray border-modelboard-gray"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Duration</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {DURATION_OPTIONS.map((option) => (
                <Button
                  key={option.hours}
                  onClick={() => handlePurchase(option)}
                  disabled={isLoading}
                  className="bg-modelboard-gray hover:bg-modelboard-gray/90"
                >
                  <div className="text-center">
                    <div>{option.label}</div>
                    <div className="text-sm text-gray-400">${option.price}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};