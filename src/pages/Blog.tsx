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
        }));

        setBlogs(transformedBlogs);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="simple-section">
        <div className="container-simple">
          <div className="flex justify-between items-start mb-16">
          <img
            src="/logo_word.png"
            alt="Logo word"
            style={{ maxWidth: '20vw', minWidth: '120px' }}
          />
            {/* <h1 className="text-title">
              <a href="/" className="simple-link">TRACEMAIN</a>
            </h1> */}
            <h2 className="text-large">Writing</h2>
          </div>
          
          <div className="space-y-12 max-w-2xl">
            {blogs.map(blog => (
              <article 
                key={blog.id} 
                className="cursor-pointer group"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <h3 className="text-body mb-2 group-hover:opacity-60 transition-opacity">
                  {blog.title}
                </h3>
                {blog.excerpt && (
                  <p className="text-small text-muted-foreground mb-2">
                    {blog.excerpt}
                  </p>
                )}
                <p className="text-small text-muted-foreground">
                  {new Date(blog.publishDate).toLocaleDateString()}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;