
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
