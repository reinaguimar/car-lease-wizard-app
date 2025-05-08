
import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

// Get environment variables or provide fallback values for local development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'placeholder-key';

// Check if the real environment variables are set
const areMissingEnvVars = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_KEY;
if (areMissingEnvVars) {
  const missingVars = [];
  if (!import.meta.env.VITE_SUPABASE_URL) missingVars.push('VITE_SUPABASE_URL');
  if (!import.meta.env.VITE_SUPABASE_KEY) missingVars.push('VITE_SUPABASE_KEY');
  
  const errorMessage = `Variáveis de ambiente Supabase não configuradas: ${missingVars.join(', ')}`;
  console.error(errorMessage);
  
  // Show toast only in browser environment to avoid SSR issues
  if (typeof window !== 'undefined') {
    toast.error(errorMessage, {
      description: "Configure as variáveis no arquivo .env ou .env.local",
      duration: 10000
    });
  }
}

// Create a Supabase client with the environment variables or fallbacks
export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    }
  }
);

// Helper to detect if Supabase is properly configured with real credentials
export const isSupabaseConfigured = () => {
  return !areMissingEnvVars;
};

// Helper function to handle query errors consistently
export const handleSupabaseError = (error: any, operation: string): void => {
  const errorMessage = `Erro durante ${operation}: ${error.message || 'Desconhecido'}`;
  console.error(errorMessage, error);
  
  if (typeof window !== 'undefined') {
    toast.error(errorMessage, {
      description: "Verifique a conexão com o Supabase e tente novamente",
      duration: 5000
    });
  }
};

// Helper function to check if data exists in response
export const validateSupabaseResponse = <T>(data: T | null, errorMessage: string): T => {
  if (!data) {
    const error = new Error(errorMessage);
    handleSupabaseError(error, 'validação de dados');
    throw error;
  }
  return data;
};
