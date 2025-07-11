import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Company: [
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Blog', href: '/blog' },
    ],
    Resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Contact', href: '#contact' },
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-display font-semibold text-foreground">
                Tracemain
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Cutting-edge AI at the application layer
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted hover:border-accent transition-all duration-200 group"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display font-semibold mb-4 text-foreground">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-accent transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 Tracemain. All rights reserved.
          </p>
          
          {/* Contact Email */}
          <div className="flex items-center text-sm">
            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
            <a 
              href="mailto:hello@tracemain.com" 
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              hello@tracemain.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;