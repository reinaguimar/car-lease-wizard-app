
// Este arquivo re-exporta todas as funções do supabase para facilitar o acesso
// Importações de tipos
export * from './supabase/types';
export * from './supabase/supabaseClient';

// Renomeando funções exportadas dos helpers para evitar conflitos
export { 
  createClient as createClientHelper,
  createVehicle as createVehicleHelper, 
  createContract as createContractHelper 
} from './supabase/helpers';

// Exportando serviços específicos
export * from './supabase/clientService';
export * from './supabase/vehicleService';
export * from './supabase/contractService';
export * from './supabase/searchService';
export * from './supabase/auditService';
export * from './supabase/companyService';
