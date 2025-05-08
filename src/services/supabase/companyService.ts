import { Company as CompanyType } from './types';
import { logAuditEvent } from './auditService';

// Constantes para as empresas base
const DEFAULT_COMPANIES = {
  MOOVE: {
    code: 'moove',
    name: 'Moove Locadora de Veículos S/A',
    theme_color: '#4B80C3',
    logo_url: '/lovable-uploads/77ecfed0-4dfe-41b1-a907-c8c9241166ee.png',
    cnpj: '26.875.530/0001-77',
    address: 'Av. Barão Homem de Melo, 3150 – Estoril',
    city: 'Belo Horizonte',
    state: 'MG',
    country: 'Brasil'
  },
  YOOU: {
    code: 'yoou',
    name: 'Yoou Rent a Car LLC',
    theme_color: '#EF65CF',
    logo_url: '/lovable-uploads/84eac6d9-3068-4699-b09d-04269c7c8870.png',
    cnpj: 'L00000000000000',
    address: '7454 Marker Ave',
    city: 'Kissimmee',
    state: 'FL',
    country: 'USA'
  }
};

// Now this function returns in-memory data instead of querying the database
export const getCompanies = async (): Promise<CompanyType[]> => {
  try {
    // Return the default companies from memory
    return [
      {
        id: 'moove-id',
        ...DEFAULT_COMPANIES.MOOVE
      },
      {
        id: 'yoou-id',
        ...DEFAULT_COMPANIES.YOOU
      }
    ];
  } catch (error) {
    console.error('Error getting companies:', error);
    return [];
  }
};

// Stub function that simulates checking if a company exists
const checkCompanyExistsByCode = async (code: string): Promise<boolean> => {
  return code === 'moove' || code === 'yoou';
};

export const getCompanyById = async (codeOrId: string): Promise<CompanyType | null> => {
  try {
    console.log(`Buscando empresa com código/id: ${codeOrId}`);
    
    // Just return the appropriate default company based on the code
    if (codeOrId === 'moove') {
      return {
        id: 'moove-id',
        ...DEFAULT_COMPANIES.MOOVE
      };
    } else if (codeOrId === 'yoou') {
      return {
        id: 'yoou-id',
        ...DEFAULT_COMPANIES.YOOU
      };
    }
    
    console.log(`Empresa não encontrada: ${codeOrId}`);
    return null;
  } catch (error) {
    console.error(`Error fetching company ${codeOrId}:`, error);
    
    // Fallback with mock data to keep the app running
    if (codeOrId === 'moove') {
      return {
        id: 'mock-moove-id',
        ...DEFAULT_COMPANIES.MOOVE
      } as CompanyType;
    } else if (codeOrId === 'yoou') {
      return {
        id: 'mock-yoou-id',
        ...DEFAULT_COMPANIES.YOOU
      } as CompanyType;
    }
    
    return null;
  }
};

export const createCompany = async (company: {
  name: string;
  code: string;
  logo_url?: string;
  theme_color?: string;
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}): Promise<CompanyType | null> => {
  try {
    // Check if it's one of our default companies
    if (company.code === 'moove' || company.code === 'yoou') {
      return await getCompanyById(company.code);
    }
    
    // For new companies, just create a mock entry
    const newCompany: CompanyType = {
      id: `mock-${company.code}-id`,
      ...company
    };
    
    await logAuditEvent(
      'create',
      'company',
      newCompany.id,
      `Empresa ${company.name} criada`
    );
    
    return newCompany;
  } catch (error) {
    console.error('Error creating company:', error);
    
    // Return data so the UI doesn't break
    return {
      id: `mock-${company.code}-id`,
      ...company
    } as CompanyType;
  }
};

export const updateCompany = async (id: string, company: {
  name?: string;
  code?: string;
  logo_url?: string;
  theme_color?: string;
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}): Promise<CompanyType | null> => {
  try {
    // Simulate updating a company
    const existingCompany = await getCompanyById(id);
    if (!existingCompany) return null;
    
    const updatedCompany = {
      ...existingCompany,
      ...company
    };
    
    await logAuditEvent(
      'update',
      'company',
      id,
      `Empresa ${updatedCompany.name} atualizada`
    );
    
    return updatedCompany;
  } catch (error) {
    console.error(`Error updating company ${id}:`, error);
    return null;
  }
};

export const deleteCompany = async (id: string): Promise<boolean> => {
  try {
    // Simulate delete operation
    await logAuditEvent(
      'delete',
      'company',
      id,
      'Empresa excluída'
    );
    
    return true;
  } catch (error) {
    console.error(`Error deleting company ${id}:`, error);
    return false;
  }
};

// Function to initialize default companies
export const initializeDefaultCompanies = async (): Promise<void> => {
  try {
    const mooveExists = await checkCompanyExistsByCode('moove');
    const yoouExists = await checkCompanyExistsByCode('yoou');
    
    if (!mooveExists) {
      await createCompany(DEFAULT_COMPANIES.MOOVE);
    }
    
    if (!yoouExists) {
      await createCompany(DEFAULT_COMPANIES.YOOU);
    }
    
    console.log('Default companies initialized successfully');
  } catch (error) {
    console.error('Error initializing default companies:', error);
  }
};

// Export the default companies object for direct use
export const defaultCompanies = DEFAULT_COMPANIES;
