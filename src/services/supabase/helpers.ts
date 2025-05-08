
import { Client, Vehicle, Contract } from './types';
import { logAuditEvent } from './auditService';
import { handleSupabaseError } from './supabaseClient';
import { defaultCompanies } from './companyService';

// Cria ou busca um cliente por CPF/documento
export async function createClient(clientData: { 
  first_name: string;
  surname: string;
  id_number: string;
  address: string;
  email?: string;
  phone?: string;
}): Promise<Client | null> {
  try {
    console.log("Creating stub client:", clientData);
    
    // Log audit event for client creation
    await logAuditEvent('create', 'client', 'new', `Cliente ${clientData.first_name} ${clientData.surname} criado (stub)`);
    
    // Return a mock client
    return {
      id: 'mock-client-id',
      first_name: clientData.first_name,
      surname: clientData.surname,
      id_number: clientData.id_number,
      address: clientData.address,
      email: clientData.email || null,
      phone: clientData.phone || null
    };
  } catch (error) {
    console.error("Erro em createClient:", error);
    handleSupabaseError(error, 'verificação/criação de cliente');
    return null;
  }
}

// Função para verificar se um company_id é válido
async function isValidCompanyId(companyId: string): Promise<boolean> {
  try {
    console.log("Verificando se company_id é válido:", companyId);
    
    // In this stub implementation, always return true
    return true;
  } catch (error) {
    console.error("Erro ao verificar company_id:", error);
    return false;
  }
}

// Cria ou busca um veículo com os mesmos dados
export async function createVehicle(vehicleData: {
  vehicle_type: string;
  make: string;
  model: string;
  fuel: string;
  company_id: string;
  license_plate?: string;
  year?: string;
  color?: string;
}): Promise<Vehicle | null> {
  try {
    // First, verify the company_id is valid
    const isValid = await isValidCompanyId(vehicleData.company_id);
    if (!isValid) {
      console.error("Company ID inválido:", vehicleData.company_id);
      throw new Error(`Company ID inválido: ${vehicleData.company_id}. Verifique se o ID existe na tabela companies.`);
    }
    
    // Log audit event for vehicle creation
    await logAuditEvent('create', 'vehicle', 'new', `Veículo ${vehicleData.make} ${vehicleData.model} criado (stub)`);
    
    // Return a mock vehicle
    return {
      id: 'mock-vehicle-id',
      vehicle_type: vehicleData.vehicle_type,
      make: vehicleData.make,
      model: vehicleData.model,
      fuel: vehicleData.fuel,
      license_plate: vehicleData.license_plate,
      year: vehicleData.year,
      color: vehicleData.color,
      company_id: vehicleData.company_id
    };
  } catch (error) {
    console.error("Erro em createVehicle:", error);
    handleSupabaseError(error, 'verificação/criação de veículo');
    return null;
  }
}

// Cria um contrato
export async function createContract(contractData: {
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
}): Promise<Contract | null> {
  try {
    // Verify the company_id is valid
    const isValid = await isValidCompanyId(contractData.company_id);
    if (!isValid) {
      console.error("Company ID inválido no contrato:", contractData.company_id);
      throw new Error(`Company ID inválido no contrato: ${contractData.company_id}`);
    }
    
    console.log("Dados do contrato antes de enviar para o Supabase (stub):", contractData);
    
    // Get company info using default companies (now that we don't have a companies table)
    const companyCode = contractData.company_id;
    const company = defaultCompanies[companyCode as keyof typeof defaultCompanies] || {
      name: 'Unknown Company', 
      code: companyCode, 
      logo_url: null,
      theme_color: null
    };

    // Create a mock contract
    const mockContract: Contract = {
      id: 'mock-contract-id',
      contract_number: contractData.contract_number,
      client_name: "Mock Client",
      client_surname: "Mock Surname",
      client_id_number: "Mock ID",
      client_address: "Mock Address",
      client_email: null,
      client_phone: null,
      vehicle_type: "Mock Type",
      vehicle_make: "Mock Make",
      vehicle_model: "Mock Model",
      vehicle_fuel: "Mock Fuel",
      vehicle_license_plate: null,
      vehicle_year: null,
      vehicle_color: null,
      company_name: company.name,
      company_code: company.code,
      company_logo_url: company.logo_url,
      company_theme_color: company.theme_color,
      start_date: contractData.start_date,
      start_time: contractData.start_time,
      end_date: contractData.end_date,
      end_time: contractData.end_time,
      delivery_location: contractData.delivery_location,
      return_location: contractData.return_location,
      rental_rate: contractData.rental_rate,
      deposit: contractData.deposit,
      total_days: 1, // Calculate based on start and end dates
      total_amount: contractData.rental_rate, // Calculate based on days and rate
      sign_date: contractData.sign_date,
      pdf_url: null,
      status: 'active',
      created_at: new Date().toISOString()
    };
    
    // Log audit event for contract creation
    await logAuditEvent('create', 'contract', mockContract.id, `Contrato ${contractData.contract_number} criado (stub)`);
    
    return mockContract;
  } catch (error) {
    console.error("Erro detalhado em createContract:", error);
    handleSupabaseError(error, 'criação de contrato');
    return null;
  }
}
