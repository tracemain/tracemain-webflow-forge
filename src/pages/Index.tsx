import { useEffect } from 'react';
import SEO from '../components/SEO';

import Hero from '../components/sections/hero-new';
import About from '../components/sections/about-new';
import Labs from '../components/sections/labs';
import UseCases from '../components/sections/use-cases';
import BlogPreview from '../components/sections/blog-preview';
import Contact from '../components/sections/contact-simple';
import Footer from '../components/sections/footer-new';

const Index = () => {
  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-background">
        <Hero />
        {/* <About /> */}
        {/* <Labs />
        <UseCases />
        <BlogPreview /> */}
        {/* <Contact /> */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
