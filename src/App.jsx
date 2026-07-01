import React from "react";
import { ReactLenis } from "lenis/react";
import Cursor from "./components/ui/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // Premium buttery smooth lag factor
        duration: 1.2, // Inertia scroll length
        smoothTouch: false, // Maintain default native scroll on mobile/touch interfaces
      }}
    >
      <div className="min-h-screen bg-luxury-bg text-luxury-ivory relative selection:bg-luxury-gold selection:text-luxury-bg">
        {/* Custom Animated Desktop Cursor */}
        <Cursor />

        {/* Global Cinematic Film Grain overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Fixed Navigation bar */}
        <Navbar />

        {/* Core Layout Sections */}
        <main>
          <Hero />
          <About />
          <Services />
          <Testimonials />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ReactLenis>
  );
}
