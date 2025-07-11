import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          
          {/* Main Headline */}
          <h1 className="text-display-lg mb-8">
            AI, Built for the{' '}
            <span className="text-accent">Real World</span>
          </h1>

          {/* Subheadline */}
          <p className="text-body-lg mb-12 max-w-3xl mx-auto">
            We are Tracemain — an AI lab shaping the next wave of application-layer intelligence. 
            We build, fine-tune, and deploy real-world AI systems alongside ambitious founders and internal R&D.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button className="btn-primary group">
              Explore Our Work
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="btn-secondary group">
              <MessageCircle className="mr-2 w-4 h-4" />
              Talk to Us
            </Button>
          </div>

          {/* Subtle indicator */}
          <div className="text-muted-foreground text-sm font-medium">
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;