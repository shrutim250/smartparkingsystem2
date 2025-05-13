import React, { useState } from 'react';
import './Feedback.css'; 
const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission (e.g., sending it to the backend)
    console.log('Feedback submitted:', feedback);
    
    // Redirect to the image link after feedback submission
    window.location.href = "https://i.pinimg.com/736x/cd/ed/98/cded98e328d557450215b5ba836e23da.jpg";
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      <form onSubmit={handleFeedbackSubmit}>
        <textarea
          id="feedback"
          rows="4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button type="submit" className="feedback-button">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
