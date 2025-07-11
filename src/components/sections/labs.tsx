import { Brain, MessageSquare, Settings, Mic, TrendingUp, GraduationCap } from 'lucide-react';

const Labs = () => {
  const projects = [
    {
      icon: Brain,
      title: "Tiny LLMs, Big Impact",
      description: "Fine-tuning small language models to run performant tasks without cloud or server infrastructure."
    },
    {
      icon: MessageSquare,
      title: "Agentic Applications",
      description: "Intelligent agents for travel, business, spirituality, and leisure - tailored to purpose and context."
    },
    {
      icon: Settings,
      title: "Prompt Infrastructure",
      description: "Frameworks to evaluate, optimize, and manage prompts across real-world deployments."
    },
    {
      icon: Mic,
      title: "Voice AI Stack",
      description: "End-to-end platform for building, deploying, and scaling conversational voice agents."
    },
    {
      icon: TrendingUp,
      title: "AI-powered GTM Platform",
      description: "A smarter way to take products to market using generative AI across sales, content, and outreach."
    },
    {
      icon: GraduationCap,
      title: "AI for Education",
      description: "Personalized, generative learning journeys that adapt to every learner's path."
    }
  ];

  return (
    <section id="labs" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-display-md mb-6">
            What We're <span className="text-accent">Working On</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="card-minimal animate-on-scroll group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <project.icon className="w-6 h-6 text-accent" />
              </div>
              
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
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

export default Labs;