import { DollarSign, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SponsorAccountCard = () => {
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
                <p>Coming Soon</p>
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
          <button className="w-full py-2.5 px-4 bg-gray-600/50 text-white rounded-lg opacity-50 cursor-not-allowed backdrop-blur-sm hover:bg-gray-600/60 transition-colors">
            Coming Soon
          </button>
        </div>
      </CardContent>
    </Card>
  );
};