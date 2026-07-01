import { useState, useEffect } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState({
    isHovered: false,
    hoverType: "default", // default, pointer, view, drag
  });

  useEffect(() => {
    // Check if device supports hover (desktop)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Find closest interactive parent
      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      const galleryItem = target.closest(".gallery-interactive");
      const textExpand = target.closest(".text-expand-hover");

      if (galleryItem) {
        setHoverState({ isHovered: true, hoverType: "view" });
      } else if (interactive) {
        setHoverState({ isHovered: true, hoverType: "pointer" });
      } else if (textExpand) {
        setHoverState({ isHovered: true, hoverType: "expand" });
      } else {
        setHoverState({ isHovered: false, hoverType: "default" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return { ...mousePosition, ...hoverState };
}
