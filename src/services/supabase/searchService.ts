
import { supabase, handleSupabaseError } from './supabaseClient';
import { Contract } from './types';

export const searchContracts = async (searchTerm: string): Promise<Contract[]> => {
  try {
    // Busca por número de contrato, nome do cliente ou veículo
    const { data, error } = await supabase
      .from('contracts')
      .select(`
        *,
        clients:client_id(*),
        vehicles:vehicle_id(*),
        companies:company_id(*)
      `)
      .or(`contract_number.ilike.%${searchTerm}%`)
      .limit(50);
      
    if (error) throw error;
    
    return (data || []) as Contract[];
  } catch (error) {
    handleSupabaseError(error, 'busca de contratos');
    return [];
  }
};

// Função para buscar contratos com status específico, limitados e ordenados
export const getRecentContracts = async (limit: number = 5): Promise<Contract[]> => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .select(`
        *,
        clients:client_id(*),
        vehicles:vehicle_id(*),
        companies:company_id(*)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    
    return (data || []) as Contract[];
  } catch (error) {
    handleSupabaseError(error, 'busca de contratos recentes');
    return [];
  }
};
