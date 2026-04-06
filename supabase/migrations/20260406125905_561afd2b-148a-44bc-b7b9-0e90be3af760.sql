
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own rentals" ON public.rentals;
DROP POLICY IF EXISTS "Users can insert own rentals" ON public.rentals;
DROP POLICY IF EXISTS "Users can update own rentals" ON public.rentals;
DROP POLICY IF EXISTS "Users can delete own rentals" ON public.rentals;

-- Create permissive public policies
CREATE POLICY "Allow public read access" ON public.rentals FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.rentals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.rentals FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.rentals FOR DELETE USING (true);
