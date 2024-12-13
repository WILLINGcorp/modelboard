import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PurchaseAdSpot } from "@/components/network/PurchaseAdSpot";

export const FeaturedProfileCard = () => {
  return (
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
  );
};