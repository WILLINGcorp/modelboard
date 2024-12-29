import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { ProfileSetupGuard } from "@/components/auth/ProfileSetupGuard";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import ModelDirectory from "@/pages/ModelDirectory";
import Messages from "@/pages/Messages";
import Collabs from "@/pages/Collabs";
import Ads from "@/pages/Ads";
import Profile from "@/pages/Profile";
import Portfolio from "@/pages/Portfolio";
import Location from "@/pages/Location";
import ModelProfile from "@/pages/ModelProfile";
import Pricing from "@/pages/Pricing";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProfileSetupGuard>
              <Dashboard />
            </ProfileSetupGuard>
          </PrivateRoute>
        }
      />
      <Route
        path="/models"
        element={
          <PrivateRoute>
            <ProfileSetupGuard>
              <ModelDirectory />
            </ProfileSetupGuard>
          </PrivateRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoute>
            <ProfileSetupGuard>
              <Messages />
            </ProfileSetupGuard>
          </PrivateRoute>
        }
      />
      <Route
        path="/collabs"
        element={
          <PrivateRoute>
            <ProfileSetupGuard>
              <Collabs />
            </ProfileSetupGuard>
          </PrivateRoute>
        }
      />
      <Route
        path="/ads"
        element={
          <PrivateRoute>
            <ProfileSetupGuard>
              <Ads />
            </ProfileSetupGuard>
          </PrivateRoute>
        }
      />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route
        path="/portfolio"
        element={
          <PrivateRoute>
            <ProfileSetupGuard>
              <Portfolio />
            </ProfileSetupGuard>
          </PrivateRoute>
        }
      />
      <Route
        path="/location"
        element={
          <PrivateRoute>
            <ProfileSetupGuard>
              <Location />
            </ProfileSetupGuard>
          </PrivateRoute>
        }
      />
      <Route path="/models/:id" element={<ModelProfile />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
};