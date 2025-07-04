-- Add admin approval system for new users
ALTER TABLE public.profiles ADD COLUMN approved BOOLEAN DEFAULT false;

-- Create blog posts table with rich content support
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content JSONB, -- EditorJS format
  hero_image_url TEXT,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Blog posts are viewable by everyone" 
ON public.blog_posts 
FOR SELECT 
USING (published = true OR auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE role = 'admin' AND approved = true
));

CREATE POLICY "Approved admins can create blog posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE role = 'admin' AND approved = true
));

CREATE POLICY "Approved admins can update blog posts" 
ON public.blog_posts 
FOR UPDATE 
USING (auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE role = 'admin' AND approved = true
));

CREATE POLICY "Approved admins can delete blog posts" 
ON public.blog_posts 
FOR DELETE 
USING (auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE role = 'admin' AND approved = true
));

-- Update profiles policies to include approval check
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Approved admins can update profiles" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() IN (
  SELECT user_id FROM public.profiles WHERE role = 'admin' AND approved = true
) OR auth.uid() = user_id);

-- Create trigger for blog posts updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update the handle_new_user function to set approved = false by default for new signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, role, approved)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'display_name',
    'admin',
    false -- New users need approval
  );
  RETURN new;
END;
$$;