
import { supabase } from './supabaseClient';
import { Vehicle } from './types';
import { handleSupabaseError } from './supabaseClient';
import { logAuditEvent } from './auditService';

// Mock vehicles for stub implementation
const mockVehicles: Vehicle[] = [
  {
    id: 'mock-vehicle-1',
    vehicle_type: 'Car',
    make: 'Toyota',
    model: 'Corolla',
    fuel: 'Gasoline',
    license_plate: 'ABC-1234',
    year: '2022',
    color: 'Silver',
    company_id: 'moove'
  },
  {
    id: 'mock-vehicle-2',
    vehicle_type: 'SUV',
    make: 'Honda',
    model: 'CR-V',
    fuel: 'Gasoline',
    license_plate: 'DEF-5678',
    year: '2023',
    color: 'Black',
    company_id: 'moove'
  },
  {
    id: 'mock-vehicle-3',
    vehicle_type: 'Truck',
    make: 'Ford',
    model: 'Ranger',
    fuel: 'Diesel',
    license_plate: 'GHI-9012',
    year: '2021',
    color: 'White',
    company_id: 'yoou'
  }
];

export const getVehicles = async (companyId?: string): Promise<Vehicle[]> => {
  try {
    console.log('Getting vehicles (stub):', companyId);
    
    // If companyId is provided, filter the mock vehicles
    if (companyId) {
      return mockVehicles.filter(vehicle => vehicle.company_id === companyId);
    }
    
    return [...mockVehicles];
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
    console.log('Creating vehicle (stub):', vehicle);
    
    // Create a new mock vehicle
    const newVehicle: Vehicle = {
      id: `mock-vehicle-${Date.now()}`,
      vehicle_type: vehicle.vehicle_type,
      make: vehicle.make,
      model: vehicle.model,
      fuel: vehicle.fuel,
      license_plate: vehicle.license_plate,
      year: vehicle.year,
      color: vehicle.color,
      company_id: vehicle.company_id
    };
    
    // Log audit event
    await logAuditEvent(
      'create',
      'vehicle',
      newVehicle.id,
      `Veículo ${vehicle.make} ${vehicle.model} criado`
    );
    
    return newVehicle;
  } catch (error) {
    handleSupabaseError(error, 'criação de veículo');
    return null;
  }
};

export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  try {
    console.log('Getting vehicle by ID (stub):', id);
    
    // Find the vehicle in our mock data
    const vehicle = mockVehicles.find(v => v.id === id);
    
    if (!vehicle) {
      return null;
    }
    
    return { ...vehicle };
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
    console.log('Updating vehicle (stub):', id, vehicle);
    
    // Find the vehicle in our mock data
    const existingVehicle = mockVehicles.find(v => v.id === id);
    
    if (!existingVehicle) {
      return null;
    }
    
    // Create an updated vehicle
    const updatedVehicle: Vehicle = {
      ...existingVehicle,
      ...vehicle
    };
    
    // Log audit event
    await logAuditEvent(
      'update',
      'vehicle',
      id,
      `Veículo ${updatedVehicle.make} ${updatedVehicle.model} atualizado`
    );
    
    return updatedVehicle;
  } catch (error) {
    handleSupabaseError(error, `atualização do veículo ${id}`);
    return null;
  }
};

export const deleteVehicle = async (id: string): Promise<boolean> => {
  try {
    console.log('Deleting vehicle (stub):', id);
    
    // Log audit event
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
