import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Check } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mohamed Kamara',
    location: 'Freetown',
    amount: 'SLL 15,000,000',
    quote: 'Sierra Loans helped me expand my business. Fast and reliable service!',
    rating: 5,
    initials: 'MK',
  },
  {
    id: 2,
    name: 'Aminata Sesay',
    location: 'Bo',
    amount: 'SLL 4,000,000',
    quote: 'The application process was so easy. Got my loan within 24 hours!',
    rating: 5,
    initials: 'AS',
  },
  {
    id: 3,
    name: 'Ibrahim Conteh',
    location: 'Makeni',
    amount: 'SLL 100,000',
    quote: 'Great customer service and transparent terms. Highly recommended!',
    rating: 5,
    initials: 'IC',
  },
  {
    id: 4,
    name: 'Fatmata Koroma',
    location: 'Kenema',
    amount: 'SLL 500,000',
    quote: 'They helped me during an emergency. Thank you Sierra Loans!',
    rating: 5,
    initials: 'FK',
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
    <section className="sl-section bg-gradient-to-b from-[#FFF7ED] to-[#FED7AA]">
      <div className="sl-container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Happy Customers
          </h2>
          <p className="text-[#F97316]">See what our customers say about Sierra Loans</p>
        </div>

        <div className="max-w-lg mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#F97316] hover:bg-[#F97316] hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#F97316] hover:bg-[#F97316] hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 text-center transition-all duration-500">
            {/* Avatar */}
            <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center mx-auto mb-4">
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
              <MapPin className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm">{currentTestimonial.location}</span>
            </div>

            {/* Amount Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FFF7ED] text-[#F97316] px-4 py-2 rounded-full mb-4">
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
              <span className="text-[#F97316] text-sm font-medium mr-2">Rating:</span>
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#F97316] text-[#F97316]" />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-6 bg-[#F97316]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HappyCustomers;
