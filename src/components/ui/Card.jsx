import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Card({
  children,
  className = "",
  hoverGlow = true,
  ...props
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalize mouse coords inside card to a range of 0 to 1
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Map 0 -> 1 coordinates to rotation degree ranges (-8deg to 8deg)
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), {
    damping: 30,
    stiffness: 220,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), {
    damping: 30,
    stiffness: 220,
  });

  // Smooth springs for the glowing light flare position
  const glowX = useSpring(useTransform(x, [0, 1], ["0%", "100%"]), {
    damping: 30,
    stiffness: 220,
  });
  const glowY = useSpring(useTransform(y, [0, 1], ["0%", "100%"]), {
    damping: 30,
    stiffness: 220,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const bounding = ref.current.getBoundingClientRect();
    const width = bounding.width;
    const height = bounding.height;
    const mouseX = e.clientX - bounding.left;
    const mouseY = e.clientY - bounding.top;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative glass-panel rounded-none overflow-hidden transition-all duration-300 ${
        isHovered
          ? "border-luxury-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          : "border-white/5"
      } ${className}`}
      {...props}
    >
      {/* Soft light glow overlay following cursor */}
      {hoverGlow && isHovered && (
        <motion.div
          className="absolute pointer-events-none rounded-full w-48 h-48 bg-luxury-gold/10 blur-[80px] mix-blend-screen"
          style={{
            left: glowX,
            top: glowY,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Gold top highlight bar that expands on hover */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />

      {/* Inner Container keeping contents flat or offset slightly */}
      <div
        style={{ transform: "translateZ(15px)" }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
