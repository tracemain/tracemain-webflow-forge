import Footer from '../components/sections/footer-new';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4">
      <div className="flex flex-col items-center gap-8 flex-1 justify-center w-full">
        <img src="/logo_word.png" alt="Tracemain Logo" className="h-14 mb-2" />
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-foreground tracking-tight">
          AI Systems for Complex Decisions.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground text-center max-w-xl">
          We build intelligent systems that reason, plan, and adapt—empowering people, not replacing them.
        </p>
        <a
          href="/blog"
          className="group inline-flex items-center gap-1 text-black font-medium text-base sm:text-lg mt-2 hover:underline underline-offset-4 transition-colors"
          aria-label="Read our writing"
        >
          Writing
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
