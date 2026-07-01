import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import GlassPanel from "./ui/GlassPanel";

const TESTIMONIALS = [
  {
    quote: "Good place with good people's try once",
    author: "Laxman singh",
    role: "Local Guide • 50 reviews • 41 photos",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    rating: 5,
  },
  {
    quote: "best haircut at low price",
    author: "Afra Fizel",
    role: "1 review",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    rating: 5,
  },
  {
    quote: "Good service 👍",
    author: "Mansoor Ali",
    role: "Local Guide • 15 reviews • 92 photos",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        setDirection(1);
        setActiveIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
      }
    }, 6000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [isPaused, activeIdx]);

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  // Slide transition animation config
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-36 bg-luxury-bg overflow-hidden flex items-center min-h-[600px]"
      aria-label="Client Testimonials"
    >
      {/* Decorative luxury gradient bubbles */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-luxury-accent/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 w-full relative z-10">
        <SectionHeading
          eyebrow="The Reviews"
          title="Royal Voices of Satisfaction"
          align="center"
        />

        {/* Carousel Slider */}
        <div
          className="relative w-full mt-12 md:mt-16 min-h-[320px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <GlassPanel className="p-8 md:p-14 flex flex-col items-center text-center border-white/5 relative bg-white/[0.015]">
                {/* Large decorative quotation mark */}
                <Quote className="text-luxury-gold/10 w-16 h-16 absolute top-8 left-8 stroke-[1]" />

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6 text-luxury-gold">
                  {[...Array(TESTIMONIALS[activeIdx].rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-luxury-gold stroke-none" />
                  ))}
                </div>

                {/* Quote copy */}
                <blockquote className="text-lg md:text-2xl font-light text-luxury-ivory font-serif leading-relaxed mb-8 max-w-2xl italic">
                  "{TESTIMONIALS[activeIdx].quote}"
                </blockquote>

                {/* Author Info */}
                <div className="text-center leading-tight">
                  <span className="font-serif text-base text-luxury-ivory block">
                    {TESTIMONIALS[activeIdx].author}
                  </span>
                  <span className="font-sans text-[10px] tracking-widest text-luxury-gold uppercase font-semibold">
                    {TESTIMONIALS[activeIdx].role}
                  </span>
                </div>
              </GlassPanel>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-16 p-2 hover:text-luxury-gold text-luxury-ivory/60 transition-colors focus:outline-none bg-black/20 md:bg-transparent border border-white/5 md:border-none rounded-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-16 p-2 hover:text-luxury-gold text-luxury-ivory/60 transition-colors focus:outline-none bg-black/20 md:bg-transparent border border-white/5 md:border-none rounded-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIdx ? 1 : -1);
                setActiveIdx(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIdx ? "bg-luxury-gold w-6" : "bg-white/10"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
