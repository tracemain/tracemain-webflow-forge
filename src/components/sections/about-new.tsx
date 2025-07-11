const About = () => {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          
          <h2 className="text-large mb-8">
            AI Application Layer
          </h2>

          <div className="max-w-2xl mx-auto">
            <p className="text-body text-muted-foreground">
              We focus on making AI systems more contextual, deployable, and effective in real-world scenarios.
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