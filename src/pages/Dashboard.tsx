import { ProfileAnalytics } from "@/components/dashboard/ProfileAnalytics";
import { ProfileVisitors } from "@/components/dashboard/ProfileVisitors";
import { NotificationCards } from "@/components/dashboard/NotificationCards";
import { PricingTable } from "@/components/dashboard/PricingTable";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-modelboard-dark p-4 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfileAnalytics />
          <ProfileVisitors />
        </div>
        <NotificationCards />
        <PricingTable />
      </div>
    </div>
  );
};

export default Dashboard;