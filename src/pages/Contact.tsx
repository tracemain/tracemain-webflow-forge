import { Helmet } from 'react-helmet-async';
import ContactSection from '@/components/sections/contact';
import Footer from '../components/sections/footer-new';

const Contact = () => {
  return (
    <>   
      <Helmet>
        <title>Contact Us - Tracemain</title>
        <meta name="description" content="Get in touch with Tracemain." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="w-full max-w-6xl px-4 mx-auto pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 sm:gap-0">
            <div className="flex justify-start items-center">
              <a href="/">
                <img
                  src="/logo_word.png"
                  alt="Tracemain Logo"
                  className="h-8 sm:h-10 w-auto"
                />
              </a>
            </div>
            <div className="flex justify-center items-center gap-4 sm:gap-6">
              <a href="/blog" className="simple-link text-sm sm:text-base">
                Blog
              </a>
              <a href="https://cal.com/tracemain/30min" className="simple-link text-sm sm:text-base" target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
        <ContactSection />
      </div>
      <Footer />
    </>
  );
};

export default Contact;
