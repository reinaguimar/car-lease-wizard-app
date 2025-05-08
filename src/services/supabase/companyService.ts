
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
    
    // Alterar para não usar .single() e verificar manualmente se há resultados
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('code', code);
      
    if (error) {
      console.error(`Erro ao buscar empresa com código ${code}:`, error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.warn(`Nenhuma empresa encontrada com o código ${code}`);
      return null;
    }
    
    console.log(`Empresa encontrada com código ${code}:`, data[0]);
    return data[0] as Company;
  } catch (error) {
    handleSupabaseError(error, `busca da empresa com código ${code}`);
    return null;
  }
};

export const getCompanyById = async (id: string): Promise<Company | null> => {
  try {
    console.log("Buscando empresa com ID:", id);
    
    // Alterar para não usar .single() e verificar manualmente se há resultados
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id);
      
    if (error) {
      console.error(`Erro ao buscar empresa com ID ${id}:`, error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.warn(`Nenhuma empresa encontrada com o ID ${id}`);
      return null;
    }
    
    console.log(`Empresa encontrada com ID ${id}:`, data[0]);
    return data[0] as Company;
  } catch (error) {
    handleSupabaseError(error, `busca da empresa com ID ${id}`);
    return null;
  }
};
