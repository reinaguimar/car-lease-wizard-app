
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for the entire app
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getCompanies = async () => {
  const { data, error } = await supabase
    .from('companies')
    .select('*');
    
  if (error) throw error;
  return data;
};

export const getCompanyByCode = async (code: string) => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('code', code)
    .single();
    
  if (error) throw error;
  return data;
};

export const getClients = async () => {
  const { data, error } = await supabase
    .from('clients')
    .select('*');
    
  if (error) throw error;
  return data;
};

export const createClient = async (client: {
  first_name: string;
  surname: string;
  id_number: string;
  address: string;
  email?: string;
  phone?: string;
}) => {
  const { data, error } = await supabase
    .from('clients')
    .insert([client])
    .select();
    
  if (error) throw error;
  return data[0];
};

export const getVehicles = async (companyId?: string) => {
  let query = supabase.from('vehicles').select('*');
  
  if (companyId) {
    query = query.eq('company_id', companyId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
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
  const { data, error } = await supabase
    .from('vehicles')
    .insert([vehicle])
    .select();
    
  if (error) throw error;
  return data[0];
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
  const { data, error } = await supabase
    .from('contracts')
    .insert([contract])
    .select();
    
  if (error) throw error;
  return data[0];
};

export const getContracts = async (options?: {
  clientId?: string;
  vehicleId?: string;
  companyId?: string;
  status?: string;
}) => {
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
  return data;
};

export const updateContractStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('contracts')
    .update({ status })
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data[0];
};

export const updateContractPdfUrl = async (id: string, pdf_url: string) => {
  const { data, error } = await supabase
    .from('contracts')
    .update({ pdf_url })
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data[0];
};
