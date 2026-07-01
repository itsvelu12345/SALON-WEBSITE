import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";

const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920";

export default function BookingCTA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax scroll on the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="booking-cta"
      ref={containerRef}
      className="relative min-h-[450px] md:min-h-[550px] flex items-center justify-center overflow-hidden bg-black select-none"
      aria-label="Book your appointment today"
    >
      {/* Parallax Background Photo */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-luxury-bg/75 to-luxury-bg z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,15,10,0.45)_0%,rgba(10,10,10,0.85)_100%)] z-10" />
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="Royal Trendz Salon Luxury Interior"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Geometric Overlay Border Frame */}
      <div className="absolute inset-y-12 inset-x-6 md:inset-x-12 border border-luxury-gold/15 pointer-events-none z-20 flex items-center justify-center">
        <div className="w-[calc(100%-8px)] h-[calc(100%-8px)] border border-luxury-gold/5" />
      </div>

      {/* Contents */}
      <div className="relative z-30 max-w-4xl px-8 py-16 text-center flex flex-col items-center justify-center">
        {/* Eyebrow */}
        <motion.span
          className="text-luxury-gold text-xs sm:text-sm font-sans tracking-luxury uppercase font-semibold mb-4 block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Exclusive Availability
        </motion.span>

        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-luxury-ivory leading-tight font-serif mb-6 uppercase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Reserve Your <br className="sm:hidden" />
          <span className="italic text-luxury-gold font-normal">Royal Experience</span>
        </motion.h2>

        {/* Small descriptive text */}
        <motion.p
          className="text-xs sm:text-sm md:text-base font-light text-luxury-ivory/80 max-w-lg mb-10 font-sans leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Due to our curated individual pacing, salon bookings fill rapidly.
          Secure your styling session or cosmetic ritual with our artists today.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            variant="primary"
            className="!py-4.5 !px-12 sm:!text-[13px] shadow-[0_12px_40px_rgba(201,162,75,0.3)] hover:scale-105"
            onClick={scrollToContact}
          >
            Request Appointment
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
