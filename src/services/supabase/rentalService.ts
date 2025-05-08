import { supabase } from './supabaseClient';
import { Rental, NewRental, UpdateRental } from './types';
import { FormData } from '@/components/RentalForm';
import { Company } from '@/components/CompanySelector';
import { toast } from 'sonner';

/**
 * Create a new rental record
 */
export const createRental = async (data: NewRental): Promise<Rental | null> => {
  try {
    console.log('Creating rental with data:', data);
    
    const { data: rental, error } = await supabase
      .from('rentals')
      .insert(data)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating rental:', error);
      toast.error(`Erro ao salvar contrato: ${error.message}`);
      return null;
    }
    
    console.log('Rental created successfully:', rental);
    return rental;
  } catch (error) {
    console.error('Exception creating rental:', error);
    toast.error(`Erro ao processar contrato: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    return null;
  }
};

/**
 * Get a rental by ID
 */
export const getRentalById = async (id: string): Promise<Rental | null> => {
  try {
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching rental:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching rental:', error);
    return null;
  }
};

/**
 * Get all rentals with optional status filter
 */
export const getRentals = async (options?: { status?: string }): Promise<Rental[]> => {
  try {
    let query = supabase
      .from('rentals')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (options?.status) {
      query = query.eq('status', options.status);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching rentals:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching rentals:', error);
    return [];
  }
};

/**
 * Update a rental's status
 */
export const updateRentalStatus = async (id: string, status: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('rentals')
      .update({ status })
      .eq('id', id);
      
    if (error) {
      console.error('Error updating rental status:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error updating rental status:', error);
    return false;
  }
};

/**
 * Search for rentals based on contract number, client name, or vehicle details
 */
export const searchRentals = async (searchTerm: string): Promise<Rental[]> => {
  try {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase().trim();
    
    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .or(`client_name.ilike.%${term}%,client_surname.ilike.%${term}%,contract_number.ilike.%${term}%,vehicle_make.ilike.%${term}%,vehicle_model.ilike.%${term}%`)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error searching rentals:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error searching rentals:', error);
    return [];
  }
};

/**
 * Convert form data to a rental record
 */
export const formDataToRental = (formData: FormData, company: Company, contractNumber: string): NewRental => {
  // Calculate total days between start and end dates
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate total amount
  const rentalRate = parseFloat(formData.rentalRate);
  const totalAmount = rentalRate * totalDays;
  
  // Get company details
  const companyThemeMap: Record<string, string> = {
    'moove': '#4B80C3',
    'yoou': '#EF65CF'
  };
  
  const companyLogoMap: Record<string, string> = {
    'moove': '/lovable-uploads/77ecfed0-4dfe-41b1-a907-c8c9241166ee.png',
    'yoou': '/lovable-uploads/84eac6d9-3068-4699-b09d-04269c7c8870.png'
  };
  
  const companyNameMap: Record<string, string> = {
    'moove': 'Moove Locadora de Veículos S/A',
    'yoou': 'Yoou Rent a Car LLC'
  };
  
  return {
    contract_number: contractNumber,
    
    // Client information
    client_name: formData.firstName,
    client_surname: formData.surname,
    client_id_number: formData.idNumber,
    client_address: formData.address,
    client_email: formData.email || null,
    client_phone: formData.phone || null,
    
    // Vehicle information
    vehicle_type: formData.vehicleType,
    vehicle_make: formData.make,
    vehicle_model: formData.model,
    vehicle_fuel: formData.fuel,
    vehicle_license_plate: formData.licensePlate || null,
    vehicle_year: formData.year || null,
    vehicle_color: formData.color || null,
    
    // Company information
    company_name: companyNameMap[company] || company,
    company_code: company,
    company_logo_url: companyLogoMap[company] || null,
    company_theme_color: companyThemeMap[company] || null,
    
    // Rental period
    start_date: formData.startDate.toISOString().split('T')[0],
    start_time: formData.startTime,
    end_date: formData.endDate.toISOString().split('T')[0],
    end_time: formData.endTime,
    delivery_location: formData.deliveryLocation,
    return_location: formData.returnLocation,
    
    // Financial information
    rental_rate: rentalRate,
    deposit: parseFloat(formData.deposit),
    total_days: totalDays,
    total_amount: totalAmount,
    
    // Contract metadata
    sign_date: formData.signDate.toISOString().split('T')[0],
    status: 'active'
  };
};
