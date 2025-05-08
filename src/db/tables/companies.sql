
-- Companies table to store information about rental companies
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  cnpj TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  logo_url TEXT,
  theme_color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert initial company data
INSERT INTO public.companies (name, code, cnpj, address, city, state, country, logo_url, theme_color)
VALUES 
  ('Moove Locadora de Veículos S/A', 'moove', '26.875.530/0001-77', 'Av. Barão Homem de Melo, 3150 – Estoril', 'Belo Horizonte', 'MG', 'Brasil', '/lovable-uploads/77ecfed0-4dfe-41b1-a907-c8c9241166ee.png', '#4B80C3'),
  ('Yoou Rent a Car LLC', 'yoou', 'L00000000000000', '7454 Marker Ave', 'Kissimmee', 'FL', 'USA', '/lovable-uploads/84eac6d9-3068-4699-b09d-04269c7c8870.png', '#EF65CF');

-- Enable RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Create policy for read access to all authenticated users
CREATE POLICY "Allow read access for all authenticated users" ON public.companies
  FOR SELECT
  TO authenticated
  USING (true);
