
import { supabase } from './supabaseClient';
import { Vehicle } from './types';

export const getVehicles = async (companyId?: string): Promise<Vehicle[]> => {
  try {
    let query = supabase.from('vehicles').select('*');
    
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

export const createVehicle = async (vehicle: {
  vehicle_type: string;
  make: string;
  model: string;
  fuel: string;
  license_plate?: string;
  year?: string;
  color?: string;
  company_id: string;
}): Promise<Vehicle | null> => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicle])
      .select();
      
    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return null;
  }
};
