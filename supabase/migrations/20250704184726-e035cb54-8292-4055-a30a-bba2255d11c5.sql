-- Insert some sample blog posts to test the system
INSERT INTO public.blog_posts (title, slug, excerpt, content, hero_image_url, author_id, tags, featured, published) 
VALUES 
(
  'Getting Started with AI Development',
  'getting-started-ai-development',
  'A comprehensive guide to starting your journey in AI development with practical examples and best practices.',
  '{"blocks":[{"type":"header","data":{"text":"Introduction to AI Development","level":1}},{"type":"paragraph","data":{"text":"Artificial Intelligence development has become one of the most exciting fields in technology. This guide will walk you through the fundamentals you need to know to get started."}},{"type":"header","data":{"text":"Key Concepts","level":2}},{"type":"list","data":{"style":"unordered","items":["Machine Learning fundamentals","Deep Learning basics","Neural Networks","Data preprocessing","Model training and evaluation"]}},{"type":"paragraph","data":{"text":"Understanding these concepts will provide a solid foundation for your AI journey."}}]}',
  '/api/placeholder/800/400',
  (SELECT user_id FROM public.profiles WHERE approved = true LIMIT 1),
  ARRAY['AI', 'Machine Learning', 'Development', 'Getting Started'],
  true,
  true
),
(
  'Building Scalable Web Applications',
  'building-scalable-web-applications',
  'Learn how to architect and develop web applications that can handle millions of users with modern technologies.',
  '{"blocks":[{"type":"header","data":{"text":"Scalability Fundamentals","level":1}},{"type":"paragraph","data":{"text":"Building applications that scale requires careful planning and the right architectural decisions from the start."}},{"type":"header","data":{"text":"Architecture Patterns","level":2}},{"type":"list","data":{"style":"ordered","items":["Microservices architecture","Event-driven design","Database sharding","Caching strategies","Load balancing"]}},{"type":"quote","data":{"text":"Premature optimization is the root of all evil, but planning for scale is essential.","caption":"Donald Knuth (adapted)"}}]}',
  '/api/placeholder/800/400',
  (SELECT user_id FROM public.profiles WHERE approved = true LIMIT 1),
  ARRAY['Web Development', 'Scalability', 'Architecture', 'Performance'],
  false,
  true
),
(
  'The Future of Remote Work',
  'future-of-remote-work',
  'Exploring how remote work is reshaping the technology industry and what it means for developers.',
  '{"blocks":[{"type":"header","data":{"text":"Remote Work Revolution","level":1}},{"type":"paragraph","data":{"text":"The pandemic accelerated the adoption of remote work, and now its here to stay. Lets explore what this means for the tech industry."}},{"type":"header","data":{"text":"Benefits and Challenges","level":2}},{"type":"paragraph","data":{"text":"Remote work offers flexibility and access to global talent, but also presents unique challenges for collaboration and company culture."}}]}',
  '/api/placeholder/800/400',
  (SELECT user_id FROM public.profiles WHERE approved = true LIMIT 1),
  ARRAY['Remote Work', 'Technology', 'Future', 'Productivity'],
  false,
  true
);