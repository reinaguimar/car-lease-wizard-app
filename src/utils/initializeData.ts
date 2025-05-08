
import { createCompany, getCompanyById } from '@/services/supabase/companyService';

// Função para garantir que as empresas básicas existam
export const ensureCompaniesExist = async () => {
  try {
    // Verificar e criar a empresa Moove se não existir
    const moove = await getCompanyById('moove');
    if (!moove) {
      await createCompany({
        name: 'Moove',
        code: 'moove',
        theme_color: '#0078d4',
        cnpj: '12.345.678/0001-00',
        country: 'Brasil'
      });
      console.log('Empresa Moove criada com sucesso');
    }

    // Verificar e criar a empresa Yoou se não existir
    const yoou = await getCompanyById('yoou');
    if (!yoou) {
      await createCompany({
        name: 'Yoou',
        code: 'yoou',
        theme_color: '#00b894',
        cnpj: '98.765.432/0001-00',
        country: 'Brasil'
      });
      console.log('Empresa Yoou criada com sucesso');
    }
  } catch (error) {
    console.error('Erro ao garantir a existência das empresas:', error);
  }
};
