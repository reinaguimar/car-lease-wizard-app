
import { supabase } from './supabaseClient';
import { Contract } from './types';

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
    return (data as unknown as Contract[]) || [];
  } catch (error) {
    console.error('Error searching contracts:', error);
    return [];
  }
};
