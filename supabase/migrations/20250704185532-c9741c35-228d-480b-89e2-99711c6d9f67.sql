-- Create storage bucket for blog content
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-content', 'blog-content', true);

-- Create RLS policies for blog content bucket
CREATE POLICY "Anyone can view blog content" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-content');

CREATE POLICY "Approved admins can upload blog content" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog-content' AND public.is_admin_approved());

CREATE POLICY "Approved admins can update blog content" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'blog-content' AND public.is_admin_approved());

CREATE POLICY "Approved admins can delete blog content" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'blog-content' AND public.is_admin_approved());