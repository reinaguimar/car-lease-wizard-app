
import { Company } from './types';

// Default companies information
export const defaultCompanies = {
  moove: {
    name: 'Moove Locadora de Veículos S/A',
    code: 'moove',
    logo_url: '/lovable-uploads/77ecfed0-4dfe-41b1-a907-c8c9241166ee.png',
    theme_color: '#4B80C3'
  },
  yoou: {
    name: 'Yoou Rent a Car LLC',
    code: 'yoou',
    logo_url: '/lovable-uploads/84eac6d9-3068-4699-b09d-04269c7c8870.png',
    theme_color: '#EF65CF'
  }
};

// Mock companies for stub implementation
const mockCompanies: Company[] = [
  {
    id: 'moove',
    name: 'Moove Locadora de Veículos S/A',
    code: 'moove',
    logo_url: '/lovable-uploads/77ecfed0-4dfe-41b1-a907-c8c9241166ee.png',
    theme_color: '#4B80C3',
    cnpj: '12.345.678/0001-90',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil'
  },
  {
    id: 'yoou',
    name: 'Yoou Rent a Car LLC',
    code: 'yoou',
    logo_url: '/lovable-uploads/84eac6d9-3068-4699-b09d-04269c7c8870.png',
    theme_color: '#EF65CF',
    cnpj: '98.765.432/0001-10',
    address: '123 Main St',
    city: 'Orlando',
    state: 'FL',
    country: 'USA'
  }
];

// Get all companies
export const getCompanies = async (): Promise<Company[]> => {
  console.log('Getting all companies (stub)');
  return [...mockCompanies];
};

// Get company by ID
export const getCompanyById = async (id: string): Promise<Company | null> => {
  console.log('Getting company by ID (stub):', id);
  const company = mockCompanies.find(c => c.id === id || c.code === id);
  return company ? { ...company } : null;
};

// Create or update default companies (this is a stub function now)
export const ensureDefaultCompaniesExist = async (): Promise<void> => {
  console.log('Ensuring default companies exist (stub)');
  // No action needed in the stub implementation
};
