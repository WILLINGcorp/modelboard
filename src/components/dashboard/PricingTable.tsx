import { DollarSign, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PurchaseAdSpot } from "@/components/network/PurchaseAdSpot";

export const PricingTable = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-modelboard-gray">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Featured Profile
            </span>
          </CardTitle>
          <p className="text-sm text-gray-400">
            Get featured on the platform
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-2xl font-bold">$1/hour</p>
            <p className="text-sm text-gray-400">Minimum 12 hours</p>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Premium placement in search results</li>
            <li>• Highlighted profile card</li>
            <li>• Priority in collaboration matches</li>
          </ul>
          <PurchaseAdSpot />
        </CardContent>
      </Card>

      <Card className="bg-modelboard-gray">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Sponsor Account
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4" />
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
        <CardContent className="space-y-4">
          <div>
            <p className="text-2xl font-bold">$29/month</p>
            <p className="text-sm text-gray-400">Billed monthly</p>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Verified account badge</li>
            <li>• Advanced analytics</li>
            <li>• Priority support</li>
            <li>• Custom profile themes</li>
          </ul>
          <button className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg opacity-50 cursor-not-allowed">
            Coming Soon
          </button>
        </CardContent>
      </Card>

      <Card className="bg-modelboard-gray">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Collab Workflow
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming Soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <p className="text-sm text-gray-400">
            Advanced collaboration tools
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-2xl font-bold">$49/month</p>
            <p className="text-sm text-gray-400">Billed monthly</p>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Contract templates</li>
            <li>• Payment processing</li>
            <li>• Schedule management</li>
            <li>• Team collaboration</li>
          </ul>
          <button className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg opacity-50 cursor-not-allowed">
            Coming Soon
          </button>
        </CardContent>
      </Card>
    </div>
  );
};