
// Re-export types from Supabase
import type { Database } from '@/integrations/supabase/types';

export type Tables = Database['public']['Tables'];

// Define the simplified rental type that matches our database
export type Rental = Tables['rentals']['Row'];
export type NewRental = Tables['rentals']['Insert'];
export type UpdateRental = Tables['rentals']['Update'];

// For backwards compatibility with existing code
export type Client = {
  id: string;
  first_name: string;
  surname: string;
  id_number: string;
  address: string;
  email?: string | null;
  phone?: string | null;
};

export type Vehicle = {
  id: string;
  vehicle_type: string;
  make: string;
  model: string;
  fuel: string;
  license_plate?: string | null;
  year?: string | null;
  color?: string | null;
  company_id: string;
};

export type Contract = {
  id: string;
  contract_number: string;
  client_id?: string;
  vehicle_id?: string;
  company_id?: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  delivery_location: string;
  return_location: string;
  rental_rate: number;
  deposit: number;
  total_days: number;
  total_amount: number;
  sign_date: string;
  pdf_url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
};

export type Company = {
  id: string;
  name: string;
  code: string;
  logo_url?: string | null;
  theme_color?: string | null;
};
