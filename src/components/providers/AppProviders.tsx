import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

// Initialize QueryClient outside of component to avoid re-creation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <TooltipProvider delayDuration={0}>
              <AppLayout>
                {children}
                <Toaster />
                <Sonner />
              </AppLayout>
            </TooltipProvider>
          </React.Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default AppProviders;