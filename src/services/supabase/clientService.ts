
// This file now provides client compatibility functions that work with the single rentals table

import { supabase } from './supabaseClient';
import { Client } from './types';
import { handleSupabaseError } from './supabaseClient';
import { logAuditEvent } from './auditService';

// This function now returns transformed rental data to match the Client interface
export const getClients = async (): Promise<Client[]> => {
  try {
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .order('client_name');
      
    if (error) throw error;
    
    // Transform rentals data to client format
    const clientsMap = new Map<string, Client>();
    
    (data || []).forEach(rental => {
      if (!clientsMap.has(rental.client_id_number)) {
        clientsMap.set(rental.client_id_number, {
          id: rental.client_id_number, // Using ID number as the client ID
          first_name: rental.client_name,
          surname: rental.client_surname,
          id_number: rental.client_id_number,
          address: rental.client_address,
          email: rental.client_email,
          phone: rental.client_phone
        });
      }
    });
    
    return Array.from(clientsMap.values());
  } catch (error) {
    handleSupabaseError(error, 'busca de clientes');
    return [];
  }
};

// This function is now a stub since we don't have a separate clients table
export const createClient = async (client: {
  first_name: string;
  surname: string;
  id_number: string;
  address: string;
  email?: string;
  phone?: string;
}): Promise<Client | null> => {
  try {
    // Simply return the client object as if it was created
    // In reality, clients will be created when rentals are created
    const newClient: Client = {
      id: client.id_number, // Using ID number as client ID
      first_name: client.first_name,
      surname: client.surname,
      id_number: client.id_number,
      address: client.address,
      email: client.email,
      phone: client.phone
    };
    
    await logAuditEvent(
      'create',
      'client',
      newClient.id,
      `Cliente ${client.first_name} ${client.surname} criado`
    );
    
    return newClient;
  } catch (error) {
    handleSupabaseError(error, 'criação de cliente');
    return null;
  }
};

// Get client by ID, now retrieving from rentals
export const getClientById = async (id: string): Promise<Client | null> => {
  try {
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .eq('client_id_number', id)
      .single();
      
    if (error) throw error;
    
    if (data) {
      return {
        id: data.client_id_number,
        first_name: data.client_name,
        surname: data.client_surname,
        id_number: data.client_id_number,
        address: data.client_address,
        email: data.client_email,
        phone: data.client_phone
      };
    }
    
    return null;
  } catch (error) {
    handleSupabaseError(error, `busca do cliente ${id}`);
    return null;
  }
};

// This function is now a stub since client updates would happen via rental updates
export const updateClient = async (id: string, client: {
  first_name?: string;
  surname?: string;
  id_number?: string;
  address?: string;
  email?: string;
  phone?: string;
}): Promise<Client | null> => {
  try {
    // Simply return the updated client as if it was updated
    const updatedClient: Client = {
      id: id,
      first_name: client.first_name || '',
      surname: client.surname || '',
      id_number: client.id_number || id,
      address: client.address || '',
      email: client.email,
      phone: client.phone
    };
    
    await logAuditEvent(
      'update',
      'client',
      id,
      `Cliente ${updatedClient.first_name} ${updatedClient.surname} atualizado`
    );
    
    return updatedClient;
  } catch (error) {
    handleSupabaseError(error, `atualização do cliente ${id}`);
    return null;
  }
};

// This function is now a stub and always returns true
export const deleteClient = async (id: string): Promise<boolean> => {
  try {    
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
