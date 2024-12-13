import { DollarSign, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CollabToolsuiteCard = () => {
  return (
    <Card className="bg-modelboard-gray">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Collab Toolsuite
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
          Streamlined Collaboration Workflow
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-2xl font-bold">$29/month</p>
          <p className="text-sm text-gray-400">Billed monthly</p>
        </div>
        <ul className="space-y-2 text-sm">
          <li>• Managed Regulatory Compliance™</li>
          <li>• File sharing</li>
          <li>• Schedule management</li>
          <li>• Release Assets management</li>
        </ul>
        <button className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg opacity-50 cursor-not-allowed">
          Coming Soon
        </button>
      </CardContent>
    </Card>
  );
};