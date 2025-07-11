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
    <footer className="simple-section border-t border-border">
      <div className="container-simple">
        <div className="text-center">
          <p className="text-body text-muted-foreground mb-4">
            © 2025 Tracemain
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;