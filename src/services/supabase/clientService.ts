
import { supabase } from './supabaseClient';
import { Client } from './types';

export const getClients = async (): Promise<Client[]> => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*');
      
    if (error) throw error;
    return data as Client[] || [];
  } catch (error) {
    console.error('Error fetching clients:', error);
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
    return data?.[0] as Client;
  } catch (error) {
    console.error('Error creating client:', error);
    return null;
  }
};
