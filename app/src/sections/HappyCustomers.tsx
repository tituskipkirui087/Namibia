import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Check, Users, TrendingUp, Award } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Johannes Shikongo',
    location: 'Windhoek',
    amount: 'NAD 150,000',
    quote: 'PAYTODAY Namibia Loans helped me expand my business. Fast and reliable service!',
    rating: 5,
    initials: 'JS',
  },
  {
    id: 2,
    name: 'Anna //Gawises',
    location: 'Swakopmund',
    amount: 'NAD 40,000',
    quote: 'The application process was so easy. Got my loan within 24 hours!',
    rating: 5,
    initials: 'AG',
  },
  {
    id: 3,
    name: 'Peter Amadhila',
    location: 'Oshakati',
    amount: 'NAD 10,000',
    quote: 'Great customer service and transparent terms. Highly recommended!',
    rating: 5,
    initials: 'PA',
  },
  {
    id: 4,
    name: 'Maria Kambinda',
    location: 'Walvis Bay',
    amount: 'NAD 50,000',
    quote: 'They helped me during an emergency. Thank you PAYTODAY Namibia!',
    rating: 5,
    initials: 'MK',
  },
  {
    id: 5,
    name: 'David Nakanyala',
    location: 'Rundu',
    amount: 'NAD 75,000',
    quote: 'Best loan rates in Namibia. The team was very professional throughout.',
    rating: 5,
    initials: 'DN',
  },
  {
    id: 6,
    name: 'Sarah Tjiposa',
    location: 'Keetmanshoop',
    amount: 'NAD 25,000',
    quote: 'Simple process and great support. Will definitely use again!',
    rating: 5,
    initials: 'ST',
  },
  {
    id: 7,
    name: 'Michael Namwandi',
    location: 'Lüderitz',
    amount: 'NAD 100,000',
    quote: 'PAYTODAY Namibia helped me start my own fishing business. Forever grateful!',
    rating: 5,
    initials: 'MN',
  },
  {
    id: 8,
    name: 'Jennifer //Gaes',
    location: 'Otjiwarongo',
    amount: 'NAD 35,000',
    quote: 'Excellent service! The staff made everything so straightforward.',
    rating: 5,
    initials: 'JG',
  },
  {
    id: 9,
    name: 'Robert Shilongo',
    location: 'Tsumeb',
    amount: 'NAD 60,000',
    quote: 'Fast approval and great communication. Very satisfied customer!',
    rating: 5,
    initials: 'RS',
  },
  {
    id: 10,
    name: 'Emma Haikali',
    location: 'Mariental',
    amount: 'NAD 20,000',
    quote: 'Perfect for emergencies. Got the money when I needed it most!',
    rating: 5,
    initials: 'EH',
  },
  {
    id: 11,
    name: 'Charles Mwatihapo',
    location: 'Gobabis',
    amount: 'NAD 80,000',
    quote: 'Helped me purchase equipment for my construction business. Thank you!',
    rating: 5,
    initials: 'CM',
  },
  {
    id: 12,
    name: 'Linda //Gomedus',
    location: 'Karasburg',
    amount: 'NAD 45,000',
    quote: 'Very happy with the service. Would recommend to everyone!',
    rating: 5,
    initials: 'LG',
  },
];

const HappyCustomers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="mtc-section bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] py-16">
      <div className="sl-container">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Happy Customers
          </h2>
          <p className="text-[#1674BB]">See what our customers say about PAYTODAY Namibia</p>
        </div>

        {/* Stats Row - Added to fill empty spaces */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="w-12 h-12 bg-[#1674BB]/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-[#1674BB]" />
            </div>
            <p className="text-2xl font-bold text-[#1674BB]">50,000+</p>
            <p className="text-xs text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="w-12 h-12 bg-[#1674BB]/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-[#1674BB]" />
            </div>
            <p className="text-2xl font-bold text-[#1674BB]">N$500M+</p>
            <p className="text-xs text-gray-600">Loans Disbursed</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="w-12 h-12 bg-[#1674BB]/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-[#1674BB]" />
            </div>
            <p className="text-2xl font-bold text-[#1674BB]">4.9/5</p>
            <p className="text-xs text-gray-600">Average Rating</p>
          </div>
        </div>

        {/* Testimonials Grid - Show 3 at a time on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Left Side - Additional Testimonial */}
          <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#2d21e9] rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">{testimonials[(currentIndex + 1) % testimonials.length].initials}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">{testimonials[(currentIndex + 1) % testimonials.length].name}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {testimonials[(currentIndex + 1) % testimonials.length].location}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 italic">&ldquo;{testimonials[(currentIndex + 1) % testimonials.length].quote}&rdquo;</p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#2d21e9] text-[#2d21e9]" />
              ))}
            </div>
          </div>

          {/* Center - Main Testimonial */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-[#2d21e9] hover:bg-[#2d21e9] hover:text-white transition-colors z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-[#1674BB] hover:bg-[#1674BB] hover:text-white transition-colors z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Main Testimonial Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 text-center h-full">
              {/* Avatar */}
              <div className="w-16 h-16 bg-[#1674BB] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">
                  {currentTestimonial.initials}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {currentTestimonial.name}
              </h3>

              {/* Location */}
              <div className="flex items-center justify-center gap-1 text-gray-500 mb-4">
                <MapPin className="w-4 h-4 text-[#1674BB]" />
                <span className="text-sm">{currentTestimonial.location}</span>
              </div>

              {/* Amount Badge */}
              <div className="inline-flex items-center gap-2 bg-[#1674BB]/10 text-[#1674BB] px-4 py-2 rounded-full mb-4">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Loan Approved: {currentTestimonial.amount}
                </span>
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-4 italic">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1">
                <span className="text-[#2d21e9] text-sm font-medium mr-2">Rating:</span>
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#1674BB] text-[#1674BB]" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Additional Testimonial */}
          <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#1674BB] rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">{testimonials[(currentIndex + 2) % testimonials.length].initials}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">{testimonials[(currentIndex + 2) % testimonials.length].name}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {testimonials[(currentIndex + 2) % testimonials.length].location}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 italic">&ldquo;{testimonials[(currentIndex + 2) % testimonials.length].quote}&rdquo;</p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#2d21e9] text-[#2d21e9]" />
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 bg-[#1674BB]'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyCustomers;
