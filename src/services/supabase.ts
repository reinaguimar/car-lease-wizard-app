
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
// Export audit service explicitly to avoid duplicate exports
export { 
  logAuditEvent,
  getAuditLogs
} from './supabase/auditService';
export * from './supabase/companyService';

// Exportar o cliente Supabase para uso no componente PrintButton
export { supabase } from './supabase/supabaseClient';
