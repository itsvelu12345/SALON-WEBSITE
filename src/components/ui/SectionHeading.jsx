import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left", // left, center, right
  className = "",
}) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const lineAlignStyles = {
    left: "origin-left",
    center: "origin-center mx-auto",
    right: "origin-right",
  };

  return (
    <div
      className={`flex flex-col max-w-3xl mb-12 md:mb-20 ${alignStyles[align]} ${className}`}
    >
      {/* Eyebrow label */}
      {eyebrow && (
        <motion.span
          className="text-luxury-gold text-[10px] sm:text-xs font-sans font-semibold tracking-luxury uppercase mb-3 sm:mb-4 block"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow}
        </motion.span>
      )}

      {/* Main Serif Heading */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-luxury-ivory leading-tight font-serif"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {/* Elegant minimalist gold separator line */}
      <motion.div
        className={`w-16 h-[1.5px] bg-gradient-to-r from-luxury-gold-dark to-luxury-gold-light mt-6 mb-4 ${lineAlignStyles[align]}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Short sub-description */}
      {description && (
        <motion.p
          className="text-sm md:text-base font-light text-luxury-muted leading-relaxed font-sans mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
