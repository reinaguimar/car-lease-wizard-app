
// Re-exporte dos tipos do Supabase
import type { Database } from '@/integrations/supabase/types';

export type Tables = Database['public']['Tables'];

// Tipos para os clientes
export type Client = Tables['clients']['Row'];
export type NewClient = Tables['clients']['Insert'];
export type UpdateClient = Tables['clients']['Update'];

// Tipos para os veículos
export type Vehicle = Tables['vehicles']['Row'];
export type NewVehicle = Tables['vehicles']['Insert'];
export type UpdateVehicle = Tables['vehicles']['Update'];

// Tipos para os contratos
export type Contract = {
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
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  // Foreign tables
  clients?: Client;
  vehicles?: Vehicle;
  companies?: Company;
};

// Tipos para auditoria
export type AuditLog = Tables['audit_logs']['Row'];
export type NewAuditLog = Tables['audit_logs']['Insert'];

// Tipos para empresas
export type Company = Tables['companies']['Row'];
export type NewCompany = Tables['companies']['Insert'];
export type UpdateCompany = Tables['companies']['Update'];
