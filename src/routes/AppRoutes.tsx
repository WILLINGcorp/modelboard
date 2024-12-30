import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { AppLayout } from "@/components/layout/AppLayout";
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
import { ChannelView } from "@/components/forum/channel/ChannelView";
import { ModerationPanel } from "@/components/moderation/ModerationPanel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/network" element={<ModelDirectory />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/collabs" element={<Collabs />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/my-location" element={<Location />} />
          <Route path="/my-portfolio" element={<MyPortfolio />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/models/:id" element={<ModelProfile />} />
          <Route path="/moderation" element={<ModerationPanel />} />
          <Route path="/forum/channels/:channelId" element={<ChannelView />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;