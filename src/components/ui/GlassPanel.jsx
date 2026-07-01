import React from "react";

export default function GlassPanel({
  children,
  className = "",
  goldBorder = false,
  ...props
}) {
  return (
    <div
      className={`backdrop-blur-lg rounded-none overflow-hidden ${
        goldBorder ? "glass-panel-gold" : "glass-panel"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
