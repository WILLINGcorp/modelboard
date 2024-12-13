import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Portfolio from "@/pages/Portfolio";
import Location from "@/pages/Location";
import Messages from "@/pages/Messages";
import ModelDirectory from "@/pages/ModelDirectory";
import ModelProfile from "@/pages/ModelProfile";
import ModerationDashboard from "@/pages/ModerationDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
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
        path="/my-portfolio"
        element={
          <PrivateRoute>
            <Portfolio />
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
        path="/messages"
        element={
          <PrivateRoute>
            <Messages />
          </PrivateRoute>
        }
      />
      <Route path="/models" element={<ModelDirectory />} />
      <Route path="/models/:id" element={<ModelProfile />} />
      <Route
        path="/moderation"
        element={
          <PrivateRoute>
            <ModerationDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;