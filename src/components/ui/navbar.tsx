import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Labs', href: '#labs' },
    { name: 'Applications', href: '#projects' },
    { name: 'Writing', href: '#writing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container-simple">
        <div className="flex items-center justify-between h-16">
          {/* Simple text logo */}
          <div className="text-sm font-medium text-foreground">
            Tracemain
          </div>

          {/* Minimal navigation - desktop only */}
          {/* <div className="hidden md:flex items-center space-x-8 text-sm">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="simple-link"
              >
                {item.name}
              </a>
            ))}
          </div> */}

          {/* Mobile menu button */}
          {/* <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-1"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div> */}
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container-simple py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block simple-link"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;