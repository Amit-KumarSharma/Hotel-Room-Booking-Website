import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useDbStore } from '../store/useDbStore';
import { FileEdit, Trash2, Plus } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const { rooms, bookings, addRoom, deleteRoom } = useDbStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        
        <div className="dashboard-grid">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Manage Rooms</h2>
              <button className="icon-btn" onClick={() => alert('Add Room flow opens here')}>
                <Plus size={20} /> Add Room
              </button>
            </div>
            
            <div className="table-wrapper">
              <table className="luxury-table">
                <thead>
                  <tr>
                    <th>Room Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(room => (
                    <tr key={room.id}>
                      <td>{room.title}</td>
                      <td>₹{room.price}/night</td>
                      <td>
                        <span className={`status-badge ${room.status}`}>
                          {room.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="action-icon"><FileEdit size={16}/></button>
                        <button className="action-icon delete" onClick={() => deleteRoom(room.id)}>
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent Bookings</h2>
            </div>
            
            <div className="table-wrapper">
              <table className="luxury-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User</th>
                    <th>Room ID</th>
                    <th>Dates</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr><td colSpan="5" className="empty-state">No bookings yet.</td></tr>
                  ) : (
                    bookings.map(b => (
                      <tr key={b.id}>
                        <td>#{b.id.substring(0,6)}</td>
                        <td>{b.userId}</td>
                        <td>{b.roomId}</td>
                        <td>{b.checkIn} to {b.checkOut}</td>
                        <td>
                          <span className={`status-badge ${b.status}`}>{b.status}</span>
                        </td>
                      </tr>
                    ))
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

export default AdminDashboard;
