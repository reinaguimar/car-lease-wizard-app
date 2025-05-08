
import { supabase } from './supabaseClient';
import { Contract, Rental } from './types';
import { logAuditEvent } from './auditService';
import { getRentals } from './rentalService';

// Convert a Rental object to a Contract object for legacy compatibility
const rentalToContract = (rental: Rental): Contract => {
  return {
    id: rental.id,
    contract_number: rental.contract_number,
    
    // Client information directly embedded
    client_name: rental.client_name,
    client_surname: rental.client_surname,
    client_id_number: rental.client_id_number,
    client_address: rental.client_address,
    client_email: rental.client_email || null,
    client_phone: rental.client_phone || null,
    
    // Vehicle information directly embedded
    vehicle_type: rental.vehicle_type,
    vehicle_make: rental.vehicle_make,
    vehicle_model: rental.vehicle_model,
    vehicle_fuel: rental.vehicle_fuel,
    vehicle_license_plate: rental.vehicle_license_plate || null,
    vehicle_year: rental.vehicle_year || null,
    vehicle_color: rental.vehicle_color || null,
    
    // Company information directly embedded
    company_name: rental.company_name,
    company_code: rental.company_code,
    company_logo_url: rental.company_logo_url || null,
    company_theme_color: rental.company_theme_color || null,
    
    // Rental period
    start_date: rental.start_date,
    start_time: rental.start_time,
    end_date: rental.end_date,
    end_time: rental.end_time,
    delivery_location: rental.delivery_location,
    return_location: rental.return_location,
    
    // Financial information
    rental_rate: rental.rental_rate,
    deposit: rental.deposit,
    total_days: rental.total_days,
    total_amount: rental.total_amount,
    
    // Contract metadata
    sign_date: rental.sign_date,
    pdf_url: rental.pdf_url,
    status: rental.status,
    created_at: rental.created_at
  };
};

// Convert a Contract object to a Rental object for database operations
const contractToRental = (contract: {
  contract_number: string;
  client_id?: string;
  vehicle_id?: string;
  company_id?: string;
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
  status?: string;
}): Partial<Rental> => {
  // In a real implementation, this would properly map contract fields to rental fields
  return {
    contract_number: contract.contract_number,
    start_date: contract.start_date,
    start_time: contract.start_time,
    end_date: contract.end_date,
    end_time: contract.end_time,
    delivery_location: contract.delivery_location,
    return_location: contract.return_location,
    rental_rate: contract.rental_rate,
    deposit: contract.deposit,
    sign_date: contract.sign_date,
    pdf_url: contract.pdf_url,
    status: contract.status || 'active'
  };
};

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
  status?: string;
}): Promise<Contract | null> => {
  try {
    // This is a stub - in a real implementation, we would create a rental record
    console.log('Creating contract (stub):', contract);
    
    // Log audit event
    await logAuditEvent(
      'create', 
      'contract', 
      'new', 
      `Contrato ${contract.contract_number} criado (stub)`
    );
    
    // Return a mock contract
    return {
      id: 'mock-id',
      contract_number: contract.contract_number,
      client_name: 'Mock Client',
      client_surname: 'Mock Surname',
      client_id_number: 'Mock ID',
      client_address: 'Mock Address',
      client_email: null,
      client_phone: null,
      vehicle_type: 'Mock Vehicle Type',
      vehicle_make: 'Mock Make',
      vehicle_model: 'Mock Model',
      vehicle_fuel: 'Mock Fuel',
      vehicle_license_plate: null,
      vehicle_year: null,
      vehicle_color: null,
      company_name: 'Mock Company',
      company_code: 'mock',
      company_logo_url: null,
      company_theme_color: null,
      start_date: contract.start_date,
      start_time: contract.start_time,
      end_date: contract.end_date,
      end_time: contract.end_time,
      delivery_location: contract.delivery_location,
      return_location: contract.return_location,
      rental_rate: contract.rental_rate,
      deposit: contract.deposit,
      total_days: 1,
      total_amount: contract.rental_rate,
      sign_date: contract.sign_date,
      pdf_url: contract.pdf_url,
      status: contract.status || 'active',
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error creating contract:', error);
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
    // Use the rentals service to get rentals
    const rentals = await getRentals(options ? { status: options.status } : undefined);
    
    // Convert rentals to contracts
    return rentals.map(rentalToContract);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return [];
  }
};

export const updateContractStatus = async (id: string, status: string): Promise<Contract | null> => {
  try {
    // This is a stub - in a real implementation, we would update the rental status
    console.log('Updating contract status (stub):', id, status);
    
    // Log audit event
    await logAuditEvent(
      'update', 
      'contract', 
      id, 
      `Status do contrato alterado para: ${status} (stub)`
    );
    
    // Return a mock updated contract
    return {
      id,
      contract_number: 'MOCK-NUMBER',
      client_name: 'Mock Client',
      client_surname: 'Mock Surname',
      client_id_number: 'Mock ID',
      client_address: 'Mock Address',
      client_email: null,
      client_phone: null,
      vehicle_type: 'Mock Vehicle Type',
      vehicle_make: 'Mock Make',
      vehicle_model: 'Mock Model',
      vehicle_fuel: 'Mock Fuel',
      vehicle_license_plate: null,
      vehicle_year: null,
      vehicle_color: null,
      company_name: 'Mock Company',
      company_code: 'mock',
      company_logo_url: null,
      company_theme_color: null,
      start_date: '2025-01-01',
      start_time: '10:00 AM',
      end_date: '2025-01-05',
      end_time: '10:00 AM',
      delivery_location: 'Mock Location',
      return_location: 'Mock Location',
      rental_rate: 100,
      deposit: 500,
      total_days: 5,
      total_amount: 500,
      sign_date: '2025-01-01',
      pdf_url: null,
      status,
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error updating contract status:', error);
    return null;
  }
};

export const updateContractPdfUrl = async (id: string, pdf_url: string): Promise<Contract | null> => {
  try {
    // This is a stub - in a real implementation, we would update the rental PDF URL
    console.log('Updating contract PDF URL (stub):', id, pdf_url);
    
    // Log audit event
    await logAuditEvent(
      'update', 
      'contract', 
      id, 
      'URL de PDF do contrato atualizada (stub)'
    );
    
    // Return a mock updated contract
    return {
      id,
      contract_number: 'MOCK-NUMBER',
      client_name: 'Mock Client',
      client_surname: 'Mock Surname',
      client_id_number: 'Mock ID',
      client_address: 'Mock Address',
      client_email: null,
      client_phone: null,
      vehicle_type: 'Mock Vehicle Type',
      vehicle_make: 'Mock Make',
      vehicle_model: 'Mock Model',
      vehicle_fuel: 'Mock Fuel',
      vehicle_license_plate: null,
      vehicle_year: null,
      vehicle_color: null,
      company_name: 'Mock Company',
      company_code: 'mock',
      company_logo_url: null,
      company_theme_color: null,
      start_date: '2025-01-01',
      start_time: '10:00 AM',
      end_date: '2025-01-05',
      end_time: '10:00 AM',
      delivery_location: 'Mock Location',
      return_location: 'Mock Location',
      rental_rate: 100,
      deposit: 500,
      total_days: 5,
      total_amount: 500,
      sign_date: '2025-01-01',
      pdf_url,
      status: 'active',
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error updating contract PDF URL:', error);
    return null;
  }
};

export const deleteContract = async (id: string): Promise<boolean> => {
  try {
    // This is a stub - in a real implementation, we would delete the rental
    console.log('Deleting contract (stub):', id);
    
    // Log audit event
    await logAuditEvent('delete', 'contract', id, 'Contrato excluído (stub)');
    
    return true;
  } catch (error) {
    console.error('Error deleting contract:', error);
    return false;
  }
};

export const getContractById = async (id: string): Promise<Contract | null> => {
  try {
    // This is a stub - in a real implementation, we would get the rental by ID
    console.log('Getting contract by ID (stub):', id);
    
    // Log viewing of contract
    await logAuditEvent('view', 'contract', id, 'Visualização do contrato (stub)');
    
    // Return a mock contract
    return {
      id,
      contract_number: 'MOCK-NUMBER',
      client_name: 'Mock Client',
      client_surname: 'Mock Surname',
      client_id_number: 'Mock ID',
      client_address: 'Mock Address',
      client_email: null,
      client_phone: null,
      vehicle_type: 'Mock Vehicle Type',
      vehicle_make: 'Mock Make',
      vehicle_model: 'Mock Model',
      vehicle_fuel: 'Mock Fuel',
      vehicle_license_plate: null,
      vehicle_year: null,
      vehicle_color: null,
      company_name: 'Mock Company',
      company_code: 'mock',
      company_logo_url: null,
      company_theme_color: null,
      start_date: '2025-01-01',
      start_time: '10:00 AM',
      end_date: '2025-01-05',
      end_time: '10:00 AM',
      delivery_location: 'Mock Location',
      return_location: 'Mock Location',
      rental_rate: 100,
      deposit: 500,
      total_days: 5,
      total_amount: 500,
      sign_date: '2025-01-01',
      pdf_url: null,
      status: 'active',
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching contract:', error);
    return null;
  }
};
