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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const PurchaseAdSpot = () => {
  const [hours, setHours] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke("create-ad-checkout", {
        body: { hours },
      });

      if (error) {
        console.error('Error:', error);
        toast.error("Failed to create checkout session");
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("No checkout URL received");
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
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="default"
          className="w-full bg-modelboard-red hover:bg-red-600 text-white"
        >
          Get Featured
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Featured Profile Spot</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="hours">Duration (hours)</Label>
            <Input
              id="hours"
              type="number"
              min={12}
              step={1}
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
            />
            <p className="text-sm text-gray-500">
              Minimum duration: 12 hours. Total cost: ${hours}
            </p>
          </div>
          <Button
            className="w-full bg-modelboard-red hover:bg-red-600 text-white"
            onClick={handlePurchase}
            disabled={isLoading || hours < 12}
          >
            {isLoading ? "Processing..." : "Purchase"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};