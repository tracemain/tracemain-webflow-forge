import Navbar from '../components/ui/navbar';
import Hero from '../components/sections/hero';
import Services from '../components/sections/services';
import About from '../components/sections/about';
import Contact from '../components/sections/contact';
import Footer from '../components/sections/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
