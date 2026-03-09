import { useState, useEffect, useRef } from 'react';
import { Star, Shield, Check } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  amount: string;
}

const notifications: Notification[] = [
  { id: 1, name: 'Mohamed Kamara', amount: 'SLL 500,000' },
  { id: 2, name: 'Aminata Sesay', amount: 'SLL 250,000' },
  { id: 3, name: 'Ibrahim Conteh', amount: 'SLL 100,000' },
  { id: 4, name: 'Fatmata Koroma', amount: 'SLL 750,000' },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [counters, setCounters] = useState({ customers: 0, disbursed: 0, rating: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const slides = [
    '/hero-bg-1.jpg',
    '/hero-bg-2.jpg',
    '/hero-bg-3.jpg',
  ];

  // Auto-rotate background slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

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
    <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Background Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        </div>
      ))}

      {/* Orange Geometric Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-20 right-10 w-64 h-64 opacity-20"
          viewBox="0 0 200 200"
        >
          <path
            d="M100 20L180 60L180 140L100 180L20 140L20 60Z"
            fill="none"
            stroke="#F97316"
            strokeWidth="2"
          />
          <path
            d="M100 50L150 75L150 125L100 150L50 125L50 75Z"
            fill="none"
            stroke="#F97316"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 sl-container pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Simple Loans in Sierra Leone
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
            From <span className="text-[#F97316] font-bold">SLL 50,000 - 1,000,000</span>
          </p>
        </div>

        {/* Floating Notification */}
        <div className="absolute top-20 -right-2 md:right-0 z-20">
          <div
            className={`transition-all duration-700 ${
              showNotification
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-24'
            }`}
          >
            <div className="bg-[#1A1A1A]/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-[#F97316]/30 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#F97316]" />
                  <Check className="w-3 h-3 text-[#F97316] -ml-2" />
                </div>
                <span className="text-[10px] text-[#F97316] font-medium tracking-wider">
                  LOAN APPROVED
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {notifications[currentNotification].name}
                  </p>
                  <p className="text-[#F97316] font-bold text-sm">
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
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-orange-500"
        >
          <div className="sl-container py-8">
            <div className="grid grid-cols-3 gap-2 md:gap-12">
              <div className="text-center group">
                <p className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {formatNumber(counters.customers)}+
                </p>
                <p className="text-xs md:text-sm font-semibold text-orange-100 mt-2 tracking-wider">CUSTOMERS</p>
              </div>
              <div className="text-center border-x border-orange-400/50 group">
                <p className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  SLL {formatNumber(counters.disbursed)}+
                </p>
                <p className="text-xs md:text-sm font-semibold text-orange-100 mt-2 tracking-wider">DISBURSED</p>
              </div>
              <div className="text-center group">
                <p className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg flex items-center justify-center gap-2 group-hover:scale-110 transition-transform duration-300">
                  {counters.rating}
                  <Star className="w-6 h-6 md:w-8 md:h-8 fill-yellow-300 text-yellow-300" />
                </p>
                <p className="text-xs md:text-sm font-semibold text-orange-100 mt-2 tracking-wider">RATING</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
