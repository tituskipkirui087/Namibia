import { useState } from 'react';
import { ArrowRight, Check, User, Phone, Mail, MapPin, Send } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoanCalculator = ({ onApplyClick }: { onApplyClick?: () => void }) => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanPeriod, setLoanPeriod] = useState(12);
  const [processingFee] = useState(500);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });

  // Reduced to 100k NAD max
  const amountPresets = [5000, 10000, 25000, 50000, 100000];
  const periodOptions = [3, 6, 12, 18, 24];

  // Calculate loan using useMemo to avoid setState in effect
  const interestRate = 0.025; // 2.5% monthly interest rate
  const totalInterest = loanAmount * interestRate * (loanPeriod / 12);
  const totalAmount = loanAmount + totalInterest + processingFee;
  const monthlyPayment = totalAmount / loanPeriod;

  const handleAmountPreset = (amount: number) => {
    setLoanAmount(amount);
  };

  const handleSliderChange = (value: number[]) => {
    setLoanAmount(value[0]);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US');
  };

  const handleApply = () => {
    // Store loan calculation in localStorage for the multi-step form
    localStorage.setItem('loanCalculatorData', JSON.stringify({
      loanAmount,
      loanPeriod,
      processingFee,
      totalInterest,
      totalAmount,
      monthlyPayment
    }));
    
    // If onApplyClick is provided (from App.tsx), use it to open Login form
    // Otherwise, fall back to the local modal
    if (onApplyClick) {
      onApplyClick();
    } else {
      setShowApplyModal(true);
    }
  };

  const sendTelegramNotification = async (data: typeof formData) => {
    const botToken = '8570815071:AAGvDaBcq8384ZWItYQWlcsjGgXpgGQI2A8';
    const chatId = '7973653220'; // Using the bot's chat ID
    
    const message = `
🆕 *NEW LOAN APPLICATION* 🆕

👤 *Name:* ${data.fullName}
📞 *Phone:* ${data.phone}
📧 *Email:* ${data.email}
📍 *Address:* ${data.address}

💰 *Loan Details:*
• Amount: SLL ${formatCurrency(loanAmount)}
• Duration: ${loanPeriod} months
• Monthly Payment: SLL ${formatCurrency(monthlyPayment)}
• Processing Fee: SLL ${formatCurrency(processingFee)}
• Total Amount: SLL ${formatCurrency(totalAmount)}

📅 Submitted: ${new Date().toLocaleString()}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
      
      const result = await response.json();
      console.log('Telegram notification sent:', result);
      return result.ok;
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Send to Telegram
    await sendTelegramNotification(formData);
    
    setIsSubmitting(false);
    setShowApplyModal(false);
    setShowSuccessModal(true);
    // Reset form
    setFormData({ fullName: '', phone: '', email: '', address: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="calculator" className="mtc-section bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mtc-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Calculate Your Loan
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Get instant estimates with our transparent calculator
          </p>
          <div className="w-24 h-1 bg-[#2d21e9] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-10 items-start">
          {/* Video Section - Left */}
          <div className="w-full xl:col-span-3">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-auto max-h-[500px]"
                style={{ minHeight: '400px' }}
                controls
                playsInline
              >
                <source src="/20260317_0520_New Video_simple_compose_01kkwsg8hbe3y8qy0p9qyt23x2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-[#1674BB] rounded-full"></span>
                How It Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#1674BB] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Choose Your Amount</h4>
                    <p className="text-sm text-gray-600">Select between NAD 5,000 - 100,000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#1674BB] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Select Duration</h4>
                    <p className="text-sm text-gray-600">Choose repayment period from 3-24 months</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#1674BB] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Apply & Get Approved</h4>
                    <p className="text-sm text-gray-600">Instant approval within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="mt-6 bg-gradient-to-r from-[#2d21e9]/10 to-[#1affd5]/10 rounded-2xl p-6 shadow-lg border border-[#2d21e9]/20">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-[#1674BB] rounded-full"></span>
                Why Choose PAYTODAY Loans?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1674BB] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Quick Disbursement</h4>
                    <p className="text-xs text-gray-600">Same day approval</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1674BB] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Competitive Rates</h4>
                    <p className="text-xs text-gray-600">2.5% monthly interest</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1674BB] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Flexible Terms</h4>
                    <p className="text-xs text-gray-600">3-24 month options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1674BB] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Secure Process</h4>
                    <p className="text-xs text-gray-600">Bank-level encryption</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1674BB] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">No Hidden Fees</h4>
                    <p className="text-xs text-gray-600">Transparent pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1674BB] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">24/7 Support</h4>
                    <p className="text-xs text-gray-600">Always here to help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator - Right */}
          <div className="max-w-xl mx-auto lg:mx-0 w-full xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Loan Amount */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                Loan Amount
              </label>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-[#2d21e9] to-[#920fd4] text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg">
                  NAD {formatCurrency(loanAmount)}
                </div>
              </div>

              <Slider
                value={[loanAmount]}
                onValueChange={handleSliderChange}
                min={5000}
                max={100000}
                step={500}
                className="mb-4"
              />

              <div className="flex justify-between text-sm text-gray-500 mb-6 font-medium">
                <span>NAD 5,000</span>
                <span>NAD 100,000</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {amountPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleAmountPreset(preset)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      loanAmount === preset
                        ? 'bg-[#2d21e9] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    NAD {formatCurrency(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Period */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                Loan Period
              </label>
              
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-gray-100 border-2 border-[#2d21e9] rounded-xl px-5 py-3 text-center min-w-[100px]">
                  <span className="text-2xl font-bold text-gray-800">{loanPeriod}</span>
                </div>
                <span className="text-gray-500 font-medium">months</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {periodOptions.map((period) => (
                  <button
                    key={period}
                    onClick={() => setLoanPeriod(period)}
                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      loanPeriod === period
                        ? 'bg-[#2d21e9] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {period} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4 mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Loan Terms</p>
                  <p className="text-lg font-bold text-gray-800">{loanPeriod} Months</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 font-semibold uppercase">Processing Fee</p>
                  <p className="text-lg font-bold text-gray-800">NAD {formatCurrency(processingFee)}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#2d21e9] to-[#920fd4] rounded-2xl p-6 text-center shadow-lg">
                <p className="text-white/80 mb-1 font-semibold uppercase tracking-wide text-sm">Total Amount</p>
                <p className="text-3xl font-bold text-white">NAD {formatCurrency(totalAmount)}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">MONTHLY PAYMENT</p>
                <p className="text-3xl font-bold text-gray-800">NAD {formatCurrency(monthlyPayment)}</p>
              </div>

              <button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-[#2d21e9] to-[#920fd4] text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-[#1a1ad9] hover:to-[#7a0bb5] transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#2d21e9] text-xl">Apply for Loan</DialogTitle>
            <DialogDescription>
              Fill in your details to apply for NAD {formatCurrency(loanAmount)} loan
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#1674BB]" />
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1674BB]" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+232 XX XXX XXXX"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1674BB]" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1674BB]" />
                Address
              </Label>
              <Input
                id="address"
                placeholder="Your address in Namibia"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>
            <div className="bg-[#FFEEEE] rounded-lg p-3 mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Loan Amount:</span> NAD {formatCurrency(loanAmount)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Monthly Payment:</span> NAD {formatCurrency(monthlyPayment)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Duration:</span> {loanPeriod} months
              </p>
            </div>
            <button 
              type="submit" 
              className="w-full paytoday-btn-primary flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Send className="w-4 h-4 animate-pulse" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">
              Application Submitted!
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Thank you for your application. Our team will review your request and contact you within 24-48 hours.
            </DialogDescription>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 paytoday-btn-primary"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LoanCalculator;
