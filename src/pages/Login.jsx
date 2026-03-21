import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signup } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      if (isLogin) {
        if (login(email, password)) {
          navigate(email === 'admin@hotel.com' ? '/admin' : '/user');
        } else {
          setError('Invalid credentials. Use admin@hotel.com/admin or any email/password.');
        }
      } else {
        if (email && password.length >= 6 && fullName) {
          signup(fullName, email, password);
          navigate('/user');
        } else {
          setError('Please fill in all fields (password min 6 chars).');
        }
      }
    }, 500);
  };

  return (
    <div className="login-page">
      <div className="login-bg-overlay"></div>
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="login-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>Sign in to manage your reservations and experience ultimate luxury.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="Enter your full name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="luxury-input"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="luxury-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="luxury-input"
            />
          </div>
          
          <button type="submit" className="submit-btn full-width">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
              {isLogin ? 'Register now' : 'Sign In'}
            </span>
          </p>
          
          <div className="demo-credentials">
            <p><strong>Demo Admin:</strong> admin@hotel.com / admin</p>
            <p><strong>Demo User:</strong> any email / password</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
