-- First approve the first user to use as blog author
UPDATE public.profiles 
SET approved = true 
WHERE user_id = (SELECT user_id FROM public.profiles LIMIT 1);

-- Then insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, author_id, tags, featured, published) 
VALUES 
(
  'Getting Started with AI Development',
  'getting-started-ai-development',
  'A comprehensive guide to starting your journey in AI development with practical examples and best practices.',
  '{"blocks":[{"type":"header","data":{"text":"Introduction to AI Development","level":1}},{"type":"paragraph","data":{"text":"Artificial Intelligence development has become one of the most exciting fields in technology."}}]}',
  (SELECT user_id FROM public.profiles WHERE approved = true LIMIT 1),
  ARRAY['AI', 'Machine Learning', 'Development'],
  true,
  true
);