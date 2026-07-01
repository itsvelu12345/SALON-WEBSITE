import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";

// The path to the video file, as organized in the public/video folder
const HERO_VIDEO_PATH = "/video/Premium_website_hero_animation_202607011826.mp4";

// Elegant Unsplash editorial fallback image in case the video cannot load
const FALLBACK_POSTER_URL =
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1920";

export default function Hero() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const { scrollY } = useScroll();

  // Scroll parallax effects for text and video
  const textY = useTransform(scrollY, [0, 500], [0, 150]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const videoScale = useTransform(scrollY, [0, 800], [1, 1.1]);

  useEffect(() => {
    // Aggressive fallback to ensure muted video plays on all browsers/iOS
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      // Attempt playing immediately
      video.play().catch((err) => {
        console.warn("Autoplay was blocked or video failed, trying again.", err);
        // Retry play on user interaction fallback is handled by browser,
        // but we keep muted as true.
        video.muted = true;
      });
    }
  }, []);

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setIsVideoError(true);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-luxury-bg flex items-center justify-center"
      aria-label="Welcome to Royal Trendz Salon"
    >
      {/* Cinematic Fullscreen Background Video & Fallback Poster */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ scale: videoScale }}
      >
        {!isVideoError && (
          <video
            ref={videoRef}
            src={HERO_VIDEO_PATH}
            type="video/mp4"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={handleVideoCanPlay}
            onError={handleVideoError}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Fallback Static Frame if Video is blocked / fails */}
        {(isVideoError || !videoLoaded) && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-100"
            style={{ backgroundImage: `url(${FALLBACK_POSTER_URL})` }}
          />
        )}

        {/* Cinematic Scrim & Gradients: radial dark glow and solid base shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-black/40 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(10,10,10,0.7)_100%)] z-10" />
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        className="relative z-20 max-w-[1200px] px-6 text-center flex flex-col items-center justify-center select-none"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Eyebrow Label */}
        <motion.span
          className="text-luxury-gold text-xs sm:text-sm font-sans tracking-luxury uppercase font-semibold mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Haute Couture Hair & Beauty
        </motion.span>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-luxury-ivory leading-tight font-serif mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Where Beauty <br />
          <span className="italic text-luxury-gold font-normal">Becomes Art</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-base md:text-lg font-light text-luxury-ivory/80 tracking-wide max-w-xl mb-10 md:mb-12 font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Step into a sanctuary of curated elegance. Experience world-class styling,
          bespoke aesthetics, and royalty-tier salon care.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            variant="primary"
            className="w-full sm:w-auto"
            onClick={() => scrollToSection("booking-cta")}
          >
            Book Appointment
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => scrollToSection("services")}
          >
            Explore Services
          </Button>
        </motion.div>
      </motion.div>

      {/* Minimal Scroll Cue Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-luxury-ivory/40">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-luxury-ivory/20 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-luxury-gold"
            animate={{
              y: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
