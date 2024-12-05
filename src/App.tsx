import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import ModelDirectory from "./pages/ModelDirectory";
import ModelProfile from "./pages/ModelProfile";
import TravelPlans from "./pages/TravelPlans";

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
            path="/portfolio"
            element={
              <PrivateRoute>
                <Portfolio />
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
          <Route path="/models/:id" element={<ModelProfile />} />
          <Route
            path="/travel"
            element={
              <PrivateRoute>
                <TravelPlans />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;