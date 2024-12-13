import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Image, User } from "lucide-react";
import { NotificationCards } from "@/components/dashboard/NotificationCards";
import { PricingTable } from "@/components/dashboard/PricingTable";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        navigate("/auth");
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const navigateToSection = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-modelboard-dark p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-modelboard-gray hover:bg-modelboard-gray/90 transition-colors cursor-pointer"
                onClick={() => navigateToSection("/my-location")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-modelboard-red">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Manage your current location and travel plans
              </p>
            </CardContent>
          </Card>

          <Card className="bg-modelboard-gray hover:bg-modelboard-gray/90 transition-colors cursor-pointer"
                onClick={() => navigateToSection("/my-portfolio")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-modelboard-red">
                <Image className="h-5 w-5" />
                Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                View and manage your portfolio items
              </p>
            </CardContent>
          </Card>

          <Card className="bg-modelboard-gray hover:bg-modelboard-gray/90 transition-colors cursor-pointer"
                onClick={() => navigateToSection("/my-profile")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-modelboard-red">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Update your profile information
              </p>
            </CardContent>
          </Card>
        </div>

        <NotificationCards />
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Premium Features</h2>
          <PricingTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;