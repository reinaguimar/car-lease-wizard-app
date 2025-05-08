
import { defaultCompanies } from '@/services/supabase';
import { supabase } from '@/services/supabase/supabaseClient';

// Function to ensure that sample data exists in the rentals table
export const ensureRentalsExist = async () => {
  try {
    // Check if we already have some rental data
    const { data: existingRentals, error: fetchError } = await supabase
      .from('rentals')
      .select('id')
      .limit(1);
      
    if (fetchError) {
      console.error('Error checking for existing rentals:', fetchError);
      return false;
    }
    
    // If we already have data, no need to initialize
    if (existingRentals && existingRentals.length > 0) {
      console.log('Rentals table already has data, skipping initialization.');
      return true;
    }
    
    console.log('No rentals found. Creating sample rental data...');
    
    // Sample rental data
    const sampleRentals = [
      {
        contract_number: '2025-05-1234',
        client_name: 'John',
        client_surname: 'Doe',
        client_id_number: '123456789',
        client_address: '123 Main St, Orlando, FL',
        client_email: 'john@example.com',
        client_phone: '+1 555-123-4567',
        vehicle_type: 'SUV',
        vehicle_make: 'Toyota',
        vehicle_model: 'RAV4',
        vehicle_fuel: 'Gasoline',
        vehicle_license_plate: 'ABC123',
        vehicle_year: '2023',
        vehicle_color: 'Silver',
        company_name: 'Moove Locadora de Veículos S/A',
        company_code: 'moove',
        company_logo_url: '/lovable-uploads/77ecfed0-4dfe-41b1-a907-c8c9241166ee.png',
        company_theme_color: '#4B80C3',
        start_date: '2025-05-10',
        start_time: '10:00',
        end_date: '2025-05-15',
        end_time: '10:00',
        delivery_location: 'Orlando Airport',
        return_location: 'Orlando Airport',
        rental_rate: 89.99,
        deposit: 300.00,
        total_days: 5,
        total_amount: 449.95,
        sign_date: '2025-05-08',
        status: 'active'
      },
      {
        contract_number: '2025-05-5678',
        client_name: 'Jane',
        client_surname: 'Smith',
        client_id_number: '987654321',
        client_address: '456 Oak Ave, Miami, FL',
        client_email: 'jane@example.com',
        client_phone: '+1 555-987-6543',
        vehicle_type: 'Sedan',
        vehicle_make: 'Honda',
        vehicle_model: 'Civic',
        vehicle_fuel: 'Flex',
        vehicle_license_plate: 'XYZ789',
        vehicle_year: '2022',
        vehicle_color: 'Blue',
        company_name: 'Yoou Rent a Car LLC',
        company_code: 'yoou',
        company_logo_url: '/lovable-uploads/84eac6d9-3068-4699-b09d-04269c7c8870.png',
        company_theme_color: '#EF65CF',
        start_date: '2025-05-12',
        start_time: '14:00',
        end_date: '2025-05-18',
        end_time: '14:00',
        delivery_location: 'Miami Airport',
        return_location: 'Miami Beach',
        rental_rate: 69.99,
        deposit: 250.00,
        total_days: 6,
        total_amount: 419.94,
        sign_date: '2025-05-10',
        status: 'active'
      }
    ];
    
    // Insert sample rentals
    const { error: insertError } = await supabase
      .from('rentals')
      .insert(sampleRentals);
      
    if (insertError) {
      console.error('Error initializing rental data:', insertError);
      return false;
    }
    
    console.log('Sample rental data created successfully.');
    return true;
    
  } catch (error) {
    console.error('Error ensuring rentals exist:', error);
    return false;
  }
};

// Function to ensure companies exist
export const ensureCompaniesExist = async () => {
  try {
    console.log('Companies data is now stored in rental records directly.');
    console.log('Default companies information is available via defaultCompanies export.');
    return true;
  } catch (error) {
    console.error('Error in companies check:', error);
    return false;
  }
};
