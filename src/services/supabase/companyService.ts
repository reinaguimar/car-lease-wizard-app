
import { supabase, handleSupabaseError } from './supabaseClient';
import { Company as CompanyType } from './types';
import { logAuditEvent } from './auditService';

export const getCompanies = async (): Promise<CompanyType[]> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*');
      
    if (error) throw error;
    return (data || []) as CompanyType[];
  } catch (error) {
    handleSupabaseError(error, 'busca de empresas');
    return [];
  }
};

export const getCompanyById = async (code: string): Promise<CompanyType | null> => {
  try {
    console.log(`Buscando empresa com código: ${code}`);
    
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('code', code)
      .single();
      
    if (error) {
      // Se não encontrou pelo código, vamos tentar pelo ID, pode ser que o código passado seja um ID
      const { data: dataById, error: errorById } = await supabase
        .from('companies')
        .select('*')
        .eq('id', code)
        .single();
        
      if (errorById) throw error; // Se ainda assim deu erro, lança o erro original
      return dataById as CompanyType;
    }
    
    console.log("Empresa encontrada:", data);
    return data as CompanyType;
  } catch (error) {
    handleSupabaseError(error, `busca da empresa ${code}`);
    return null;
  }
};

export const createCompany = async (company: {
  name: string;
  code: string;
  logo_url?: string;
  theme_color?: string;
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}): Promise<CompanyType | null> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .insert([company])
      .select();
      
    if (error) throw error;
    
    const newCompany = data?.[0] as CompanyType;
    
    if (newCompany) {
      await logAuditEvent(
        'create',
        'company',
        newCompany.id,
        `Empresa ${company.name} criada`
      );
    }
    
    return newCompany;
  } catch (error) {
    handleSupabaseError(error, 'criação de empresa');
    return null;
  }
};

export const updateCompany = async (id: string, company: {
  name?: string;
  code?: string;
  logo_url?: string;
  theme_color?: string;
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}): Promise<CompanyType | null> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .update(company)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    const updatedCompany = data?.[0] as CompanyType;
    
    if (updatedCompany) {
      await logAuditEvent(
        'update',
        'company',
        id,
        `Empresa ${updatedCompany.name} atualizada`
      );
    }
    
    return updatedCompany;
  } catch (error) {
    handleSupabaseError(error, `atualização da empresa ${id}`);
    return null;
  }
};

export const deleteCompany = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    await logAuditEvent(
      'delete',
      'company',
      id,
      'Empresa excluída'
    );
    
    return true;
  } catch (error) {
    handleSupabaseError(error, `exclusão da empresa ${id}`);
    return false;
  }
};
