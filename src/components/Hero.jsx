import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const gateLeftRef = useRef(null);
  const gateRightRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(gateLeftRef.current, { xPercent: -100, ease: "power2.inOut" }, 0)
        .to(gateRightRef.current, { xPercent: 100, ease: "power2.inOut" }, 0)
        .to(bgRef.current, { scale: 1.2, filter: "brightness(0.7)", ease: "power2.inOut" }, 0)
        .to(titleRef.current, { opacity: 0, scale: 1.1, ease: "power2.inOut" }, 0)
        .to(scrollIndicatorRef.current, { opacity: 0, ease: "power2.inOut", duration: 0.2 }, 0);
        
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-fullscreen">
      <video 
        className="hero-bg" 
        ref={bgRef} 
        src={`${import.meta.env.BASE_URL}hero_video.mp4`} 
        autoPlay 
        muted 
        loop 
        playsInline
      />
      
      <div className="gate-container">
        <div className="gate gate-left" ref={gateLeftRef}>
          <div className="gate-inner left"></div>
        </div>
        <div className="gate gate-right" ref={gateRightRef}>
          <div className="gate-inner right"></div>
        </div>
      </div>

      <motion.div 
        ref={titleRef}
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      >
        <p className="subtitle">Welcome to</p>
        <h1 className="hero-title">The Grand<br/>Belvedere</h1>
      </motion.div>

      <motion.div 
        ref={scrollIndicatorRef}
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="scroll-text">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={36} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
