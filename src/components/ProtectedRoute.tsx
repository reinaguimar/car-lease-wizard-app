import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { LoadingState } from './LoadingState';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingState />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
