import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import ModelDirectory from "@/pages/ModelDirectory";
import ModelProfile from "@/pages/ModelProfile";
import Portfolio from "@/pages/Portfolio";
import Location from "@/pages/Location";
import Messages from "@/pages/Messages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/models"
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
        path="/portfolio"
        element={
          <PrivateRoute>
            <Portfolio />
          </PrivateRoute>
        }
      />
      <Route
        path="/location"
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
    </Routes>
  );
};