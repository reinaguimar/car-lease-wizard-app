
import { supabase } from './supabaseClient';
import { Client } from './types';
import { handleSupabaseError } from './supabaseClient';
import { logAuditEvent } from './auditService';

export const getClients = async (): Promise<Client[]> => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*');
      
    if (error) throw error;
    return (data || []) as Client[];
  } catch (error) {
    handleSupabaseError(error, 'busca de clientes');
    return [];
  }
};

export const createClient = async (client: {
  first_name: string;
  surname: string;
  id_number: string;
  address: string;
  email?: string;
  phone?: string;
}): Promise<Client | null> => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select();
      
    if (error) throw error;
    
    const newClient = data?.[0] as Client;
    
    if (newClient) {
      await logAuditEvent(
        'create',
        'client',
        newClient.id,
        `Cliente ${client.first_name} ${client.surname} criado`
      );
    }
    
    return newClient;
  } catch (error) {
    handleSupabaseError(error, 'criação de cliente');
    return null;
  }
};

export const getClientById = async (id: string): Promise<Client | null> => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as Client;
  } catch (error) {
    handleSupabaseError(error, `busca do cliente ${id}`);
    return null;
  }
};

export const updateClient = async (id: string, client: {
  first_name?: string;
  surname?: string;
  id_number?: string;
  address?: string;
  email?: string;
  phone?: string;
}): Promise<Client | null> => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .update(client)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    const updatedClient = data?.[0] as Client;
    
    if (updatedClient) {
      await logAuditEvent(
        'update',
        'client',
        id,
        `Cliente ${updatedClient.first_name} ${updatedClient.surname} atualizado`
      );
    }
    
    return updatedClient;
  } catch (error) {
    handleSupabaseError(error, `atualização do cliente ${id}`);
    return null;
  }
};

export const deleteClient = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    await logAuditEvent(
      'delete',
      'client',
      id,
      'Cliente excluído'
    );
    
    return true;
  } catch (error) {
    handleSupabaseError(error, `exclusão do cliente ${id}`);
    return false;
  }
};
