import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Tag, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BlogEditor from './BlogEditor';

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

const BlogManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Get all blog posts (including unpublished ones for admin)
      const { data: blogData, error: blogError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

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

      // Combine the data
      const combinedPosts = blogData.map(post => ({
        ...post,
        profiles: {
          display_name: profileMap.get(post.author_id) || 'Unknown Author'
        }
      }));

      setPosts(combinedPosts);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleSavePost = async (blogData: any) => {
    if (!user) return;

    setSaving(true);
    try {
      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            ...blogData,
            author_id: user.id
          })
          .eq('id', editingPost.id);

        if (error) throw error;

        toast({
          title: "Post Updated",
          description: "Blog post has been updated successfully.",
        });
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert([{
            ...blogData,
            author_id: user.id
          }]);

        if (error) throw error;

        toast({
          title: "Post Created",
          description: "Blog post has been created successfully.",
        });
      }

      setShowEditor(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Post Deleted",
        description: "Blog post has been deleted successfully.",
      });

      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (showEditor) {
    return (
      <BlogEditor
        initialData={editingPost ? {
          title: editingPost.title,
          slug: editingPost.slug,
          excerpt: editingPost.excerpt,
          content: editingPost.content,
          hero_image_url: editingPost.hero_image_url,
          tags: editingPost.tags,
          featured: editingPost.featured,
          published: editingPost.published
        } : undefined}
        onSave={handleSavePost}
        onCancel={() => {
          setShowEditor(false);
          setEditingPost(null);
        }}
        isLoading={saving}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={handleCreatePost}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map(post => (
          <Card key={post.id}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <div className="flex gap-1">
                      {post.featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                      <Badge variant={post.published ? "default" : "outline"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="w-3 h-3 mr-1" />
                    <span className="mr-4">{post.profiles.display_name}</span>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(post.publish_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {post.published && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditPost(post)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {post.tags.length > 0 && (
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;