import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDbStore } from '../store/useDbStore';
import { motion } from 'framer-motion';
import './RoomsPage.css';

const RoomsPage = () => {
  const { rooms } = useDbStore();
  const navigate = useNavigate();

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <h1>Accommodations</h1>
        <p>Experience unparalleled comfort in our meticulously designed rooms and suites.</p>
      </div>

      <div className="rooms-grid">
        {rooms.map((room, index) => (
          <motion.div 
            className="room-card" 
            key={room.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="room-image">
              <img src={room.image} alt={room.title} />
              <div className={`room-status ${room.status}`}>
                {room.status === 'available' ? 'Available' : 'Booked'}
              </div>
            </div>
            <div className="room-info">
              <h3>{room.title}</h3>
              <p className="room-desc">{room.description}</p>
              <div className="room-bottom">
                <span className="room-price">${room.price} <small>/ night</small></span>
                <button 
                  className="book-btn"
                  disabled={room.status !== 'available'}
                  onClick={() => navigate(`/book/${room.id}`)}
                >
                  {room.status === 'available' ? 'Book Now' : 'Unavailable'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
