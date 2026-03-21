import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Rooms.css';

gsap.registerPlugin(ScrollTrigger);

const roomsData = [
  { id: 1, name: 'The Belvedere Suite', price: '$1,200/night', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, name: 'Royal Penthouse', price: '$3,500/night', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, name: 'Ocean View Room', price: '$800/night', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop' },
  { id: 4, name: 'Classic Elegance', price: '$500/night', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop' },
];

const Rooms = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current.scrollWidth;
      
      gsap.to(scrollRef.current, {
        x: () => -(scrollWidth - window.innerWidth + 100), // +100 for some padding
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="rooms-section">
      <div className="rooms-header">
        <h2 className="section-title">Exclusive Stays</h2>
        <p className="section-subtitle">Discover our meticulously curated rooms blending modern luxury with timeless elegance.</p>
      </div>

      <div className="rooms-scroll-container">
        <div ref={scrollRef} className="rooms-scroll-wrapper">
          {roomsData.map((room) => (
            <div key={room.id} className="room-card">
              <div className="room-image-wrapper">
                <img src={room.image} alt={room.name} className="room-image" />
                <motion.div 
                  className="room-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button className="book-btn">
                    Reserve <ArrowRight size={16} />
                  </button>
                </motion.div>
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
