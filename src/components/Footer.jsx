import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2 className="footer-logo">The Grand Belvedere</h2>
          <p>Where luxury meets eternity.</p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><a href="#">Rooms & Suites</a></li>
            <li><a href="#">Dining</a></li>
            <li><a href="#">Spa & Wellness</a></li>
            <li><a href="#">Experiences</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>123 Luxury Avenue, Riviera</p>
          <p>+1 (800) 123-4567</p>
          <p>reservations@grandbelvedere.com</p>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} The Grand Belvedere. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
