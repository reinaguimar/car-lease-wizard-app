
import { supabase, handleSupabaseError } from './supabaseClient';
import { Contract } from './types';
import { logAuditEvent } from './auditService';

export const searchContracts = async (searchTerm: string): Promise<Contract[]> => {
  try {
    // Trim and clean the search term
    const term = searchTerm.trim();
    
    if (!term) return [];

    // Create a query to search in multiple fields
    const { data, error } = await supabase
      .from('contracts')
      .select(`
        *,
        clients:client_id(*),
        vehicles:vehicle_id(*),
        companies:company_id(*)
      `)
      .or(`
        contract_number.ilike.%${term}%,
        clients.first_name.ilike.%${term}%,
        clients.surname.ilike.%${term}%,
        vehicles.make.ilike.%${term}%,
        vehicles.model.ilike.%${term}%,
        vehicles.license_plate.ilike.%${term}%
      `);

    if (error) throw error;
    
    // Log search event
    await logAuditEvent(
      'search',
      'contract',
      'all',
      `Busca por: ${term}`
    );
    
    return (data as unknown as Contract[]) || [];
  } catch (error) {
    handleSupabaseError(error, 'busca de contratos');
    return [];
  }
};

export const advancedSearchContracts = async (filters: {
  contractNumber?: string;
  clientName?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  licensePlate?: string;
  startDate?: string;
  endDate?: string;
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
    
    // Apply filters if they exist
    if (filters.contractNumber) {
      query = query.ilike('contract_number', `%${filters.contractNumber}%`);
    }
    
    if (filters.clientName) {
      query = query.or(`clients.first_name.ilike.%${filters.clientName}%,clients.surname.ilike.%${filters.clientName}%`);
    }
    
    if (filters.vehicleMake) {
      query = query.ilike('vehicles.make', `%${filters.vehicleMake}%`);
    }
    
    if (filters.vehicleModel) {
      query = query.ilike('vehicles.model', `%${filters.vehicleModel}%`);
    }
    
    if (filters.licensePlate) {
      query = query.ilike('vehicles.license_plate', `%${filters.licensePlate}%`);
    }
    
    if (filters.startDate) {
      query = query.gte('start_date', filters.startDate);
    }
    
    if (filters.endDate) {
      query = query.lte('end_date', filters.endDate);
    }
    
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    // Log advanced search event
    await logAuditEvent(
      'search',
      'contract',
      'all',
      `Busca avançada: ${JSON.stringify(filters)}`
    );
    
    return (data as unknown as Contract[]) || [];
  } catch (error) {
    handleSupabaseError(error, 'busca avançada de contratos');
    return [];
  }
};
