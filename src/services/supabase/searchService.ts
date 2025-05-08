
import { supabase } from './supabaseClient';
import { Rental } from './types';

export const searchContracts = async (searchTerm: string): Promise<Rental[]> => {
  try {
    // If search term is empty, return only recent rentals
    if (!searchTerm.trim()) {
      return getRecentRentals(10);
    }
    
    // Search by contract number, client name or vehicle details
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .or(`contract_number.ilike.%${searchTerm}%,client_name.ilike.%${searchTerm}%,client_surname.ilike.%${searchTerm}%,vehicle_make.ilike.%${searchTerm}%,vehicle_model.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (error) {
      console.error('Error searching rentals:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error searching rentals:', error);
    return [];
  }
};

// Function to get recent rentals, limited and ordered
export const getRecentRentals = async (limit: number = 5): Promise<Rental[]> => {
  try {
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching recent rentals:', error);
      throw error;
    }
    
    console.log('Recent rentals:', data);
    return data || [];
  } catch (error) {
    console.error('Error fetching recent rentals:', error);
    return [];
  }
};

// Function to get rentals by status
export const getRentalsByStatus = async (status: string, limit: number = 20): Promise<Rental[]> => {
  try {
    console.log(`Fetching rentals with status: ${status}`);
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error(`Error fetching rentals with status ${status}:`, error);
      throw error;
    }
    
    console.log(`Rentals with status ${status}:`, data);
    return data || [];
  } catch (error) {
    console.error(`Error fetching rentals with status ${status}:`, error);
    return [];
  }
};
