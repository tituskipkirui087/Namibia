import { CreditCard, Home, Car, Briefcase } from 'lucide-react';

const services = [
  {
    icon: CreditCard,
    title: 'Personal Loans',
    description: 'Up to SLL 50,000,000 with flexible repayment terms',
    iconBg: 'bg-gradient-to-br from-orange-400 to-red-500',
  },
  {
    icon: Home,
    title: 'Home Loans',
    description: 'Up to SLL 150,000,000 for your dream home',
    iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
  },
  {
    icon: Car,
    title: 'Auto Loans',
    description: 'Up to SLL 50,000,000 for new or used vehicles',
    iconBg: 'bg-gradient-to-br from-green-400 to-green-600',
  },
  {
    icon: Briefcase,
    title: 'Business Loans',
    description: 'Up to SLL 100,000,000 for entrepreneurs and SMEs',
    iconBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
  },
];

const OurServices = () => {
  return (
    <section id="services" className="sl-section bg-[#F5F5F5]">
      <div className="sl-container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
