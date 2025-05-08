
export interface Company {
  id: string;
  name: string;
  code: string;
  // Add other company fields as needed
}

export interface Client {
  id: string;
  first_name: string;
  surname: string;
  id_number: string;
  address: string;
  email?: string;
  phone?: string;
}

export interface Vehicle {
  id: string;
  vehicle_type: string;
  make: string;
  model: string;
  fuel: string;
  license_plate?: string;
  year?: string;
  color?: string;
  company_id: string;
}

export interface Contract {
  id: string;
  contract_number: string;
  client_id: string;
  vehicle_id: string;
  company_id: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  delivery_location: string;
  return_location: string;
  rental_rate: number;
  deposit: number;
  sign_date: string;
  pdf_url?: string;
  status?: string;
  clients?: Client;
  vehicles?: Vehicle;
  companies?: Company;
  created_at?: string;
}
