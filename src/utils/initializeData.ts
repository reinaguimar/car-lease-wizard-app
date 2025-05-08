import { getCompanyById, createCompany, initializeDefaultCompanies } from '@/services/supabase/companyService';

// Função para garantir que as empresas básicas existam
export const ensureCompaniesExist = async () => {
  try {
    // Usar a função dedicada para inicializar empresas padrão
    await initializeDefaultCompanies();
    console.log('Verificação de empresas concluída');
  } catch (error) {
    console.error('Erro ao garantir a existência das empresas:', error);
  }
};

// This file is now mostly obsolete since we're using a simplified data structure
// We'll keep it as a placeholder for any future initialization needs

export const ensureRentalsExist = async () => {
  // The rentals table already contains initial data
  console.log('Simplified rental structure is already initialized');
  return true;
};
