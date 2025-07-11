import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../ui/button';

const BlogPreview = () => {
  const blogPosts = [
    {
      title: "Why the Future of AI Isn't Bigger Models—It's Better Interfaces",
      excerpt: "Exploring how smart interfaces and contextual deployment matter more than raw model size for real-world applications.",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      slug: "future-ai-better-interfaces"
    },
    {
      title: "From Prompt Hell to PromptOps: A Framework for Real-World AI Reliability",
      excerpt: "A systematic approach to managing, testing, and deploying prompts at scale with confidence and reliability.",
      date: "Dec 10, 2024",
      readTime: "12 min read",
      slug: "prompt-hell-to-promptops"
    },
    {
      title: "Building Travel Agents with Memory and Context Awareness",
      excerpt: "How we developed AI agents that understand travel intent, maintain conversation context, and deliver personalized recommendations.",
      date: "Dec 5, 2024",
      readTime: "10 min read",
      slug: "travel-agents-memory-context"
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-display-md mb-6">
            The <span className="text-accent">Tracelog</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Insights from the edge of AI product development
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article 
              key={index}
              className="card-minimal animate-on-scroll group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center text-muted-foreground text-sm mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex items-center text-accent group-hover:translate-x-1 transition-transform">
                <span className="text-sm font-medium">Read more</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-on-scroll">
          <Button className="btn-secondary group">
            Read More on the Blog
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="container-custom mt-20">
        <div className="divider"></div>
      </div>
    </section>
  );
};

export default BlogPreview;