import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const PurchaseAdSpot = () => {
  const [hours, setHours] = useState(12);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Error",
          description: "Please sign in to purchase an ad spot",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-ad-checkout', {
        body: { hours },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-modelboard-red hover:bg-red-600">
          Get Featured
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-modelboard-gray text-white">
        <DialogHeader>
          <DialogTitle>Purchase Featured Spot</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="hours">Duration (hours)</Label>
            <Input
              id="hours"
              type="number"
              min="12"
              step="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="bg-modelboard-dark text-white"
            />
            <p className="text-sm text-gray-400 mt-1">
              Minimum 12 hours, in 1-hour increments
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              Total: ${hours.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">
              ($1 per hour)
            </p>
          </div>
          <Button 
            onClick={handlePurchase}
            disabled={loading || hours < 12}
            className="w-full bg-modelboard-red hover:bg-red-600"
          >
            {loading ? "Processing..." : "Purchase Now"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};