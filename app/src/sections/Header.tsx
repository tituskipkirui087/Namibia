import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
  onLoginClick?: () => void;
  onFAQClick?: () => void;
}

const Header = ({ onLogout, onLoginClick, onFAQClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0E14]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mtc-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/paytoday.webp" 
              alt="PAYTODAY Namibia" 
              className="w-10 h-10 object-contain rounded-lg"
            />
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-[#2d21e9]' : 'text-[#2d21e9]'
            }`}>
              PAYTODAY Namibia
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#1affd5] ${
                  isScrolled ? 'text-gray-300' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            {onLogout && (
              <button
                onClick={onLogout}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#1affd5] ${
                  isScrolled ? 'text-gray-300' : 'text-white'
                } flex items-center gap-1`}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
            {onFAQClick && (
              <button
                onClick={onFAQClick}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#1affd5] ${
                  isScrolled ? 'text-gray-300' : 'text-white'
                }`}
              >
                FAQ
              </button>
            )}
            {!onLogout && onLoginClick && (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 bg-[#2d21e9] text-white text-sm font-medium rounded-lg hover:bg-[#1a1ad9] transition-colors"
              >
                Get Started
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0A0E14] shadow-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="mtc-container py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-[#1affd5] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-[#1affd5] rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
          {onFAQClick && (
            <button
              onClick={() => {
                onFAQClick();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-[#1affd5] rounded-lg transition-colors"
            >
              FAQ
            </button>
          )}
          {!onLogout && onLoginClick && (
            <button
              onClick={() => {
                onLoginClick();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-3 bg-[#2d21e9] text-white rounded-lg transition-colors"
            >
              Get Started
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
