import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Zoom in background on scroll
      gsap.to('.experience-bg img', {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Reveal text masks
      gsap.to('.mask-text', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        stagger: 0.2,
        ease: "power3.out",
        duration: 2,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="experience-section">
      <div className="experience-bg">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" alt="The Grand Belvedere Experience" />
        <div className="experience-overlay"></div>
      </div>
      
      <div className="experience-content" ref={textRef}>
        <div className="mask-wrapper">
          <h2 className="mask-text">A Symphony of</h2>
        </div>
        <div className="mask-wrapper">
          <h2 className="mask-text gold-text">Elegance and</h2>
        </div>
        <div className="mask-wrapper">
          <h2 className="mask-text">Tranquility.</h2>
        </div>
        
        <motion.p
          className="experience-subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 1 }}
        >
          Curated for the extraordinary
        </motion.p>
      </div>
    </section>
  );
};

export default Experience;
