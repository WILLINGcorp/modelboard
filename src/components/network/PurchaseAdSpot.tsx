import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AdType } from "@/pages/Ads";
import { AdFormFields } from "../ads/purchase/AdFormFields";
import { DurationOptions, DurationOption } from "../ads/purchase/DurationOptions";

const DURATION_OPTIONS: DurationOption[] = [
  { hours: 24, price: 4.95, label: "24 Hours" },
  { hours: 72, price: 11.95, label: "3 Days" },
  { hours: 168, price: 14.95, label: "7 Days" },
];

export const PurchaseAdSpot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adType, setAdType] = useState<AdType | "all">("all");
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
          className="w-full bg-modelboard-red hover:bg-red-600 text-white font-semibold"
        >
          Place an Ad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-modelboard-dark text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Place an Ad</DialogTitle>
        </DialogHeader>
        <div className="space-y-8 py-6">
          <AdFormFields
            adType={adType}
            setAdType={setAdType}
            title={title}
            setTitle={setTitle}
            location={location}
            setLocation={setLocation}
            description={description}
            setDescription={setDescription}
            selectedFile={selectedFile}
            onFileChange={handleFileChange}
          />
          
          <DurationOptions
            options={DURATION_OPTIONS}
            onSelect={handlePurchase}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};