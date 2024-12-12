import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "./components/layout/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MyProfile from "./pages/Profile";
import MyPortfolio from "./pages/Portfolio";
import Network from "./pages/ModelDirectory";
import ModelProfile from "./pages/ModelProfile";
import MyLocation from "./pages/Location";
import Communications from "./pages/Messages";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  if (!session) {
    return <Navigate to="/auth" />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
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
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;