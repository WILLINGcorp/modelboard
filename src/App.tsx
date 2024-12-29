import React from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import { AppRoutes } from "@/routes/AppRoutes";

const App = () => (
  <AppProviders>
    <AppRoutes />
  </AppProviders>
);

export default App;