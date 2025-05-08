
import { supabase } from './supabaseClient';
import { Company } from './types';
import { handleSupabaseError } from './supabaseClient';

export const getCompanies = async (): Promise<Company[]> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*');
      
    if (error) throw error;
    return (data || []) as Company[];
  } catch (error) {
    handleSupabaseError(error, 'busca de empresas');
    return [];
  }
};

export const getCompanyByCode = async (code: string): Promise<Company | null> => {
  try {
    console.log("Buscando empresa com código:", code);
    
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('code', code)
      .single();
      
    if (error) {
      console.error(`Erro ao buscar empresa com código ${code}:`, error);
      throw error;
    }
    
    console.log("Empresa encontrada:", data);
    return data as Company;
  } catch (error) {
    handleSupabaseError(error, `busca da empresa com código ${code}`);
    return null;
  }
};

export const getCompanyById = async (id: string): Promise<Company | null> => {
  try {
    console.log("Buscando empresa com ID:", id);
    
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Erro ao buscar empresa com ID ${id}:`, error);
      throw error;
    }
    
    console.log("Empresa encontrada:", data);
    return data as Company;
  } catch (error) {
    handleSupabaseError(error, `busca da empresa com ID ${id}`);
    return null;
  }
};
