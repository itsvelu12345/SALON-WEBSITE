import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, Check, Loader2 } from "lucide-react";
import { Instagram, Facebook } from "./ui/SocialIcons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, sending, done

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");

    // Simulate luxury newsletter registry API call
    setTimeout(() => {
      setStatus("done");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-luxury-bg border-t border-white/5 pt-16 md:pt-24 pb-8 relative z-20 select-none">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-16">
          {/* Column 1: Brand Wordmark and Tagline */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "home")}
              className="flex flex-col items-start leading-none group mb-6"
            >
              <span className="text-xl sm:text-2xl font-light text-luxury-ivory tracking-[0.15em] font-serif group-hover:text-luxury-gold transition-colors duration-300">
                ROYAL TRENDZ
              </span>
              <span className="text-[7px] sm:text-[9px] text-luxury-gold tracking-[0.4em] font-semibold mt-0.5 ml-0.5">
                SALON
              </span>
            </a>
            <p className="text-xs sm:text-sm font-sans font-light text-luxury-muted leading-relaxed max-w-sm mb-6">
              A sanctuary of curated aesthetics and luxury hair styling. Experiencing high-fashion,
              bespoke cosmetics, and unhurried care.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/5 hover:border-luxury-gold hover:text-luxury-gold text-luxury-ivory transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://facebook.com"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/5 hover:border-luxury-gold hover:text-luxury-gold text-luxury-ivory transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://wa.me/15551234567"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/5 hover:border-luxury-gold hover:text-luxury-gold text-luxury-ivory transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageSquare size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-sans tracking-widest uppercase font-semibold text-luxury-gold mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", id: "home" },
                { label: "About Heritage", id: "about" },
                { label: "Services Menu", id: "services" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-xs font-sans font-light text-luxury-muted hover:text-luxury-gold transition-colors duration-300 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Menu Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-sans tracking-widest uppercase font-semibold text-luxury-gold mb-6">
              Our Rituals
            </h4>
            <ul className="space-y-3">
              {[
                "Hair & Shave",
                "Colour & Spa",
                "Skincare",
                "Combo Offers",
              ].map((service, idx) => (
                <li key={idx}>
                  <a
                    href="#services"
                    onClick={(e) => handleLinkClick(e, "services")}
                    className="text-xs font-sans font-light text-luxury-muted hover:text-luxury-gold transition-colors duration-300 block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-sans tracking-widest uppercase font-semibold text-luxury-gold mb-6">
              The Newsletter
            </h4>
            <p className="text-xs font-sans font-light text-luxury-muted leading-relaxed mb-6">
              Subscribe to receive private updates on luxury hair trends, seasonal packages, and
              exclusive openings.
            </p>

            <form onSubmit={handleSubscribe} className="relative w-full flex items-center">
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 focus:border-luxury-gold py-3 pr-10 text-xs text-luxury-ivory focus:outline-none transition-colors duration-300 rounded-none font-light"
              />
              <button
                type="submit"
                disabled={status !== "idle"}
                className="absolute right-0 p-2 text-luxury-gold hover:text-luxury-gold-light focus:outline-none"
                aria-label="Subscribe"
              >
                {status === "idle" && <ArrowRight size={14} />}
                {status === "sending" && <Loader2 size={14} className="animate-spin" />}
                {status === "done" && <Check size={14} className="stroke-[3]" />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-sans text-luxury-muted tracking-widest">
          <span>&copy; {new Date().getFullYear()} ROYAL TRENDZ SALON. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-luxury-gold transition-colors duration-300">
              PRIVACY POLICY
            </a>
            <a href="#home" className="hover:text-luxury-gold transition-colors duration-300">
              TERMS OF USE
            </a>
            <a href="#home" className="hover:text-luxury-gold transition-colors duration-300">
              HYGIENE CHARTER
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
