import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  variant = "primary", // primary, secondary, ghost, text
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Only apply magnetic effect on desktop screens that have fine pointer control
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { clientX, clientY } = e;
    const bounding = ref.current.getBoundingClientRect();
    const centerX = bounding.left + bounding.width / 2;
    const centerY = bounding.top + bounding.height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Pull intensity factor (0.25 pulls 25% of distance)
    const factor = 0.25;
    setPosition({ x: distanceX * factor, y: distanceY * factor });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] text-[10px] sm:text-xs font-semibold py-4 px-8 transition-all duration-300 focus:outline-none select-none overflow-hidden rounded-none z-10";

  const variants = {
    primary:
      "bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-bg shadow-md hover:shadow-[0_8px_30px_rgb(201,162,75,0.2)]",
    secondary:
      "border border-luxury-gold/40 text-luxury-ivory hover:text-luxury-bg backdrop-blur-md bg-white/[0.02]",
    ghost:
      "border border-white/10 text-luxury-ivory hover:border-luxury-gold hover:text-luxury-gold backdrop-blur-md bg-white/[0.01]",
    text:
      "text-luxury-gold hover:text-luxury-gold-light tracking-[0.2em] !py-2 !px-0 border-b border-luxury-gold/30 hover:border-luxury-gold pb-0.5",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Background sweep overlay for secondary and ghost variants */}
      {(variant === "secondary" || variant === "ghost") && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-luxury-gold-dark to-luxury-gold-light z-0"
          initial={{ y: "105%" }}
          whileHover={{ y: 0 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
