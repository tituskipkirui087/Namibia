import Header from './sections/Header';
import Hero from './sections/Hero';
import LoanCalculator from './sections/LoanCalculator';
import WhyChooseUs from './sections/WhyChooseUs';
import OurServices from './sections/OurServices';
import HappyCustomers from './sections/HappyCustomers';
import Footer from './sections/Footer';
import ChatBot from './sections/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <LoanCalculator />
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
