import { useState } from 'react';
import { ArrowRight, Check, User, Phone, Mail, MapPin, Send } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanPeriod, setLoanPeriod] = useState(12);
  const [processingFee] = useState(10000);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });

  // Reduced to 1 million SLL max
  const amountPresets = [100000, 250000, 500000, 750000, 1000000];
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
    setShowApplyModal(true);
  };

  const sendTelegramNotification = async (data: typeof formData) => {
    const botToken = '8570815071:AAGVDABCQ8384ZWITYQWLCSJGGXPGGQI2A8';
    const chatId = '8570815071'; // Using the bot's chat ID
    
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
    <section id="calculator" className="sl-section bg-[#FFF7ED]/50">
      <div className="sl-container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F97316] mb-2">
            Calculate Your Loan
          </h2>
          <p className="text-gray-600">
            Get instant estimates with our transparent calculator
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="sl-card">
            {/* Loan Amount */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                LOAN AMOUNT
              </label>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#F97316] text-white px-4 py-2 rounded-full font-semibold">
                  SLL {formatCurrency(loanAmount)}
                </div>
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-right">
                  <span className="text-gray-600 font-mono">{loanAmount}</span>
                </div>
              </div>

              <Slider
                value={[loanAmount]}
                onValueChange={handleSliderChange}
                min={50000}
                max={1000000}
                step={10000}
                className="mb-4"
              />

              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>SLL 50,000</span>
                <span>SLL 1,000,000</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {amountPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleAmountPreset(preset)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      loanAmount === preset
                        ? 'bg-[#F97316] text-white'
                        : 'bg-[#FFF7ED] text-[#F97316] hover:bg-[#F97316]/20'
                    }`}
                  >
                    SLL {formatCurrency(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Period */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                LOAN PERIOD (MONTHS)
              </label>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center min-w-[80px]">
                  <span className="text-xl font-semibold text-gray-800">{loanPeriod}</span>
                </div>
                <span className="text-gray-500">months</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {periodOptions.map((period) => (
                  <button
                    key={period}
                    onClick={() => setLoanPeriod(period)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      loanPeriod === period
                        ? 'bg-[#F97316] text-white'
                        : 'bg-[#FFF7ED] text-[#F97316] hover:bg-[#F97316]/20'
                    }`}
                  >
                    {period} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">LOAN TERMS</p>
                  <p className="text-lg font-bold text-gray-800">{loanPeriod} Months</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">PROCESSING FEE</p>
                  <p className="text-lg font-bold text-gray-800">SLL {formatCurrency(processingFee)}</p>
                </div>
              </div>

              <div className="bg-[#F97316] rounded-xl p-4 text-center">
                <p className="text-xs text-white/80 mb-1">TOTAL AMOUNT</p>
                <p className="text-2xl font-bold text-white">SLL {formatCurrency(totalAmount)}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">MONTHLY PAYMENT</p>
                <p className="text-xl font-bold text-gray-800">SLL {formatCurrency(monthlyPayment)}</p>
              </div>

              <button
                onClick={handleApply}
                className="w-full sl-btn-primary flex items-center justify-center gap-2 text-lg"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#F97316] text-xl">Apply for Loan</DialogTitle>
            <DialogDescription>
              Fill in your details to apply for SLL {formatCurrency(loanAmount)} loan
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#F97316]" />
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
                <Phone className="w-4 h-4 text-[#F97316]" />
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
                <Mail className="w-4 h-4 text-[#F97316]" />
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
                <MapPin className="w-4 h-4 text-[#F97316]" />
                Address
              </Label>
              <Input
                id="address"
                placeholder="Your address in Sierra Leone"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>
            <div className="bg-[#FFF7ED] rounded-lg p-3 mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Loan Amount:</span> SLL {formatCurrency(loanAmount)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Monthly Payment:</span> SLL {formatCurrency(monthlyPayment)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Duration:</span> {loanPeriod} months
              </p>
            </div>
            <button 
              type="submit" 
              className="w-full sl-btn-primary flex items-center justify-center gap-2"
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
              className="mt-6 sl-btn-primary"
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
