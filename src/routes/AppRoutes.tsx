import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ModelDirectory from "@/pages/ModelDirectory";
import ModelProfile from "@/pages/ModelProfile";
import Messages from "@/pages/Messages";
import Location from "@/pages/Location";
import Portfolio from "@/pages/Portfolio";
import Profile from "@/pages/Profile";
import Collabs from "@/pages/Collabs";
import Ads from "@/pages/Ads";
import Pricing from "@/pages/Pricing";
import { ModerationPanel } from "@/components/moderation/ModerationPanel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/moderation"
        element={
          <PrivateRoute>
            <ModerationPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="/network"
        element={
          <PrivateRoute>
            <ModelDirectory />
          </PrivateRoute>
        }
      />
      <Route
        path="/models/:id"
        element={
          <PrivateRoute>
            <ModelProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoute>
            <Messages />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-location"
        element={
          <PrivateRoute>
            <Location />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-portfolio"
        element={
          <PrivateRoute>
            <Portfolio />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/collabs"
        element={
          <PrivateRoute>
            <Collabs />
          </PrivateRoute>
        }
      />
      <Route
        path="/ads"
        element={
          <PrivateRoute>
            <Ads />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;