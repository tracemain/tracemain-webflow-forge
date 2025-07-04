import { Brain, Database, Zap, Shield, Code, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: 'LLM-Powered Agentic Systems',
      description: 'Build intelligent agents that can reason, plan, and execute complex tasks autonomously using advanced language models.',
      features: ['Custom AI Agents', 'Multi-Agent Orchestration', 'RAG Implementation', 'Fine-tuning Services']
    },
    {
      icon: Database,
      title: 'Data Science Platforms',
      description: 'Create comprehensive data science solutions that transform raw data into actionable business insights.',
      features: ['ML Pipeline Development', 'Predictive Analytics', 'Real-time Processing', 'Data Visualization']
    },
    {
      icon: Zap,
      title: 'AI-First Applications',
      description: 'Develop modern applications with AI at their core, designed for scalability and performance.',
      features: ['Intelligent Automation', 'Natural Language Interfaces', 'Computer Vision', 'Recommendation Systems']
    },
    {
      icon: Shield,
      title: 'Enterprise AI Solutions',
      description: 'Secure, scalable AI implementations tailored for enterprise environments and compliance needs.',
      features: ['Security-First Design', 'Compliance Ready', 'Enterprise Integration', 'Custom Deployment']
    },
    {
      icon: Code,
      title: 'AI Development Consulting',
      description: 'Strategic guidance and technical expertise to help you navigate the AI landscape effectively.',
      features: ['Technology Assessment', 'Architecture Design', 'Team Training', 'Best Practices']
    },
    {
      icon: Users,
      title: 'End-to-End Solutions',
      description: 'Complete project lifecycle management from ideation to deployment and ongoing support.',
      features: ['Project Management', 'Quality Assurance', 'Deployment Support', 'Maintenance & Updates']
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI solutions designed to transform your business and accelerate innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-card group hover:scale-105 transition-all duration-300 hover:glow-primary"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mr-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;