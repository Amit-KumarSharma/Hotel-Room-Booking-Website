import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './Amenities.css';

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { id: 'pool', title: 'Infinity Pool', description: 'Suspend belief at the edge of the world. Our heated infinity pools seamlessly blend with the horizon.', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop' },
  { id: 'spa', title: 'The Belvedere Spa', description: 'Rejuvenate your body and soul with ancient wellness traditions and modern therapies.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop' },
  { id: 'dining', title: 'Michelin Star Dining', description: 'Culinary excellence served daily. Our world-renowned chefs push the boundaries of flavor.', image: 'https://images.unsplash.com/photo-1505826759037-406b40feb4cd?q=80&w=2072&auto=format&fit=crop' },
];

const Amenities = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.amenity-item');
      
      sections.forEach((section) => {
        const image = section.querySelector('.amenity-image');
        
        gsap.to(image, {
          yPercent: 20, // Move image down as user scrolls past
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="amenities-section">
      <div className="container">
        <h2 className="section-title text-center">Indulge</h2>
        <div className="amenities-grid">
          {amenities.map((item, index) => (
            <div key={item.id} className={`amenity-item ${index % 2 !== 0 ? 'reversed' : ''}`}>
              <div className="amenity-image-wrapper">
                <img src={item.image} alt={item.title} className="amenity-image" />
              </div>
              <div className="amenity-content">
                <motion.h3 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {item.description}
                </motion.p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
