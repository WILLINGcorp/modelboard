import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PostProductionCard = () => {
  return (
    <Card className="bg-modelboard-dark border border-modelboard-red/20">
      <CardHeader>
        <CardTitle className="text-white">
          Professional Post-Production Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-gray-400">
          Get your footage edited by the professional team behind MenAtPlay & Masqulin
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-modelboard-red/5 border border-modelboard-red/20">
            <h3 className="text-lg font-semibold mb-2 text-gradient">Basic Package</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-4">
              <li>• Basic color correction</li>
              <li>• Simple cuts and transitions</li>
              <li>• Basic audio mixing</li>
              <li>• 2 revision rounds</li>
            </ul>
            <p className="text-xl font-bold text-gradient mb-4">$499</p>
            <Button className="w-full bg-modelboard-red hover:bg-red-600">
              Select Basic
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-modelboard-red/5 border border-modelboard-red/20">
            <h3 className="text-lg font-semibold mb-2 text-gradient">Premium Package</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-4">
              <li>• Advanced color grading</li>
              <li>• Complex editing & effects</li>
              <li>• Professional audio mixing</li>
              <li>• Unlimited revisions</li>
            </ul>
            <p className="text-xl font-bold text-gradient mb-4">$999</p>
            <Button className="w-full bg-modelboard-red hover:bg-red-600">
              Select Premium
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <span className="text-gray-400 mr-2">From the Editors Team behind</span>
          <img 
            src="/lovable-uploads/95610488-60a6-49df-a3a0-c7265fde37ad.png" 
            alt="Masqulin"
            className="h-8 mx-2"
          />
          <img 
            src="/lovable-uploads/614d6ffe-6a32-41be-8a8c-57d838cd28f3.png" 
            alt="MenAtPlay"
            className="h-8 mx-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};