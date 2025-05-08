
import { createClient as supabaseCreateClient } from '@supabase/supabase-js';

// Check if environment variables are available and provide fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: ReturnType<typeof supabaseCreateClient>;

// Create a conditional client initialization
try {
  if (!supabaseUrl) {
    throw new Error('Supabase URL is not configured');
  }
  
  supabase = supabaseCreateClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Create a mock client that returns empty data for development/testing
  supabase = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: [], error: null }),
      update: () => ({ data: [], error: null }),
      eq: () => ({ data: [], error: null }),
      single: () => ({ data: {}, error: null })
    })
  } as any;
}

export { supabase };
