import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../ui/button';

const BlogPreview = () => {
  const blogPosts = [
    "Better Interfaces",
    "PromptOps Framework", 
    "Travel Agents with Memory"
  ];

  return (
    <section className="simple-section">
      <div className="container-simple">
        <h2 className="text-large mb-16 text-center">
          Writing
        </h2>

        <div className="space-y-4 max-w-lg mx-auto">
          {blogPosts.map((post, index) => (
            <div key={index} className="text-center">
              <p className="text-body text-muted-foreground">
                {post}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;