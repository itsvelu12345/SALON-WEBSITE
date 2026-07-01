import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useMousePosition from "../../hooks/useMousePosition";

export default function Cursor() {
  const { x, y, isHovered, hoverType } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for the outer ring lag
  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch && !mediaQuery.matches) {
      document.body.classList.add("custom-cursor-active");
      setIsVisible(true);
    }

    return () => {
      mediaQuery.removeEventListener("change", listener);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (isVisible && !isReducedMotion) {
      cursorX.set(x);
      cursorY.set(y);
    }
  }, [x, y, cursorX, cursorY, isVisible, isReducedMotion]);

  if (!isVisible || isReducedMotion) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-luxury-gold pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? (hoverType === "view" ? 2.5 : 1.4) : 1,
          backgroundColor: hoverType === "view" ? "rgba(201, 162, 75, 0.15)" : "rgba(201, 162, 75, 0)",
          borderColor: hoverType === "view" ? "rgba(201, 162, 75, 0.5)" : "#C9A24B",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        {hoverType === "view" && (
          <span className="absolute inset-0 flex items-center justify-center text-[7px] font-sans tracking-widest text-luxury-gold uppercase font-semibold">
            View
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-luxury-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.3 : 1,
          opacity: hoverType === "view" ? 0 : 1,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </>
  );
}
