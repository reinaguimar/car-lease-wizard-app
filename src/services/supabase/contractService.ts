
import { supabase, handleSupabaseError, validateSupabaseResponse } from './supabaseClient';
import { Contract } from './types';
import { logAuditEvent } from './auditService';

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
}): Promise<Contract | null> => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .insert([contract])
      .select();
      
    if (error) throw error;
    
    const newContract = data?.[0] as Contract;
    
    if (newContract) {
      // Log audit event
      await logAuditEvent(
        'create', 
        'contract', 
        newContract.id, 
        `Contrato ${contract.contract_number} criado`
      );
    }
    
    return newContract;
  } catch (error) {
    handleSupabaseError(error, 'criação de contrato');
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
    return (data || []) as unknown as Contract[];
  } catch (error) {
    handleSupabaseError(error, 'busca de contratos');
    return [];
  }
};

export const updateContractStatus = async (id: string, status: string): Promise<Contract | null> => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .update({ status })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    const updatedContract = data?.[0] as Contract;
    
    if (updatedContract) {
      // Log audit event
      await logAuditEvent(
        'update', 
        'contract', 
        id, 
        `Status do contrato alterado para: ${status}`
      );
    }
    
    return updatedContract;
  } catch (error) {
    handleSupabaseError(error, `atualização de status do contrato ${id}`);
    return null;
  }
};

export const updateContractPdfUrl = async (id: string, pdf_url: string): Promise<Contract | null> => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .update({ pdf_url })
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    const updatedContract = data?.[0] as Contract;
    
    if (updatedContract) {
      // Log audit event
      await logAuditEvent(
        'update', 
        'contract', 
        id, 
        'URL de PDF do contrato atualizada'
      );
    }
    
    return updatedContract;
  } catch (error) {
    handleSupabaseError(error, `atualização de URL do PDF do contrato ${id}`);
    return null;
  }
};

export const deleteContract = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('contracts')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    // Log audit event
    await logAuditEvent('delete', 'contract', id, 'Contrato excluído');
    
    return true;
  } catch (error) {
    handleSupabaseError(error, `exclusão do contrato ${id}`);
    return false;
  }
};

export const getContractById = async (id: string): Promise<Contract | null> => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .select(`
        *,
        clients:client_id(*),
        vehicles:vehicle_id(*),
        companies:company_id(*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    // Log viewing of contract
    await logAuditEvent('view', 'contract', id);
    
    return data as Contract;
  } catch (error) {
    handleSupabaseError(error, `busca do contrato ${id}`);
    return null;
  }
};
