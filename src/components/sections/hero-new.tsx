const Hero = () => {
  return (
    <section className="simple-section">
      <div className="container-simple">
        <div className="flex justify-between items-start mb-16">
          <h1 className="text-title">
            TRACEMAIN
          </h1>
          <a href="/blog" className="simple-link">
            Writing
          </a>
        </div>
        <div className="max-w-2xl">
          <p className="text-body mb-8">
            We build intelligent systems that understand context, learn from interactions, and adapt to complex environments.
          </p>
          <p className="text-body mb-8">
            Our work focuses on developing AI agents that can reason, plan, and execute tasks across diverse domains - from automated research and content generation to complex decision-making processes.
          </p>
          <p className="text-body">
            Through careful design and implementation, we create systems that enhance human capabilities rather than replace them.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;