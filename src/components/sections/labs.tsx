import { Brain, MessageSquare, Settings, Mic, TrendingUp, GraduationCap } from 'lucide-react';

const Labs = () => {
  const projects = [
    "Tiny LLMs",
    "Agentic Applications", 
    "Prompt Infrastructure",
    "Voice AI Stack",
    "AI-powered GTM Platform",
    "AI for Education"
  ];

  return (
    <section id="labs" className="simple-section">
      <div className="container-simple">
        <h2 className="text-large mb-16 text-center">
          Labs
        </h2>

        <div className="space-y-4 max-w-lg mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="text-center">
              <p className="text-body text-muted-foreground">
                {project}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Labs;