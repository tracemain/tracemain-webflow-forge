import { Plane, TrendingUp, Heart, Zap, Mic, Users } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: Plane,
      title: "Travel Agents",
      description: "Plan, book, and manage trips with AI agents that understand intent."
    },
    {
      icon: TrendingUp,
      title: "Business Workflows",
      description: "Internal copilots and automations that free up real human capacity."
    },
    {
      icon: Heart,
      title: "Spiritual AI Guides",
      description: "Language models fine-tuned on ancient texts and rituals for spiritual exploration."
    },
    {
      icon: Zap,
      title: "PromptOps",
      description: "Run continuous evaluations, test variations, and ship safer AI with confidence."
    },
    {
      icon: Mic,
      title: "Voice Assistants",
      description: "Domain-specific voice AI with real deployment workflows."
    },
    {
      icon: Users,
      title: "AI Tutors",
      description: "Generative teaching systems trained on pedagogical best practices."
    }
  ];

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-display-md mb-6">
            Where Tracemain AI <span className="text-accent">Shows Up</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Our work spans across domains, but always delivers functional, measurable value.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index} 
              className="card-minimal animate-on-scroll group text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-accent/20 transition-colors">
                <useCase.icon className="w-8 h-8 text-accent" />
              </div>
              
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                {useCase.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="container-custom mt-20">
        <div className="divider"></div>
      </div>
    </section>
  );
};

export default UseCases;