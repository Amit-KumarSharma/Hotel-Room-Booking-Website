import React from 'react';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import Amenities from './components/Amenities';
import Experience from './components/Experience';
import Booking from './components/Booking';
import Footer from './components/Footer';

function App() {
  return (
    <main className="app-container">
      <Hero />
      <Rooms />
      <Amenities />
      <Experience />
      <Booking />
      <Footer />
    </main>
  );
}

export default App;
