
import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";
import { Database } from '@/integrations/supabase/types';

// Get environment variables or provide fallback values for local development
const supabaseUrl = "https://oxkopqltbmwxrdobaims.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94a29wcWx0Ym13eHJkb2JhaW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTE2NjEsImV4cCI6MjA2MjI4NzY2MX0.kDQDRqu50p8voYWBl0SkjdDZj_tFrZ2wh92_p4le1JI";

// Create a Supabase client with the Supabase credentials
export const supabase = createClient<Database>(
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
  return true; // We're now using direct credentials instead of env vars
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
