import { useState, useEffect, useRef } from 'react';
import { Star, Shield, Check } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  amount: string;
}

interface HeroProps {
  onLoginClick?: () => void;
}

const notifications: Notification[] = [
  // Male Names
  { id: 1, name: 'Johannes Shikongo', amount: 'NAD 50,000' },
  { id: 2, name: 'Peter Amadhila', amount: 'NAD 10,000' },
  { id: 3, name: 'Namene Shikongo', amount: 'NAD 30,000' },
  { id: 4, name: 'Immanuel Hamukoto', amount: 'NAD 75,000' },
  { id: 5, name: 'Josia Tjipua', amount: 'NAD 25,000' },
  { id: 6, name: 'Matheus Hifikepunye', amount: 'NAD 40,000' },
  { id: 7, name: 'Samuel Nangolo', amount: 'NAD 15,000' },
  { id: 8, name: 'David !Gaxab', amount: 'NAD 60,000' },
  { id: 9, name: 'Andreas //Gaseb', amount: 'NAD 35,000' },
  { id: 10, name: 'Benedictus Hamukoto', amount: 'NAD 20,000' },
  { id: 11, name: 'Mathew Shikongo', amount: 'NAD 45,000' },
  { id: 12, name: 'Absalom Shikulo', amount: 'NAD 55,000' },
  { id: 13, name: 'Jeremia Muatongo', amount: 'NAD 80,000' },
  { id: 14, name: 'Israel Amadhila', amount: 'NAD 12,000' },
  { id: 15, name: 'Robert Hifikepunye', amount: 'NAD 65,000' },
  { id: 16, name: 'Charles Nangolo', amount: 'NAD 28,000' },
  { id: 17, name: 'Fransisko Uakenda', amount: 'NAD 42,000' },
  { id: 18, name: 'Benyamin Hamwedi', amount: 'NAD 18,000' },
  { id: 19, name: 'Hifikepunye Pohamba', amount: 'NAD 70,000' },
  { id: 20, name: 'Nahum Amadhila', amount: 'NAD 33,000' },
  // Female Names
  { id: 21, name: 'Anna //Gawises', amount: 'NAD 25,000' },
  { id: 22, name: 'Maria Kambinda', amount: 'NAD 75,000' },
  { id: 23, name: 'Elizabeth Shikongo', amount: 'NAD 15,000' },
  { id: 24, name: 'Sarah Amadhila', amount: 'NAD 40,000' },
  { id: 25, name: 'Rebecca Nangolo', amount: 'NAD 22,000' },
  { id: 26, name: 'Ruth Shikulo', amount: 'NAD 55,000' },
  { id: 27, name: 'Grace Hamukoto', amount: 'NAD 30,000' },
  { id: 28, name: 'Faith //Gawises', amount: 'NAD 45,000' },
  { id: 29, name: 'Hope Amadhila', amount: 'NAD 18,000' },
  { id: 30, name: 'Charity Nangolo', amount: 'NAD 62,000' },
  { id: 31, name: 'Mercy Shikongo', amount: 'NAD 28,000' },
  { id: 32, name: 'Joyce Hamukoto', amount: 'NAD 35,000' },
  { id: 33, name: 'Peace Amadhila', amount: 'NAD 50,000' },
  { id: 34, name: 'Esther Nangolo', amount: 'NAD 20,000' },
  { id: 35, name: 'Deborah Shikulo', amount: 'NAD 68,000' },
  { id: 36, name: 'Priscilla //Gawises', amount: 'NAD 38,000' },
  { id: 37, name: 'Lydia Hamukoto', amount: 'NAD 24,000' },
  { id: 38, name: 'Dorothy Amadhila', amount: 'NAD 72,000' },
  { id: 39, name: 'Catherine Nangolo', amount: 'NAD 16,000' },
  { id: 40, name: 'Veronica Shikongo', amount: 'NAD 48,000' },
  { id: 41, name: 'Patricia Hamukoto', amount: 'NAD 32,000' },
  { id: 42, name: 'Jennifer Amadhila', amount: 'NAD 58,000' },
  { id: 43, name: 'Linda Nangolo', amount: 'NAD 21,000' },
  { id: 44, name: 'Susan Shikulo', amount: 'NAD 44,000' },
  { id: 45, name: 'Jessica //Gawises', amount: 'NAD 66,000' },
];

const Hero = ({ onLoginClick }: HeroProps) => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [counters, setCounters] = useState({ customers: 0, disbursed: 0, rating: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Rotate notifications
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setShowNotification(true);
      }, 300);
    }, 6000);
    return () => clearInterval(notificationInterval);
  }, []);

  // Counter animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        customers: Math.floor(50000 * easeOut),
        disbursed: Math.floor(500000000 * easeOut),
        rating: parseFloat((4.8 * easeOut).toFixed(1)),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters({ customers: 50000, disbursed: 500000000, rating: 4.8 });
      }
    }, interval);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(0) + 'B+';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
    return num.toString();
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[750px] overflow-hidden">
      {/* Background - Video with autoplay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/20260317_0520_New Video_simple_compose_01kkwsg8hbe3y8qy0p9qyt23x2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 sl-container pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#1affd5]">
              Simple Loans
            </span>
            <br />
            <span className="text-[#1affd5]">in Namibia</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 font-medium">
            From <span className="text-[#1affd5] font-bold text-3xl">NAD 5,000</span> to <span className="text-[#1affd5] font-bold text-3xl">NAD 100,000</span>
          </p>
          
          {/* Description */}
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Quick, reliable, and transparent loan services tailored to your needs. 
            Apply now and get approved within 24 hours!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onLoginClick}
              className="px-10 py-5 bg-[#1674BB] text-white text-xl font-bold rounded-2xl hover:bg-[#145a9e] transition-all duration-300 shadow-2xl"
            >
              Get Started
            </button>
            <button
              onClick={onLoginClick}
              className="px-10 py-5 bg-white text-[#1674BB] text-xl font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Apply Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#1affd5]" />
              <span className="text-sm font-medium">Instant Approval</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#1affd5]" />
              <span className="text-sm font-medium">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#1affd5]" />
              <span className="text-sm font-medium">Secure & Private</span>
            </div>
          </div>
        </div>

        {/* Floating Notification - Fixed to right corner of site */}
        <div className="fixed top-32 -right-2 md:right-6 z-20 hidden lg:block">
          <div
            className={`transition-all duration-700 ${
              showNotification
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-24'
            }`}
          >
            <div className="bg-[#1A1A1A]/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-[#1674BB]/30 min-w-[220px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#1674BB]" />
                  <Check className="w-3 h-3 text-[#1674BB] -ml-2" />
                </div>
                <span className="text-[10px] text-[#1674BB] font-medium tracking-wider">
                  LOAN APPROVED
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1674BB] rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {notifications[currentNotification].name}
                  </p>
                  <p className="text-[#1674BB] font-bold text-lg">
                    {notifications[currentNotification].amount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          ref={statsRef}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#1674BB] to-[#1674BB]"
        >
          <div className="sl-container py-6">
            <div className="grid grid-cols-3 gap-4 md:gap-16">
              <div className="text-center">
                <p className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                  {formatNumber(counters.customers)}+
                </p>
                <p className="text-xs md:text-sm font-semibold text-white mt-1 tracking-wider">HAPPY CUSTOMERS</p>
              </div>
              <div className="text-center border-x border-white/30">
                <p className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                  NAD {formatNumber(counters.disbursed)}+
                </p>
                <p className="text-xs md:text-sm font-semibold text-white mt-1 tracking-wider">LOANS DISBURSED</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg flex items-center justify-center gap-2">
                  {counters.rating}
                  <Star className="w-6 h-6 md:w-8 md:h-8 fill-yellow-300 text-yellow-300" />
                </p>
                <p className="text-xs md:text-sm font-semibold text-white mt-1 tracking-wider">CUSTOMER RATING</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
