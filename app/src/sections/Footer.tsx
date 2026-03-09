import { Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
  const navLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Visit Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ), href: '#', label: 'TikTok' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
    { icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 3.48 2.527 0 1.306-.983 2.254-2.456 2.527l1.256 4.514c.07.249 0 .498-.193.623-.193.125-.456.125-.65.063l-1.324-.498c-.193-.07-.35-.249-.35-.498l-.07-2.776c-.543.125-1.085.187-1.628.187-.544 0-1.086-.062-1.629-.187l-.07 2.776c0 .249-.156.428-.35.498l-1.323.498c-.193.062-.456.062-.65-.063-.193-.125-.262-.374-.193-.623l1.256-4.514c-1.473-.273-2.456-1.221-2.456-2.527 0-1.895 1.656-2.457 3.48-2.527l-.8-3.747-2.597.547a1.25 1.25 0 0 1-2.498-.056c0-.688.562-1.249 1.25-1.249h.01l5.638-1.186c.193-.062.387-.062.58 0l5.638 1.186z"/>
      </svg>
    ), href: '#', label: 'Reddit' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer id="contact" className="bg-[#1A1A1A] text-white">
      <div className="sl-container py-12">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#F97316] rounded-xl flex items-center justify-center mb-4">
            <svg
              viewBox="0 0 32 32"
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 4L28 8L16 12L4 8L16 4Z" />
              <path d="M4 16L16 20L28 16" />
              <path d="M4 24L16 28L28 24" />
            </svg>
          </div>
          <p className="text-[#F97316] text-sm font-medium tracking-wider text-center">
            SIERRA LOANS - YOUR TRUSTED FINANCIAL PARTNER
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-[#F97316] transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#F97316] hover:text-white transition-all duration-300 hover:scale-110"
            >
              <social.icon />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm">
            © 2026 Sierra Loans. All Rights Reserved. Licensed by Bank of Sierra Leone.
          </p>
        </div>
      </div>

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="#calculator" className="sl-btn-primary shadow-lg hover:shadow-xl flex items-center gap-2">
          Apply Now
        </a>
      </div>
    </footer>
  );
};

export default Footer;
