-- Fix infinite recursion in RLS policies by using security definer functions
CREATE OR REPLACE FUNCTION public.is_admin_approved()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND approved = true
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop and recreate blog_posts policies without recursion
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON public.blog_posts;
DROP POLICY IF EXISTS "Approved admins can create blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Approved admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Approved admins can delete blog posts" ON public.blog_posts;

-- Create new policies using the security definer function
CREATE POLICY "Blog posts are viewable by everyone" 
ON public.blog_posts 
FOR SELECT 
USING (published = true OR public.is_admin_approved());

CREATE POLICY "Approved admins can create blog posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (public.is_admin_approved());

CREATE POLICY "Approved admins can update blog posts" 
ON public.blog_posts 
FOR UPDATE 
USING (public.is_admin_approved());

CREATE POLICY "Approved admins can delete blog posts" 
ON public.blog_posts 
FOR DELETE 
USING (public.is_admin_approved());

-- Also fix profiles policies
DROP POLICY IF EXISTS "Approved admins can update profiles" ON public.profiles;

CREATE POLICY "Approved admins can update profiles" 
ON public.profiles 
FOR UPDATE 
USING (public.is_admin_approved() OR auth.uid() = user_id);