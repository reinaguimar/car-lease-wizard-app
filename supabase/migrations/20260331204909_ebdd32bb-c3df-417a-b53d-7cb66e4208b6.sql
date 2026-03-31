
-- Drop all existing permissive anonymous policies
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.rentals;
DROP POLICY IF EXISTS "Allow anonymous select" ON public.rentals;
DROP POLICY IF EXISTS "Allow anonymous update" ON public.rentals;

-- Drop existing overly permissive authenticated policies
DROP POLICY IF EXISTS "Allow read access for all authenticated users" ON public.rentals;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.rentals;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON public.rentals;
DROP POLICY IF EXISTS "Allow delete for authenticated users" ON public.rentals;

-- Create proper RLS policies restricted by created_by = auth.uid()
CREATE POLICY "Users can view own rentals"
ON public.rentals
FOR SELECT
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Users can insert own rentals"
ON public.rentals
FOR INSERT
TO authenticated
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own rentals"
ON public.rentals
FOR UPDATE
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Users can delete own rentals"
ON public.rentals
FOR DELETE
TO authenticated
USING (created_by = auth.uid());
