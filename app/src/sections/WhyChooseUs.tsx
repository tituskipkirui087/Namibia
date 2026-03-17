import { Check, Zap, Lock, Smartphone, Users, ShieldCheck, Clock, Heart } from 'lucide-react';

const features = [
  {
    icon: Check,
    title: 'Trusted & Licensed',
    description: 'Licensed by the Bank of Namibia, fully regulated and compliant',
    color: 'bg-[#2d21e9]',
  },
  {
    icon: Zap,
    title: 'Instant Approval',
    description: 'Get approved within minutes, funds disbursed same day',
    color: 'bg-[#2d21e9]',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Your data is encrypted and protected with bank-level security',
    color: 'bg-[#2d21e9]',
  },
  {
    icon: Smartphone,
    title: 'Easy Mobile Access',
    description: 'Apply through PAYTODAY App or USSD *120# 24/7',
    color: 'bg-[#2d21e9]',
  },
  {
    icon: Users,
    title: '50,000+ Customers',
    description: 'Join thousands of satisfied customers across Namibia',
    color: 'bg-[#2d21e9]',
  },
  {
    icon: ShieldCheck,
    title: 'No Hidden Fees',
    description: 'Transparent pricing with no surprise charges',
    color: 'bg-[#2d21e9]',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our customer service team is always ready to help',
    color: 'bg-[#2d21e9]',
  },
  {
    icon: Heart,
    title: 'Best Rates',
    description: 'Competitive interest rates tailored to your needs',
    color: 'bg-[#2d21e9]',
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="mtc-section bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="sl-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose PAYTODAY Namibia?
          </h2>
          <p className="text-[#2d21e9] text-lg font-medium">
            Your Trusted Financial Partner in Namibia
          </p>
          <div className="w-24 h-1 bg-[#2d21e9] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 hover:border-[#2d21e9]/30"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div
                className={`w-18 h-18 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}
              >
                <feature.icon className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#2d21e9] transition-colors">
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
