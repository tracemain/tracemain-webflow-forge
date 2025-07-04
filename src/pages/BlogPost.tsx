import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/ui/navbar';
import Footer from '../components/sections/footer';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  hero_image_url: string;
  author_id: string;
  publish_date: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  profiles: {
    display_name: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        // Get blog post
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (postError) {
          console.error('Error fetching blog post:', postError);
          return;
        }

        // Get author profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('user_id', postData.author_id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          return;
        }

        // Combine the data
        const combinedPost = {
          ...postData,
          profiles: {
            display_name: profileData.display_name
          }
        };

        setPost(combinedPost);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const renderContent = (content: any) => {
    if (!content || !content.blocks) return null;

    return content.blocks.map((block: any, index: number) => {
      switch (block.type) {
        case 'header':
          const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
          return (
            <HeaderTag key={index} className={`font-bold mb-4 ${
              block.data.level === 1 ? 'text-3xl' : 
              block.data.level === 2 ? 'text-2xl' : 
              block.data.level === 3 ? 'text-xl' : 'text-lg'
            }`}>
              {block.data.text}
            </HeaderTag>
          );
        case 'paragraph':
          return (
            <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
              {block.data.text}
            </p>
          );
        case 'list':
          return block.data.style === 'ordered' ? (
            <ol key={index} className="list-decimal list-inside mb-4 text-muted-foreground">
              {block.data.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="mb-1">{item}</li>
              ))}
            </ol>
          ) : (
            <ul key={index} className="list-disc list-inside mb-4 text-muted-foreground">
              {block.data.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="mb-1">{item}</li>
              ))}
            </ul>
          );
        case 'quote':
          return (
            <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 mb-4 italic text-muted-foreground">
              {block.data.text}
              {block.data.caption && (
                <cite className="block text-sm mt-2 text-muted-foreground/70">
                  — {block.data.caption}
                </cite>
              )}
            </blockquote>
          );
        case 'code':
          return (
            <pre key={index} className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm">{block.data.code}</code>
            </pre>
          );
        case 'image':
          return (
            <div key={index} className="mb-4">
              <img 
                src={block.data.file?.url || block.data.url} 
                alt={block.data.caption || ''} 
                className="w-full rounded-lg"
              />
              {block.data.caption && (
                <p className="text-sm text-muted-foreground mt-2 text-center italic">
                  {block.data.caption}
                </p>
              )}
            </div>
          );
        default:
          return null;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blog')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <article className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            onClick={() => navigate('/blog')} 
            variant="ghost" 
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          {post.hero_image_url && (
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-8 overflow-hidden">
              <img 
                src={post.hero_image_url} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {post.title}
            </h1>
            
            <div className="flex items-center text-muted-foreground mb-4">
              <User className="w-4 h-4 mr-1" />
              <span className="mr-4">{post.profiles.display_name}</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span>{new Date(post.publish_date).toLocaleDateString()}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;