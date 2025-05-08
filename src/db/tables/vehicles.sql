
-- Vehicles table to store vehicle information
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_type TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  fuel TEXT NOT NULL,
  license_plate TEXT,
  year TEXT,
  color TEXT,
  company_id UUID NOT NULL REFERENCES public.companies(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Create policy for read access to all authenticated users
CREATE POLICY "Allow read access for all authenticated users" ON public.vehicles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for insert access to authenticated users
CREATE POLICY "Allow insert for authenticated users" ON public.vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy for update access to authenticated users
CREATE POLICY "Allow update for authenticated users" ON public.vehicles
  FOR UPDATE
  TO authenticated
  USING (true);
