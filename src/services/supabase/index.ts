
// Re-export all services
export * from './types';
export * from './companyService';

// Renomeando funções exportadas dos helpers para evitar conflitos
export { 
  createClient as createClientHelper,
  createVehicle as createVehicleHelper, 
  createContract as createContractHelper 
} from './helpers';

// Exportando serviços regulares
export * from './clientService';
export * from './vehicleService';
export * from './contractService';
export * from './searchService';
export * from './supabaseClient';
export * from './auditService';
