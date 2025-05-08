
-- Contracts table to store rental contracts
CREATE TABLE public.contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number TEXT NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES public.clients(id),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id),
  company_id UUID NOT NULL REFERENCES public.companies(id),
  start_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_date DATE NOT NULL,
  end_time TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  return_location TEXT NOT NULL,
  rental_rate DECIMAL(10,2) NOT NULL,
  deposit DECIMAL(10,2) NOT NULL,
  sign_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, completed, canceled
  pdf_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

-- Create policy for read access to all authenticated users
CREATE POLICY "Allow read access for all authenticated users" ON public.contracts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for insert access to authenticated users
CREATE POLICY "Allow insert for authenticated users" ON public.contracts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy for update access to authenticated users
CREATE POLICY "Allow update for authenticated users" ON public.contracts
  FOR UPDATE
  TO authenticated
  USING (true);
