
import { supabase } from './supabaseClient';
import { Vehicle } from './types';
import { handleSupabaseError } from './supabaseClient';
import { logAuditEvent } from './auditService';

export const getVehicles = async (companyId?: string): Promise<Vehicle[]> => {
  try {
    let query = supabase.from('vehicles').select('*');
    
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data || []) as Vehicle[];
  } catch (error) {
    handleSupabaseError(error, 'busca de veículos');
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
    
    const newVehicle = data?.[0] as Vehicle;
    
    if (newVehicle) {
      await logAuditEvent(
        'create',
        'vehicle',
        newVehicle.id,
        `Veículo ${vehicle.make} ${vehicle.model} criado`
      );
    }
    
    return newVehicle;
  } catch (error) {
    handleSupabaseError(error, 'criação de veículo');
    return null;
  }
};

export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data as Vehicle;
  } catch (error) {
    handleSupabaseError(error, `busca do veículo ${id}`);
    return null;
  }
};

export const updateVehicle = async (id: string, vehicle: {
  vehicle_type?: string;
  make?: string;
  model?: string;
  fuel?: string;
  license_plate?: string;
  year?: string;
  color?: string;
}): Promise<Vehicle | null> => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .update(vehicle)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    const updatedVehicle = data?.[0] as Vehicle;
    
    if (updatedVehicle) {
      await logAuditEvent(
        'update',
        'vehicle',
        id,
        `Veículo ${updatedVehicle.make} ${updatedVehicle.model} atualizado`
      );
    }
    
    return updatedVehicle;
  } catch (error) {
    handleSupabaseError(error, `atualização do veículo ${id}`);
    return null;
  }
};

export const deleteVehicle = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    await logAuditEvent(
      'delete',
      'vehicle',
      id,
      'Veículo excluído'
    );
    
    return true;
  } catch (error) {
    handleSupabaseError(error, `exclusão do veículo ${id}`);
    return false;
  }
};
