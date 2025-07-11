import { Plane, TrendingUp, Heart, Zap, Mic, Users } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    "Travel Agents",
    "Business Workflows",
    "Spiritual AI Guides",
    "PromptOps",
    "Voice Assistants", 
    "AI Tutors"
  ];

  return (
    <section id="projects" className="simple-section">
      <div className="container-simple">
        <h2 className="text-large mb-16 text-center">
          Applications
        </h2>

        <div className="space-y-4 max-w-lg mx-auto">
          {useCases.map((useCase, index) => (
            <div key={index} className="text-center">
              <p className="text-body text-muted-foreground">
                {useCase}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;