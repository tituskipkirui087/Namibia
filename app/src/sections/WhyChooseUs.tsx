import { Check, Zap, Lock, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Check,
    title: 'Trusted & Licensed',
    description: 'Licensed by the Bank of Sierra Leone, fully regulated and compliant',
    color: 'bg-[#F97316]',
  },
  {
    icon: Zap,
    title: 'Instant Approval',
    description: 'Get approved within minutes, funds disbursed same day',
    color: 'bg-[#F97316]',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Your data is encrypted and protected with bank-level security',
    color: 'bg-[#F97316]',
  },
  {
    icon: Smartphone,
    title: 'Easy Mobile Access',
    description: 'Apply through our mobile app or USSD code *123# 24/7',
    color: 'bg-[#F97316]',
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="sl-section bg-white">
      <div className="sl-container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Why Choose Sierra Loans?
          </h2>
          <p className="text-[#F97316]">Your Trusted Financial Partner in Sierra Leone</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group text-center p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div
                className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 relative`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
