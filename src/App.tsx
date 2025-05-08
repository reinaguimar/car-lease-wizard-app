
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Index from './pages/Index';
import ContractsPage from './pages/ContractsPage';
import ArchivedContracts from './pages/ArchivedContracts';
import AuditLogsPage from './pages/AuditLogsPage';
import NotFound from './pages/NotFound';
import './App.css';
import './styles/base.css';
import './styles/contract.css';
import './styles/moove-theme.css';
import './styles/yoou-theme.css';
import { useEffect } from 'react';
import { ensureCompaniesExist } from './utils/initializeData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useEffect(() => {
    // Inicializar dados básicos do sistema
    ensureCompaniesExist().catch(console.error);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contracts/new" element={<Index />} />
          <Route path="/contracts" element={<ContractsPage />} />
          <Route path="/archived" element={<ArchivedContracts />} />
          <Route path="/audit" element={<AuditLogsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
