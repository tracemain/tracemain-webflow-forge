import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center glass-button mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">AI-Powered Solutions</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Build Next-Gen
            <br />
            <span className="gradient-text">AI Applications</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From LLM-powered agentic systems to advanced data science platforms, 
            we help entrepreneurs and enterprises build cutting-edge AI solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="gradient-primary group">
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="glass-button">
              View Our Work
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">100+</div>
              <div className="text-muted-foreground">AI Projects Delivered</div>
            </div>
            <div className="glass-card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-muted-foreground">Enterprise Clients</div>
            </div>
            <div className="glass-card text-center">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-muted-foreground">Support & Maintenance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;