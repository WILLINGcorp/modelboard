import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PurchaseAdSpot } from "@/components/network/PurchaseAdSpot";

export const FeaturedProfileCard = () => {
  return (
    <Card className="bg-modelboard-gray border-modelboard-red hover:border-2 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-modelboard-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-modelboard-red" />
            <span className="text-gradient">Featured Profile</span>
          </span>
        </CardTitle>
        <p className="text-sm text-gray-400">
          Get featured on the platform
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-gradient">$1/hour</p>
          <p className="text-sm text-gray-400 mt-1">Minimum 12 hours</p>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-modelboard-red" />
            Premium placement in search results
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-modelboard-red" />
            Highlighted profile card
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-modelboard-red" />
            Priority in collaboration matches
          </li>
        </ul>
        <div className="pt-4">
          <PurchaseAdSpot />
        </div>
      </CardContent>
    </Card>
  );
};