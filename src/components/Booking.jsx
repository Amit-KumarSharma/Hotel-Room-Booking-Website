import React from 'react';
import { motion } from 'framer-motion';
import './Booking.css';

const Booking = () => {
  return (
    <section className="booking-section">
      <div className="container">
        <motion.div 
          className="booking-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="booking-content">
            <h2 className="section-title">Reserve Your Stay</h2>
            <p className="booking-subtitle">Step into a world of unparalleled luxury and refined elegance.</p>
          </div>
          <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Check In</label>
              <input type="date" className="luxury-input" />
            </div>
            <div className="form-group">
              <label>Check Out</label>
              <input type="date" className="luxury-input" />
            </div>
            <div className="form-group">
              <label>Guests</label>
              <select className="luxury-input">
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>3 Adults</option>
                <option>4 Adults</option>
              </select>
            </div>
            <button className="submit-btn" type="submit">Check Availability</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
