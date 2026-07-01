import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section on scroll
      const scrollPosition = window.scrollY + 200;
      for (const link of NAV_LINKS) {
        const id = link.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      // Lenis handles this, but manual scroll fallback is also clean
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 select-none ${
          isScrolled
            ? "py-3 md:py-4 bg-[#0A0A0AD0] backdrop-blur-md border-b border-luxury-gold/10"
            : "py-6 md:py-8 bg-transparent border-b border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo wordmark */}
          <a
            href="#home"
            className="flex flex-col items-start leading-none group"
            onClick={(e) => handleLinkClick(e, "#home")}
          >
            <span className="text-xl sm:text-2xl md:text-3xl font-light text-luxury-ivory tracking-[0.15em] font-serif group-hover:text-luxury-gold transition-colors duration-300">
              ROYAL TRENDZ
            </span>
            <span className="text-[7px] sm:text-[9px] text-luxury-gold tracking-[0.4em] font-semibold mt-0.5 ml-0.5">
              SALON
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="relative text-[11px] font-sans font-semibold tracking-widest text-luxury-ivory/80 hover:text-luxury-gold uppercase py-2 transition-colors duration-300 block"
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold"
                        layoutId="navActiveLine"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Nav Right CTA and Hamburger */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              variant="primary"
              className="!py-2.5 !px-5 sm:!py-3 sm:!px-6 !text-[10px]"
              onClick={(e) => {
                const contactSection = document.getElementById("contact");
                if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Now
            </Button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 text-luxury-ivory hover:text-luxury-gold transition-colors focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-luxury-bg/95 backdrop-blur-2xl flex flex-col justify-center items-center px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ul className="flex flex-col items-center space-y-6 md:space-y-8 text-center">
              {NAV_LINKS.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-3xl md:text-4xl font-light font-serif tracking-[0.1em] text-luxury-ivory hover:text-luxury-gold uppercase transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: NAV_LINKS.length * 0.05 + 0.1 }}
            >
              <Button
                variant="primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const contactSection = document.getElementById("contact");
                  if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
