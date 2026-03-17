import { FileText, Shield, Clock, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Apply Online',
    description: 'Fill out our simple application form with your basic details and loan requirements.',
    color: 'bg-blue-500',
  },
  {
    icon: Shield,
    title: 'Verify Details',
    description: 'Our team reviews your application and verifies your information securely.',
    color: 'bg-green-500',
  },
  {
    icon: Clock,
    title: 'Quick Approval',
    description: 'Get approved within 24 hours. We process applications fast.',
    color: 'bg-yellow-500',
  },
  {
    icon: CheckCircle,
    title: 'Receive Funds',
    description: 'Once approved, funds are disbursed directly to your bank account.',
    color: 'bg-purple-500',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-[#0A0E14]">
      <div className="sl-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It <span className="text-[#1674BB]">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get your loan in four simple steps. Our streamlined process makes borrowing quick and easy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#1674BB] to-transparent"></div>
              )}
              
              <div className="bg-[#141B24] rounded-2xl p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300 border border-gray-800 hover:border-[#1674BB]">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#1674BB] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-[#141B24] rounded-full px-6 py-3 border border-gray-800">
            <Clock className="w-5 h-5 text-[#1674BB]" />
            <span className="text-white">Average approval time: <span className="text-[#1674BB] font-semibold">24 hours</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
