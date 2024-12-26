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

export const PurchaseFeaturedSpot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to purchase a featured spot");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-featured-checkout", {
        body: { 
          hours,
          price: hours * 1.0, // $1 per hour
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
          className="bg-modelboard-red hover:bg-red-600 text-white font-semibold"
        >
          Get Featured
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-modelboard-dark text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Purchase a Featured Ad-Spot</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="hours">Get Featured for $1 per Hour (Minimum 12h)</Label>
            <Input
              id="hours"
              type="number"
              min={12}
              value={hours}
              onChange={(e) => setHours(Math.max(12, parseInt(e.target.value) || 12))}
              className="bg-modelboard-gray border-modelboard-gray"
            />
            <p className="text-sm text-gray-400">
              Total cost: ${(hours * 1.0).toFixed(2)}
            </p>
          </div>
          <Button
            onClick={handlePurchase}
            disabled={isLoading || hours < 12}
            className="w-full bg-modelboard-red hover:bg-red-600"
          >
            {isLoading ? "Processing..." : "Purchase Featured Spot"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};