const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <div className="container-simple text-center">
        
        {/* Dead simple giant text like thinkingmachines.ai */}
        <h1 className="text-huge mb-16 leading-none">
          TRACEMAIN
        </h1>

        {/* Simple description */}
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-body text-foreground">
            Tracemain is an AI lab shaping the next wave of application-layer intelligence. 
            We build, fine-tune, and deploy real-world AI systems alongside ambitious founders and internal R&D.
          </p>
          
          <p className="text-body text-muted-foreground">
            While AI capabilities have advanced dramatically, key gaps remain. We focus on making 
            AI systems more contextual, deployable, and effective in real-world scenarios.
          </p>

          <p className="text-body text-muted-foreground">
            We are scientists, engineers, and builders creating the next generation of 
            AI applications that actually work.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;