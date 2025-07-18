-- Fix admin panel access by restoring the correct policies
-- The previous migration broke admin functionality

-- Drop the current profiles policies
DROP POLICY IF EXISTS "Profile display names are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create the correct profiles policies that maintain both public access AND admin functionality
CREATE POLICY "Profile display names are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Approved admins can update profiles" 
ON public.profiles 
FOR UPDATE 
USING (public.is_admin_approved() OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id); 