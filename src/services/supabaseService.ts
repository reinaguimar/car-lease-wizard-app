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

// Define types for our database entities
export interface Company {
  id: string;
  name: string;
  code: string;
  // Add other company fields as needed
}

export interface Client {
  id: string;
  first_name: string;
  surname: string;
  id_number: string;
  address: string;
  email?: string;
  phone?: string;
}

export interface Vehicle {
  id: string;
  vehicle_type: string;
  make: string;
  model: string;
  fuel: string;
  license_plate?: string;
  year?: string;
  color?: string;
  company_id: string;
}

export interface Contract {
  id: string;
  contract_number: string;
  client_id: string;
  vehicle_id: string;
  company_id: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  delivery_location: string;
  return_location: string;
  rental_rate: number;
  deposit: number;
  sign_date: string;
  pdf_url?: string;
  status?: string;
  clients?: Client;
  vehicles?: Vehicle;
  companies?: Company;
}

export const getCompanies = async () => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
};

export const getCompanyByCode = async (code: string) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('code', code)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching company with code ${code}:`, error);
    return null;
  }
};

export const getClients = async () => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*');
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
};

export const createClient = async (client: {
  first_name: string;
  surname: string;
  id_number: string;
  address: string;
  email?: string;
  phone?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select();
      
    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error creating client:', error);
    return null;
  }
};

export const getVehicles = async (companyId?: string) => {
  try {
    let query = supabase.from('vehicles').select('*');
    
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

export const createVehicle = async (vehicle: {
  vehicle_type: string;
  make: string;
  model: string;
  fuel: string;
  license_plate?: string;
  year?: string;
  color?: string;
  company_id: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicle])
      .select();
      
    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return null;
  }
};

export const createContract = async (contract: {
  contract_number: string;
  client_id: string;
  vehicle_id: string;
  company_id: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  delivery_location: string;
  return_location: string;
  rental_rate: number;
  deposit: number;
  sign_date: string;
  pdf_url?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .insert([contract])
      .select();
      
    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error creating contract:', error);
    return null;
  }
};

export const getContracts = async (options?: {
  clientId?: string;
  vehicleId?: string;
  companyId?: string;
  status?: string;
}): Promise<Contract[]> => {
  try {
    let query = supabase
      .from('contracts')
      .select(`
        *,
        clients:client_id(*),
        vehicles:vehicle_id(*),
        companies:company_id(*)
      `);
    
    if (options?.clientId) {
      query = query.eq('client_id', options.clientId);
    }
    
    if (options?.vehicleId) {
      query = query.eq('vehicle_id', options.vehicleId);
    }
    
    if (options?.companyId) {
      query = query.eq('company_id', options.companyId);
    }
    
    if (options?.status) {
      query = query.eq('status', options.status);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data as unknown as Contract[]) || [];
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return [];
  }
};

export const updateContractStatus = async (id: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .update({ status })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error(`Error updating contract ${id} status to ${status}:`, error);
    return null;
  }
};

export const updateContractPdfUrl = async (id: string, pdf_url: string) => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .update({ pdf_url })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error(`Error updating contract ${id} PDF URL:`, error);
    return null;
  }
};
