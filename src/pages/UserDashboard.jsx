import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useDbStore } from '../store/useDbStore';
import { CalendarX2 } from 'lucide-react';
import '../pages/AdminDashboard.css'; // Reusing some CSS

const UserDashboard = () => {
  const { user } = useAuthStore();
  const { bookings, rooms, cancelBooking } = useDbStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const userBookings = bookings.filter(b => b.userId === user.uid);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">My Reservations</h1>
        
        <div className="dashboard-grid">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Upcoming Stays</h2>
              <button 
                className="icon-btn" 
                onClick={() => navigate('/rooms')}
                style={{ background: 'transparent', border: '1px solid #cda873', color: '#cda873' }}
              >
                Book a Room
              </button>
            </div>
            
            <div className="table-wrapper">
              <table className="luxury-table">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Dates</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userBookings.length === 0 ? (
                    <tr><td colSpan="5" className="empty-state">You have no upcoming reservations.</td></tr>
                  ) : (
                    userBookings.map(b => {
                      const room = rooms.find(r => r.id === b.roomId);
                      return (
                        <tr key={b.id}>
                          <td>{room ? room.title : 'Unknown Room'}</td>
                          <td>{b.checkIn} to {b.checkOut}</td>
                          <td>{b.guests}</td>
                          <td>
                            <span className={`status-badge ${b.status}`}>{b.status}</span>
                          </td>
                          <td className="actions-cell">
                            {b.status === 'confirmed' && (
                              <button 
                                className="action-icon delete" 
                                title="Cancel Reservation"
                                onClick={() => {
                                  if(window.confirm('Are you sure you want to cancel this reservation?')) {
                                    cancelBooking(b.id);
                                  }
                                }}
                              >
                                <CalendarX2 size={18}/>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
