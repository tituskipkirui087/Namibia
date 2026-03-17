import { CreditCard, Home, Car, Briefcase, GraduationCap, HeartPulse } from 'lucide-react';

const services = [
  {
    icon: CreditCard,
    title: 'Personal Loans',
    description: 'Up to NAD 100,000 with flexible repayment terms up to 24 months',
    iconBg: 'bg-gradient-to-br from-red-400 to-red-600',
  },
  {
    icon: Home,
    title: 'Home Loans',
    description: 'Up to NAD 500,000 for your dream home with competitive rates',
    iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
  },
  {
    icon: Car,
    title: 'Auto Loans',
    description: 'Up to NAD 200,000 for new or used vehicles',
    iconBg: 'bg-gradient-to-br from-green-400 to-green-600',
  },
  {
    icon: Briefcase,
    title: 'Business Loans',
    description: 'Up to NAD 250,000 for entrepreneurs and SMEs',
    iconBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
  },
  {
    icon: GraduationCap,
    title: 'Education Loans',
    description: 'Fund your studies with loans up to NAD 75,000',
    iconBg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
  },
  {
    icon: HeartPulse,
    title: 'Medical Loans',
    description: 'Up to NAD 50,000 for emergency medical expenses',
    iconBg: 'bg-gradient-to-br from-pink-400 to-rose-600',
  },
];

const OurServices = () => {
  return (
    <section id="services" className="mtc-section bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="sl-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tailored financial solutions to meet your every need
          </p>
          <div className="w-24 h-1 bg-[#1674BB] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-gray-100 hover:border-[#1674BB]/30"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-18 h-18 ${service.iconBg} rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}
                >
                  <service.icon className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#1674BB] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
