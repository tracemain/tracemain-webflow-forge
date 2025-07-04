import { CheckCircle, Target, Lightbulb, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We exist to democratize AI technology and make it accessible to businesses of all sizes.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We stay at the forefront of AI research and development to deliver cutting-edge solutions.'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your success is our success. We work as an extension of your team to achieve your goals.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Focused',
      description: 'We deliver robust, scalable solutions that stand the test of time and scale with your business.'
    }
  ];

  const achievements = [
    '5+ Years in AI Development',
    'Certified AI Specialists',
    'Enterprise-Grade Security',
    'Global Client Base',
    '99.9% Uptime Guarantee',
    'Continuous Innovation'
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-accent/5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Tracemain</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Tracemain is a pioneering AI development company that specializes in creating 
              next-generation artificial intelligence solutions. We help companies, entrepreneurs, 
              and builders transform their ideas into powerful AI-driven applications.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              Our team of experienced AI engineers and data scientists work closely with clients 
              to deliver end-to-end solutions that drive real business value. From concept to 
              deployment, we ensure your AI initiatives succeed.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-8">Our Values</h3>
            {values.map((value, index) => (
              <div key={index} className="glass-card">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center mr-4 flex-shrink-0">
                    <value.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;