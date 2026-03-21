import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDbStore } from '../store/useDbStore';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import '../pages/Login.css';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, bookRoom } = useDbStore();
  const { user } = useAuthStore();
  
  const room = rooms.find(r => r.id === id);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!room) {
      navigate('/rooms');
    }
    if (!user) {
      // User must be logged in to book
      navigate('/login');
    }
  }, [room, user, navigate]);

  if (!room || !user) return null;

  const handleBooking = (e) => {
    e.preventDefault();
    if (new Date(checkIn) >= new Date(checkOut)) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    
    // Process booking
    bookRoom(room.id, user.uid, checkIn, checkOut, guests);
    navigate('/user');
  };

  return (
    <div className="login-page">
      <div className="login-bg-overlay"></div>
      <motion.div 
        className="login-container" style={{maxWidth: '600px'}}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h2>Complete Your Booking</h2>
          <p>You are booking the <strong>{room.title}</strong> for ₹{room.price}/night.</p>
        </div>
        
        <form onSubmit={handleBooking} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div className="form-group" style={{flex: 1}}>
              <label>Check In</label>
              <input 
                type="date" 
                required 
                className="luxury-input" 
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group" style={{flex: 1}}>
              <label>Check Out</label>
              <input 
                type="date" 
                required 
                className="luxury-input"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Guests</label>
            <select 
              className="luxury-input"
              value={guests}
              onChange={e => setGuests(e.target.value)}
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
          </div>
          
          <button type="submit" className="submit-btn full-width" style={{marginTop: '2rem'}}>
            Confirm Reservation
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingPage;
