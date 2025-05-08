
// Re-export all services
export * from './types';

// Export services
export * from './supabaseClient';
export * from './rentalService';

// Export default companies information
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
