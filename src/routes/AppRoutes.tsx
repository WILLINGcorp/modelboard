import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import MyProfile from "@/pages/Profile";
import MyPortfolio from "@/pages/Portfolio";
import Network from "@/pages/ModelDirectory";
import ModelProfile from "@/pages/ModelProfile";
import MyLocation from "@/pages/Location";
import Communications from "@/pages/Messages";
import Dashboard from "@/pages/Dashboard";
import Collabs from "@/pages/Collabs";

export const AppRoutes = () => {
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
            <MyProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-portfolio"
        element={
          <PrivateRoute>
            <MyPortfolio />
          </PrivateRoute>
        }
      />
      <Route
        path="/network"
        element={
          <PrivateRoute>
            <Network />
          </PrivateRoute>
        }
      />
      <Route path="/models/:id" element={<ModelProfile />} />
      <Route
        path="/my-location"
        element={
          <PrivateRoute>
            <MyLocation />
          </PrivateRoute>
        }
      />
      <Route
        path="/communications"
        element={
          <PrivateRoute>
            <Communications />
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
    </Routes>
  );
};