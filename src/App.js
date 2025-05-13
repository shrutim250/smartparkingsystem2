import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import SlotBooking from './components/SlotBooking';
import Payment from './components/Payment';
import Feedback from './components/Feedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/slots" element={<SlotBooking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;
