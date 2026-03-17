import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What are the eligibility requirements?',
    answer: 'To qualify for a PAYTODAY loan, you must be a Namibian citizen aged 18-65, have a valid ID, have a active bank account, and have a regular source of income.',
  },
  {
    question: 'How much can I borrow?',
    answer: 'You can borrow between NAD 5,000 and NAD 100,000 depending on your income level and creditworthiness.',
  },
  {
    question: 'How long does it take to get approved?',
    answer: 'Most applications are approved within 24 hours. Once approved, funds are disbursed immediately to your bank account.',
  },
  {
    question: 'What documents do I need?',
    answer: 'You will need a valid Namibian ID, proof of income (pay slip or bank statement), and a bank statement from the last 3 months.',
  },
  {
    question: 'Is my information secure?',
    answer: 'Yes, we use bank-level encryption and security measures to protect your personal and financial information. We never share your data with third parties.',
  },
  {
    question: 'Can I repay early?',
    answer: 'Yes, you can repay your loan early without any penalty. Early repayment may actually improve your credit score.',
  },
  {
    question: 'What happens if I miss a payment?',
    answer: 'If you miss a payment, late fees may apply and it may affect your credit score. Please contact us immediately if you are having difficulties repaying.',
  },
  {
    question: 'How do I apply?',
    answer: 'Simply click "Get Started" or "Apply Now" on our website, fill out the application form, and submit. Our team will review and get back to you within 24 hours.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-[#0A0E14]">
      <div className="sl-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked <span className="text-[#1674BB]">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our loan services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#141B24] rounded-xl border border-gray-800 overflow-hidden hover:border-[#1674BB] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#1674BB] flex-shrink-0" />
                  <span className="text-white font-medium">{item.question}</span>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#1674BB] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 pt-0">
                  <p className="text-gray-400 pl-8">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <button className="bg-[#1674BB] hover:bg-[#145a9e] text-white font-semibold py-3 px-8 rounded-xl transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
