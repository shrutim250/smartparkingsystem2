import React, { useState } from 'react';
import './Payment.css';  // Ensure this CSS file is present for styling

const Payment = () => {
  const [minutes, setMinutes] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');

  // Function to calculate payment based on minutes
  const calculatePayment = (min) => {
    const halfHourRate = 50; // 50 rupees per half hour
    const roundedMinutes = Math.ceil(min / 30) * 30; // Round up to nearest 30-minute interval
    const payment = (roundedMinutes / 30) * halfHourRate;
    setTotalAmount(payment); // Set the total amount
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (minutes <= 0) {
      setPaymentMessage('Please enter a valid number of minutes.');
    } else {
      calculatePayment(minutes); // Calculate payment after the submit
      setPaymentMessage(`Your total payment is ₹${totalAmount}. Click below to proceed with payment.`); // Ensure this is set after calculation
    }
  };

  // Ensure that the message is updated correctly with the calculated amount
  React.useEffect(() => {
    if (totalAmount > 0) {
      setPaymentMessage(`Your total payment is ₹${totalAmount}. Click below to proceed with payment.`);
    }
  }, [totalAmount]);

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Payment for Parking</h2>
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <label htmlFor="minutes">Enter Parking Duration (minutes):</label>
          <input
            type="number"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            required
            min="1"
            className="payment-input"
          />
          <button type="submit" className="payment-button">Calculate and Pay</button>
        </form>
        {paymentMessage && <p className="payment-message">{paymentMessage}</p>}
        {totalAmount > 0 && (
          <a href="https://payment.page/demo/" className="payment-link" target="_blank" rel="noopener noreferrer">
            Proceed to Payment
          </a>
        )}
      </div>
    </div>
  );
};

export default Payment;
