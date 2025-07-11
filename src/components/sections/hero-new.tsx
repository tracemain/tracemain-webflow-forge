const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <div className="container-simple text-center">
        
        {/* Dead simple giant text like thinkingmachines.ai */}
        <h1 className="text-huge mb-16 leading-none">
          TRACEMAIN
        </h1>

        {/* Simple description */}
        <div className="max-w-2xl mx-auto">
          <p className="text-body text-muted-foreground">
            An AI lab building real-world systems that work.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;