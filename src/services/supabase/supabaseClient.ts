
import { createClient } from '@supabase/supabase-js';

// Get environment variables or provide fallbacks for local development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';

// Check if the required environment variables are set
if (!supabaseUrl) {
  console.error('Supabase URL is not configured. Please set VITE_SUPABASE_URL environment variable.');
}

if (!supabaseKey) {
  console.error('Supabase Key is not configured. Please set VITE_SUPABASE_KEY environment variable.');
}

// Create a Supabase client with the environment variables
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
