-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read BOOLEAN DEFAULT false
);

-- Enable RLS on contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Contact submissions policies - only approved admins can view and delete
CREATE POLICY "Approved admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (public.is_admin_approved());

CREATE POLICY "Approved admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (public.is_admin_approved());

CREATE POLICY "Approved admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (public.is_admin_approved());

-- Allow anyone to insert contact submissions (public form)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create content table for website content management
CREATE TABLE public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hero JSONB NOT NULL DEFAULT '{}',
  services JSONB NOT NULL DEFAULT '{}',
  about JSONB NOT NULL DEFAULT '{}',
  contact JSONB NOT NULL DEFAULT '{}',
  seo JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on content
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Content policies
CREATE POLICY "Anyone can view content" 
ON public.content 
FOR SELECT 
USING (true);

CREATE POLICY "Approved admins can update content" 
ON public.content 
FOR UPDATE 
USING (public.is_admin_approved());

CREATE POLICY "Approved admins can insert content" 
ON public.content 
FOR INSERT 
WITH CHECK (public.is_admin_approved());

-- Add trigger for content updated_at
CREATE TRIGGER update_content_updated_at
BEFORE UPDATE ON public.content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content
INSERT INTO public.content (hero, services, about, contact, seo) VALUES (
  '{"title": "Building the Future with AI", "subtitle": "Advanced AI Solutions", "description": "Transform your business with cutting-edge artificial intelligence and data science solutions", "cta_text": "Get Started", "cta_link": "/contact", "background_image": "/lovable-uploads/1861a34a-e307-498c-a038-bb4d7d010a16.png"}',
  '{"title": "Our Services", "subtitle": "What We Offer", "items": [{"title": "AI Development", "description": "Custom AI solutions tailored to your business needs", "icon": "brain"}, {"title": "Data Science", "description": "Transform your data into actionable insights", "icon": "chart"}, {"title": "Machine Learning", "description": "Advanced ML models for predictive analytics", "icon": "cpu"}]}',
  '{"title": "About Tracemain", "subtitle": "Who We Are", "description": "We are a team of AI experts passionate about building intelligent systems that solve real-world problems.", "features": ["Expert AI Development Team", "Cutting-edge Technology Stack", "Proven Track Record", "24/7 Support"], "stats": [{"number": "100+", "label": "Projects Completed"}, {"number": "50+", "label": "Happy Clients"}, {"number": "5+", "label": "Years Experience"}]}',
  '{"title": "Get In Touch", "subtitle": "Contact Us", "email": "contact@tracemain.com", "phone": "+1 (555) 123-4567", "address": "123 AI Street, Tech City, TC 12345"}',
  '{"title": "Tracemain - AI Solutions & Data Science", "description": "Leading AI development company providing custom artificial intelligence solutions, data science consulting, and machine learning services.", "keywords": ["AI", "Machine Learning", "Data Science", "Artificial Intelligence", "Custom Solutions"], "og_image": "/lovable-uploads/1861a34a-e307-498c-a038-bb4d7d010a16.png"}'
);