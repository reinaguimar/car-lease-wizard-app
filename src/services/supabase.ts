
// Este arquivo re-exporta todas as funções do supabase para facilitar o acesso
// Importações de tipos
export * from './supabase/types';
export * from './supabase/supabaseClient';

// Re-export rental service functions
export {
  createRental,
  getRentals,
  getRentalById,
  updateRentalStatus,
  searchRentals,
  formDataToRental
} from './supabase/rentalService';

// Export default companies information to maintain compatibility
export { defaultCompanies } from './supabase/companyService';

// Exportar o cliente Supabase para uso no componente PrintButton
export { supabase } from './supabase/supabaseClient';
