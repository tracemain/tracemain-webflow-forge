const About = () => {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          
          {/* Headline */}
          <h2 className="text-display-md mb-8">
            Building at the Cutting Edge of the{' '}
            <span className="text-accent">AI Application Layer</span>
          </h2>

          {/* Body Content */}
          <div className="space-y-8 text-body-lg text-left max-w-3xl mx-auto">
            <p>
              At Tracemain, we believe that the future of AI lies not in larger models—but in 
              smarter, more contextual, and deployable systems. We focus on real-world outcomes: 
              where AI doesn't just exist, it works.
            </p>
            
            <p>
              We develop in-house AI products, collaborate with visionary founders, and build 
              foundational frameworks for prompt management, agentic intelligence, and reliable 
              deployment—especially where cloud infra isn't always viable.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container-custom mt-16">
        <div className="divider"></div>
      </div>
    </section>
  );
};

export default About;