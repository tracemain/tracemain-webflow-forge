import { useState, useEffect } from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/sections/footer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishDate: string;
  tags: string[];
  featured: boolean;
  imageUrl: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    // Load blogs from JSON file
    fetch('/src/data/blogs.json')
      .then(response => response.json())
      .then(data => setBlogs(data.blogs))
      .catch(error => console.error('Error loading blogs:', error));
  }, []);

  const allTags = ['all', ...Array.from(new Set(blogs.flatMap(blog => blog.tags)))];
  const filteredBlogs = selectedTag === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.tags.includes(selectedTag));

  const featuredBlogs = blogs.filter(blog => blog.featured);
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thought leadership on AI development, 
            data science, and the future of intelligent systems.
          </p>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === tag 
                    ? 'gradient-primary text-white' 
                    : 'glass-button hover:bg-white/10'
                }`}
              >
                {tag === 'all' ? 'All Posts' : tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && selectedTag === 'all' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map(blog => (
                <article key={blog.id} className="glass-card group hover:scale-105 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4"></div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-4">{blog.author}</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Blogs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">
            {selectedTag === 'all' ? 'All Posts' : `Posts tagged with "${selectedTag}"`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularBlogs.map(blog => (
              <article key={blog.id} className="glass-card group hover:scale-105 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg mb-4"></div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{blog.author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-1">
                  {blog.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{blog.tags.length - 3} more</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;