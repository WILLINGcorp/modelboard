import { Routes, Route, Outlet } from "react-router-dom";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { ProfileSetupGuard } from "@/components/auth/ProfileSetupGuard";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import ModelDirectory from "@/pages/ModelDirectory";
import Messages from "@/pages/Messages";
import Collabs from "@/pages/Collabs";
import Ads from "@/pages/Ads";
import Location from "@/pages/Location";
import Portfolio from "@/pages/Portfolio";
import Profile from "@/pages/Profile";
import ModelProfile from "@/pages/ModelProfile";
import MyPortfolio from "@/pages/MyPortfolio";
import Pricing from "@/pages/Pricing";
import { ChannelView } from "@/components/forum/channel/ChannelView";
import { ModerationPanel } from "@/components/moderation/ModerationPanel";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with navigation */}
      <Route element={<AppLayout><Outlet /></AppLayout>}>
        <Route path="/" element={<Index />} />
        <Route path="/pricing" element={<Pricing />} />
      </Route>

      {/* Auth route without navigation */}
      <Route path="/auth" element={<Auth />} />
      
      {/* Protected routes with navigation */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout><Outlet /></AppLayout>}>
          <Route path="/profile" element={<Profile />} />
          
          {/* Routes that require completed profile */}
          <Route element={<ProfileSetupGuard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/network" element={<ModelDirectory />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/collabs" element={<Collabs />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/my-location" element={<Location />} />
            <Route path="/my-portfolio" element={<MyPortfolio />} />
            <Route path="/models/:id" element={<ModelProfile />} />
            <Route path="/moderation" element={<ModerationPanel />} />
            <Route path="/forum/channels/:channelId" element={<ChannelView />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;