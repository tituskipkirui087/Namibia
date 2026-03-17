import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'About us',
      links: [
        { label: 'Vision & Mission' },
        { label: 'Management' },
        { label: 'Annual reports' },
        { label: 'Connect magazines' },
        { label: 'Report fraud' },
        { label: 'Store Locator' },
        { label: 'Innovation Centre' },
      ],
    },
    {
      title: 'Corporate',
      links: [
        { label: 'Sponsorships & Events' },
        { label: 'Press releases' },
        { label: 'Procurement' },
        { label: 'Vacancies' },
        { label: 'Bursaries' },
        { label: 'Banking details' },
        { label: 'Direct debit form' },
        { label: 'Get in touch with PAYTODAY' },
        { label: 'Corporate Social Investment' },
        { label: 'Company profile' },
      ],
    },
    {
      title: 'Applications',
      links: [
        { label: 'MyPAYTODAY mobile app' },
        { label: 'Connect SMS' },
        { label: 'Huawei Hilink app' },
        { label: 'Roaming' },
        { label: 'PAYTODAY network towers' },
        { label: 'Phone Repair' },
        { label: 'National Internship Program' },
        { label: 'Online SIM Registration' },
      ],
    },
    {
      title: 'Shortcodes',
      links: [
        { label: 'Pre-paid' },
        { label: 'Contract' },
        { label: 'Internet' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/PayTodayNamibia', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/PayTodayNamibia', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/paytodaynamibia/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/PayTodayNamibia', label: 'YouTube' },
  ];

  return (
    <footer id="contact" className="bg-[#0A0E14] text-white">
      {/* Main Footer */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Logo and Contact - First column spans differently */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
              <div className="mb-6">
                <img 
                  src="/paytoday.webp" 
                  alt="PAYTODAY Namibia" 
                  className="h-16 w-auto mb-4"
                />
              </div>
              <h3 className="text-lg font-semibold mb-4 text-[#2d21e9]">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">
                    Cnr. of Mosé Tjitendero & Hamutenya Wanahepo Ndadi Street, Olympia Windhoek, Namibia
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+264 61 280 2000</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>support@paytoday.com.na</span>
                </li>
              </ul>
            </div>

            {/* Footer Links Columns - Plain Text (Not Clickable) */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4 text-[#2d21e9]">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <span className="text-gray-400 text-sm block">
                        {link.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright - Plain Text */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 PAYTODAY Namibia. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Follow PAYTODAY</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#2d21e9] hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="#calculator" className="paytoday-btn-primary shadow-lg hover:shadow-xl flex items-center gap-2">
          Apply Now
        </a>
      </div>
    </footer>
  );
};

export default Footer;
