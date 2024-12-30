import { DollarSign, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { SponsorFeaturesList } from "./SponsorFeaturesList";
import { SponsorSubscribeButton } from "./SponsorSubscribeButton";

export const SponsorAccountCard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Card className="bg-modelboard-gray border-modelboard-red/50 hover:border-2 transition-all duration-300 relative overflow-hidden group flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-modelboard-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-modelboard-red" />
            <span className="text-gradient">Become a Sponsor</span>
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-modelboard-red" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Premium Ad Placements across the Platform</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <p className="text-sm text-gray-400">
          Get Augmented Exposure
        </p>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-gradient">$99</p>
          <p className="text-sm text-gray-400 mt-1">30 days access</p>
        </div>
        <SponsorFeaturesList />
        <div className="mt-auto">
          <SponsorSubscribeButton loading={loading} setLoading={setLoading} />
        </div>
      </CardContent>
    </Card>
  );
};