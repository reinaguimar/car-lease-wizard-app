
import { supabase } from './supabaseClient';
import { Company } from './types';

export const getCompanies = async (): Promise<Company[]> => {
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

export const getCompanyByCode = async (code: string): Promise<Company | null> => {
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
