import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Menu, X, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          THE BELVEDERE
        </Link>
        
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
        </div>
        
        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          {user ? (
            <>
              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-links" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                </li>
              )}
              {user.role === 'user' && (
                <li className="nav-item">
                  <Link to="/user" className="nav-links" onClick={() => setMenuOpen(false)}>My Bookings</Link>
                </li>
              )}
              <li className="nav-item nav-user">
                <span className="user-greeting">Hi, {user.email.split('@')[0]}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links auth-link" onClick={() => setMenuOpen(false)}>
                <User size={18} style={{ marginRight: '5px' }} />
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
