import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishDate: string;
  hero_image_url?: string | null;
}

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Get blog posts
        const { data: blogData, error: blogError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('publish_date', { ascending: false });

        if (blogError) {
          console.error('Error fetching blogs:', blogError);
          return;
        }

        // Get author profiles
        const authorIds = blogData.map(post => post.author_id);
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('user_id, display_name')
          .in('user_id', authorIds);

        if (profileError) {
          console.error('Error fetching profiles:', profileError);
          return;
        }

        // Create a map of user_id to display_name
        const profileMap = new Map(profileData.map(profile => [profile.user_id, profile.display_name]));

        // Transform data to match the expected interface
        const transformedBlogs = blogData.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          author: profileMap.get(post.author_id) || 'Unknown Author',
          publishDate: post.publish_date,
          hero_image_url: post.hero_image_url || null,
        }));

        setBlogs(transformedBlogs);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <section className="py-16 flex-1 flex flex-col items-center">
        <div className="w-full max-w-6xl px-4 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 sm:gap-0">
            <div className="flex justify-start items-center">
              <a href="/">
                <img
                  src="/logo_word.png"
                  alt="Logo word"
                  className="h-8 sm:h-10 w-auto"
                />
              </a>
            </div>
            <div className="flex justify-center items-center gap-4 sm:gap-6">
              {/* <h2 className="text-lg font-semibold text-foreground">Writing</h2> */}
              <a href="/contact" className="simple-link text-sm sm:text-base">
                Contact Us
              </a>
              <a href="https://cal.com/tracemain/30min" className="simple-link text-sm sm:text-base" target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </a>
            </div>
          </div>
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map(blog => (
              <article
                key={blog.id}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full max-w-md mx-auto"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                {blog.hero_image_url && (
                  <img
                    src={blog.hero_image_url}
                    alt={blog.title}
                    className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity rounded-t-2xl"
                  />
                )}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors font-mono">
                    {blog.title}
                  </h3>
                  {blog.excerpt && (
                    <p className="text-base text-muted-foreground mb-4 line-clamp-3 font-mono">
                      {blog.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-4 font-mono">
                    <span>{blog.author}</span>
                    <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;