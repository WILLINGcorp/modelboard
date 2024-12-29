import React from 'react';
import { AppProviders } from './components/providers/AppProviders';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;