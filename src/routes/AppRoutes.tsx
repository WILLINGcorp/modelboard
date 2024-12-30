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
        <Route path="/" element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        } />
        <Route path="/dashboard" element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        } />
        <Route path="/network" element={
          <AppLayout>
            <ModelDirectory />
          </AppLayout>
        } />
        <Route path="/messages" element={
          <AppLayout>
            <Messages />
          </AppLayout>
        } />
        <Route path="/collabs" element={
          <AppLayout>
            <Collabs />
          </AppLayout>
        } />
        <Route path="/ads" element={
          <AppLayout>
            <Ads />
          </AppLayout>
        } />
        <Route path="/my-location" element={
          <AppLayout>
            <Location />
          </AppLayout>
        } />
        <Route path="/my-portfolio" element={
          <AppLayout>
            <MyPortfolio />
          </AppLayout>
        } />
        <Route path="/my-profile" element={
          <AppLayout>
            <Profile />
          </AppLayout>
        } />
        <Route path="/models/:id" element={
          <AppLayout>
            <ModelProfile />
          </AppLayout>
        } />
        <Route path="/moderation" element={
          <AppLayout>
            <ModerationPanel />
          </AppLayout>
        } />
        <Route path="/forum/channels/:channelId" element={
          <AppLayout>
            <ChannelView />
          </AppLayout>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;