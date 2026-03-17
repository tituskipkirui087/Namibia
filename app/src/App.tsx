import { useState, useEffect } from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import LoanCalculator from './sections/LoanCalculator';
import WhyChooseUs from './sections/WhyChooseUs';
import OurServices from './sections/OurServices';
import HappyCustomers from './sections/HappyCustomers';
import Footer from './sections/Footer';
import ChatBot from './sections/ChatBot';
import Login from './sections/Login';
import HowItWorks from './sections/HowItWorks';
import FAQ from './sections/FAQ';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('showLogin');
    setIsLoggedIn(false);
    setShowLogin(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCalculatorApply = () => {
    // Store a flag to indicate user came from calculator
    localStorage.setItem('fromCalculator', 'true');
    setShowLogin(true);
  };

  const handleFAQClick = () => {
    setShowFAQ(true);
  };

  const handleCloseFAQ = () => {
    setShowFAQ(false);
  };

  if (showFAQ) {
    return (
      <div className="min-h-screen bg-[#0A0E14]">
        <button
          onClick={handleCloseFAQ}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-[#1674BB] text-white rounded-lg hover:bg-[#145a9e]"
        >
          Close FAQ
        </button>
        <FAQ />
      </div>
    );
  }

  if (showLogin) {
    return <Login onLoginSuccess={handleLoginSuccess} onClose={handleCloseLogin} />;
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0A0E14]">
        <Header onLogout={() => setIsLoggedIn(false)} onLoginClick={handleLoginClick} onFAQClick={handleFAQClick} />
        <div className="h-1 bg-gradient-to-r from-transparent via-[#1674BB] to-transparent opacity-50"></div>
        <main className="bg-[#0A0E14]">
          <Hero onLoginClick={handleLoginClick} />
          <LoanCalculator onApplyClick={handleCalculatorApply} />
          <WhyChooseUs />
          <OurServices />
          <HappyCustomers />
        </main>
        <Footer />
        <ChatBot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E14]">
      <Header onLoginClick={handleLoginClick} onFAQClick={handleFAQClick} />
      <div className="h-1 bg-gradient-to-r from-transparent via-[#1674BB] to-transparent opacity-50"></div>
      <main className="bg-[#0A0E14]">
        <Hero onLoginClick={handleLoginClick} />
        <HowItWorks />
        <LoanCalculator onApplyClick={handleCalculatorApply} />
        <WhyChooseUs />
        <OurServices />
        <HappyCustomers />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
