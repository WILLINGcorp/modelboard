import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Messages from "@/pages/Messages";
import Collabs from "@/pages/Collabs";
import Ads from "@/pages/Ads";
import Profile from "@/pages/Profile";
import Portfolio from "@/pages/Portfolio";
import Location from "@/pages/Location";
import Pricing from "@/pages/Pricing";
import ModelProfile from "@/pages/ModelProfile";
import ModelDirectory from "@/pages/ModelDirectory";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { ProfileSetupGuard } from "@/components/auth/ProfileSetupGuard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<ProfileSetupGuard />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/collabs" element={<Collabs />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/my-portfolio" element={<Portfolio />} />
          <Route path="/my-location" element={<Location />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/network" element={<ModelDirectory />} />
          <Route path="/models/:id" element={<ModelProfile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;