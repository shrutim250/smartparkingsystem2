import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const [formType, setFormType] = useState(null); // Tracks whether 'login' or 'signup' modal is open
  const [userName, setUserName] = useState(null); // Tracks logged-in user's name

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  // Opens the modal with the selected form type
  const handleLoginSignup = (type) => {
    setFormType(type);
  };

  // Handles form submission for login or signup
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const endpoint = formType === 'login' ? '/api/login' : '/api/signup';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`${formType === 'login' ? 'Login' : 'Signup'} successful!`);
        setUserName(data.name); // Set the logged-in user's name
        localStorage.setItem('userName', data.name); // Persist user name in localStorage
        setFormType(null); // Close the modal
      } else {
        alert(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="homepage-container">
      <div className="hero-content">
        <h1>Smart Parking System</h1>
        <p>Find available parking slots quickly and easily.</p>

        <div className="links">
          <Link to="/" className="link">Home</Link>
          <Link to="/slots" className="link">Slot Booking</Link>
          <Link to="/payment" className="link">Payment</Link>
          <Link to="/feedback" className="link">Feedback</Link>
        </div>
      </div>

      {/* Show "Welcome, [Name]" or Login/Signup Buttons */}
      <div className="auth-buttons">
        {userName ? (
          <p className="welcome-message">Welcome, {userName}!</p>
        ) : (
          <>
            <button onClick={() => handleLoginSignup('login')} className="auth-button">Login</button>
            <button onClick={() => handleLoginSignup('signup')} className="auth-button">Signup</button>
          </>
        )}
      </div>

      {/* Modal for Login/Signup */}
      {formType && (
        <div className="auth-modal">
          <div className="auth-modal-content">
            <h2>{formType === 'login' ? 'Login' : 'Signup'}</h2>
            <form onSubmit={handleFormSubmit}>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">{formType === 'login' ? 'Login' : 'Signup'}</button>
            </form>
            <button onClick={() => setFormType(null)} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
