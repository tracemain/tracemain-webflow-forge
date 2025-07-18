-- Fix blog access for public users (non-authenticated users)
-- The current policies only allow access to published posts for approved admins
-- We need to allow public access to published posts and their author profiles

-- Drop existing blog_posts policies
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON public.blog_posts;
DROP POLICY IF EXISTS "Approved admins can create blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Approved admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Approved admins can delete blog posts" ON public.blog_posts;

-- Create new blog_posts policies that allow public access to published posts
CREATE POLICY "Published blog posts are viewable by everyone" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

CREATE POLICY "Approved admins can view all blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (public.is_admin_approved());

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

-- Drop existing profiles policies
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create new profiles policies that allow public access to display names
CREATE POLICY "Profile display names are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id); 