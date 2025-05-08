
import { supabase } from './supabaseClient';
import { Client, Vehicle, Contract } from './types';
import { createClient as createClientService } from './clientService';
import { createVehicle as createVehicleService } from './vehicleService';
import { createContract as createContractService } from './contractService';
import { handleSupabaseError } from './supabaseClient';
import { getCompanyByCode } from './companyService';

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
    // Verifica se o cliente já existe pelo documento
    const { data: existingClient, error: searchError } = await supabase
      .from('clients')
      .select('*')
      .eq('id_number', clientData.id_number);
      
    if (searchError) {
      throw searchError;
    }
    
    // Se o cliente já existe, retorna os dados
    if (existingClient && existingClient.length > 0) {
      return existingClient[0] as Client;
    }
    
    // Se não existe, cria um novo cliente
    return await createClientService(clientData);
    
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
    
    const { data, error } = await supabase
      .from('companies')
      .select('id')
      .eq('id', companyId);
      
    if (error) {
      console.error("Erro ao verificar company_id:", error);
      return false;
    }
    
    const isValid = data && data.length > 0;
    console.log(`Company ID ${companyId} é válido:`, isValid);
    return isValid;
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
    // Primeiro, verificamos se o company_id é válido
    const isValid = await isValidCompanyId(vehicleData.company_id);
    if (!isValid) {
      console.error("Company ID inválido:", vehicleData.company_id);
      throw new Error(`Company ID inválido: ${vehicleData.company_id}. Verifique se o ID existe na tabela companies.`);
    }
    
    // Busca por veículo similar (mesma marca, modelo e combustível)
    const { data: existingVehicles, error: searchError } = await supabase
      .from('vehicles')
      .select('*')
      .eq('make', vehicleData.make)
      .eq('model', vehicleData.model)
      .eq('fuel', vehicleData.fuel);
      
    if (searchError) {
      throw searchError;
    }
    
    // Se encontrou um veículo similar, retorna o primeiro
    if (existingVehicles && existingVehicles.length > 0) {
      return existingVehicles[0] as Vehicle;
    }
    
    // Se não existe, cria um novo veículo
    return await createVehicleService(vehicleData);
    
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
    // Verificar se o company_id é válido
    const isValid = await isValidCompanyId(contractData.company_id);
    if (!isValid) {
      console.error("Company ID inválido no contrato:", contractData.company_id);
      throw new Error(`Company ID inválido no contrato: ${contractData.company_id}`);
    }
    
    console.log("Dados do contrato antes de enviar para o Supabase:", contractData);
    const result = await createContractService(contractData);
    console.log("Resultado da criação do contrato:", result);
    return result;
  } catch (error) {
    console.error("Erro detalhado em createContract:", error);
    handleSupabaseError(error, 'criação de contrato');
    return null;
  }
}
