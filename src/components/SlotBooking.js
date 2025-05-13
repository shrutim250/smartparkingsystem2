import React, { useState, useEffect, useRef } from 'react';
import './SlotBooking.css';

const SlotBooking = () => {
  const [slotNo, setSlotNo] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 12,
      });
      mapInstanceRef.current = map;

      const input = searchBoxRef.current;
      const searchBox = new window.google.maps.places.SearchBox(input);

      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const bounds = new window.google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) return;

          // Center map on the selected place
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });

        map.fitBounds(bounds);
      });
    };

    if (!window.google) {
      console.error('Google Maps JavaScript API is not loaded');
    } else {
      initMap();
    }
  }, []);

  const checkSlotAvailability = (slotNo, startTime, endTime) => {
    return slots.some(
      (slot) =>
        slot.slotNo === slotNo &&
        ((startTime >= slot.startTime && startTime < slot.endTime) ||
          (endTime > slot.startTime && endTime <= slot.endTime))
    );
  };

  const handleSlotSubmit = (e) => {
    e.preventDefault();
    const slotExists = checkSlotAvailability(slotNo, startTime, endTime);

    if (slotExists) {
      setMessage('Slot filled! Please choose another slot.');
      setShowPopup(true);
      return;
    }

    const totalMinutes = (new Date(endTime) - new Date(startTime)) / 60000;
    const totalAmount = totalMinutes * 50;
    setPaymentAmount(totalAmount);
    setSlots([...slots, { slotNo, startTime, endTime }]);

    setSlotNo('');
    setStartTime('');
    setEndTime('');
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div className="slot-container">
      {/* Search Bar */}
      <input
        ref={searchBoxRef}
        type="text"
        placeholder="Search for a location"
        className="search-box"
      />

      {/* Google Map */}
      <div id="map" ref={mapRef}></div>

      {/* Slot Form */}
      <form onSubmit={handleSlotSubmit} className="slot-form">
        <label htmlFor="slotNo">Slot Number:</label>
        <input
          type="text"
          id="slotNo"
          value={slotNo}
          onChange={(e) => setSlotNo(e.target.value)}
          required
        />

        <label htmlFor="startTime">Start Time:</label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <label htmlFor="endTime">End Time:</label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <button type="submit">Book Slot</button>
      </form>

      {/* Slot Table */}
      <table className="slot-table">
        <thead>
          <tr>
            <th>Slot No.</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr key={index}>
              <td>{slot.slotNo}</td>
              <td>{new Date(slot.startTime).toLocaleString()}</td>
              <td>{new Date(slot.endTime).toLocaleString()}</td>
              <td>
                ₹{((new Date(slot.endTime) - new Date(slot.startTime)) / 60000) * 50}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payment Popup */}
      {paymentAmount > 0 && !showPopup && (
        <div className="payment-container">
          <p>Total Payment: ₹{paymentAmount}</p>
          <button onClick={() => window.location.href = "https://payment.page/demo/"}>
  Proceed to Payment
</button>
        </div>
      )}

      {/* Slot Filled Popup */}
      <div className={`slot-popup ${showPopup ? 'active' : ''}`}>
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;
