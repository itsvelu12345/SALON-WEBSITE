import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800",
    title: "Signature Golden Balayage",
    category: "Coloring",
    aspect: "aspect-[3/4]",
  },
  {
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
    title: "Editorial Hair Architecture",
    category: "Styling",
    aspect: "aspect-[4/3]",
  },
  {
    url: "https://images.unsplash.com/photo-1605497746444-ac9dbd39f4a5?auto=format&fit=crop&q=80&w=800",
    title: "Sculpted Avant-Garde Cut",
    category: "Styling",
    aspect: "aspect-[3/4]",
  },
  {
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    title: "Royal Trendz Salon Lounge Sanctuary",
    category: "Spa",
    aspect: "aspect-[16/9]",
  },
  {
    url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800",
    title: "Precision Facial Rejuvenation",
    category: "Skincare",
    aspect: "aspect-[4/5]",
  },
  {
    url: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=800",
    title: "Dewy Skin Restoration",
    category: "Skincare",
    aspect: "aspect-[3/4]",
  },
  {
    url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800",
    title: "Gel Nail Sculpting",
    category: "Nail Art",
    aspect: "aspect-[4/3]",
  },
  {
    url: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&q=80&w=800",
    title: "High-Fashion Platinum Tone",
    category: "Coloring",
    aspect: "aspect-[3/4]",
  },
];

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Close Lightbox on Esc, and Navigate on Left/Right Arrows
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-36 bg-luxury-surface"
      aria-label="Work Gallery"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="The Portfolio"
          title="Visions of Royal Beauty"
          description="A curated lookbook of our signature styling, precision coloration, and editorial transformations."
          align="left"
        />

        {/* Masonry Columns Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 [column-fill:_balance] mt-12 md:mt-20">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              className={`break-inside-avoid relative overflow-hidden group select-none cursor-none gallery-interactive shadow-lg ${img.aspect} mb-6`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedIdx(idx)}
            >
              {/* Image zoom on hover */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Tint Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <span className="text-[10px] font-sans text-luxury-gold tracking-widest uppercase font-semibold mb-1">
                  {img.category}
                </span>
                <h4 className="text-lg md:text-xl font-light text-luxury-ivory font-serif translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {img.title}
                </h4>
              </div>

              {/* Subtle top light bar */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accessible Glass Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-luxury-bg/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
          >
            {/* Lightbox container */}
            <div
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Upper Control Bar */}
              <div className="absolute top-2 w-full flex justify-between items-center z-10 px-4 text-luxury-ivory/60 text-xs font-sans tracking-widest">
                <span>
                  {GALLERY_IMAGES[selectedIdx].category} — {selectedIdx + 1} of{" "}
                  {GALLERY_IMAGES.length}
                </span>

                <button
                  onClick={() => setSelectedIdx(null)}
                  className="p-2 hover:text-luxury-gold transition-colors focus:outline-none"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Display Image */}
              <div className="relative max-h-[75vh] max-w-[85vw] flex items-center justify-center overflow-hidden">
                <motion.img
                  key={selectedIdx}
                  src={GALLERY_IMAGES[selectedIdx].url}
                  alt={GALLERY_IMAGES[selectedIdx].title}
                  className="max-h-[75vh] max-w-full object-contain shadow-2xl border border-white/5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Lower Info Area */}
              <div className="mt-6 text-center max-w-xl">
                <h4 className="text-xl md:text-2xl font-light text-luxury-ivory font-serif">
                  {GALLERY_IMAGES[selectedIdx].title}
                </h4>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-0 p-3 hover:text-luxury-gold text-luxury-ivory/70 transition-colors focus:outline-none bg-black/20 hover:bg-black/40 border border-white/5 rounded-none"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 p-3 hover:text-luxury-gold text-luxury-ivory/70 transition-colors focus:outline-none bg-black/20 hover:bg-black/40 border border-white/5 rounded-none"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
