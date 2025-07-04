import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'hello@tracemain.com',
      href: 'mailto:hello@tracemain.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'San Francisco, CA',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-secondary/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your business with AI? Let's discuss your project and explore how we can help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            {contactInfo.map((info, index) => (
              <div key={index} className="glass-card">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mr-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{info.title}</h4>
                    <a 
                      href={info.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="glass-card">
              <h4 className="font-semibold mb-3">Why Choose Tracemain?</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Proven track record with 100+ successful AI projects</li>
                <li>• Expert team of AI engineers and data scientists</li>
                <li>• End-to-end solution development and support</li>
                <li>• Cutting-edge technology and best practices</li>
                <li>• Transparent communication and project management</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input 
                    id="name"
                    type="text" 
                    placeholder="Your name"
                    className="glass"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="your@email.com"
                    className="glass"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <Input 
                  id="company"
                  type="text" 
                  placeholder="Your company name"
                  className="glass"
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium mb-2">
                  Project Type
                </label>
                <select className="w-full glass rounded-lg px-3 py-2 bg-transparent border border-white/10">
                  <option value="">Select project type</option>
                  <option value="llm-agent">LLM-Powered Agentic Systems</option>
                  <option value="data-science">Data Science Platform</option>
                  <option value="ai-app">AI-First Application</option>
                  <option value="enterprise">Enterprise AI Solution</option>
                  <option value="consulting">AI Development Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea 
                  id="message"
                  placeholder="Tell us about your project..."
                  className="glass min-h-[120px]"
                />
              </div>

              <Button type="submit" className="gradient-primary w-full group">
                Send Message
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;