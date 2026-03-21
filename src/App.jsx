import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import RoomsPage from './pages/RoomsPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
