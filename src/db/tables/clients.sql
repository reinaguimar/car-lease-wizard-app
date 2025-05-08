
-- Clients table to store renter information
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  surname TEXT NOT NULL,
  id_number TEXT NOT NULL,  -- passport or ID
  address TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to select any client
CREATE POLICY "Allow read access for all authenticated users" ON public.clients
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to insert clients
CREATE POLICY "Allow insert for authenticated users" ON public.clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy for authenticated users to update their own inserted records
CREATE POLICY "Allow update for authenticated users" ON public.clients
  FOR UPDATE
  TO authenticated
  USING (true);
