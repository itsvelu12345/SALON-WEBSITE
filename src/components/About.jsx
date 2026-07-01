import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

// Custom high-performance count-up component triggering on viewport enter
function CountUp({ to, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const run = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing out quadratic function
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * to));

      if (progress < 1) {
        requestAnimationFrame(run);
      }
    };

    requestAnimationFrame(run);
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const containerRef = useRef(null);

  // Animations variants
  const imageReveal = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const textReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 bg-luxury-surface overflow-hidden flex items-center"
      aria-label="About Royal Trendz Salon"
    >
      {/* Decorative luxury backdrop gradient */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-luxury-accent/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Asymmetric floating editorial image */}
          <motion.div
            className="lg:col-span-6 relative flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageReveal}
          >
            {/* Background border block to give editorial layout */}
            <div className="absolute inset-0 border border-luxury-gold/20 translate-x-4 translate-y-4 pointer-events-none w-[90%] mx-auto h-full" />

            <div className="relative overflow-hidden aspect-[4/5] w-[90%] shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              {/* Overlay shading to grade visual aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury Hair Styling"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Refined brand storytelling content */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textReveal}
          >
            <SectionHeading
              eyebrow="About Us"
              title="Welcome to Royal Trendz"
              className="!mb-6"
            />

            <div className="space-y-6 text-luxury-muted font-sans font-light leading-relaxed text-sm md:text-base">
              <p>
                At Royal Trendz, we believe that great grooming is about more than just a haircut.
                It's about confidence, style, and helping every customer look and feel their best.
              </p>
              <p>
                Located in Erode, we offer a complete range of professional grooming services
                including precision haircuts, modern styling, hair colouring, hair spa treatments,
                skincare, facials, and premium shaving services. Whether you're preparing for a
                special occasion or simply maintaining your everyday look, our experienced team is
                committed to delivering quality service with attention to every detail.
              </p>
              <p>
                We combine skilled craftsmanship, quality products, and a clean, comfortable
                environment to ensure every visit is relaxing and satisfying. Every customer receives
                personalized recommendations based on their hair type, face shape, and personal style.
              </p>
              <p>
                At Royal Trendz, our goal is simple: to provide premium grooming experiences at
                affordable prices while building lasting relationships with our customers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
