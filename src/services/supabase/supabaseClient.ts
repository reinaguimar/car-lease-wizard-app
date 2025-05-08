
import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

// Get environment variables or provide fallbacks for local development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';

// Check if the required environment variables are set
if (!supabaseUrl || !supabaseKey) {
  const missingVars = [];
  if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL');
  if (!supabaseKey) missingVars.push('VITE_SUPABASE_KEY');
  
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

// Create a Supabase client with the environment variables
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

// Helper to detect if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseKey);
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
