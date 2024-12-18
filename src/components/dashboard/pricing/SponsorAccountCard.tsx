import { DollarSign, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const SponsorAccountCard = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to subscribe");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-sponsor-checkout", {
        body: { user_id: user.id }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-modelboard-gray border-modelboard-red/50 hover:border-2 transition-all duration-300 relative overflow-hidden group flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-modelboard-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-modelboard-red" />
            <span className="text-gradient">Sponsor Account</span>
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-modelboard-red" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Premium features for your account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <p className="text-sm text-gray-400">
          Premium features for your account
        </p>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-gradient">$99/month</p>
          <p className="text-sm text-gray-400 mt-1">Billed monthly</p>
        </div>
        <ul className="space-y-3 text-sm mb-6">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-modelboard-red/50" />
            Sponsor account badge
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-modelboard-red/50" />
            Advanced analytics
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-modelboard-red/50" />
            Priority support
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-modelboard-red/50" />
            Be featured in the Sponsor section and in premium placements across the platform
          </li>
        </ul>
        <div className="mt-auto">
          <button 
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-modelboard-red text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Subscribe Now"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};