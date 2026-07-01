import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import GlassPanel from "./ui/GlassPanel";

// Easily editable contact details constants
const CONTACT_INFO = {
  phone: "9842975179",
  email: "amzadkhan.muha8@gmail.com",
  address: "netaji road near shanti bakery,marapalam,Erode",
  hours: [
    { days: "Monday-Sunday", time: "7 am-8pm" },
  ],
};

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Concierge Desk",
    content: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
  },
  {
    icon: Mail,
    label: "Direct Email",
    content: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: MapPin,
    label: "Salon Address",
    content: CONTACT_INFO.address,
    href: null,
  },
];

export default function Contact() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 bg-luxury-bg overflow-hidden"
      aria-label="Contact Information"
    >
      {/* Decorative vectors */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[500px] h-[500px] bg-luxury-accent/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="The Concierge"
          title="Connect With Royal Trendz Salon"
          description="Reach out to us directly — we'd love to hear from you."
          align="center"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Contact Info Cards */}
          {CONTACT_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <GlassPanel className="p-8 md:p-10 border-white/5 bg-white/[0.01] h-full group hover:border-luxury-gold/20 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-none text-luxury-gold group-hover:border-luxury-gold/40 group-hover:bg-luxury-gold/5 transition-all duration-500">
                      <Icon size={16} className="shrink-0" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-widest text-luxury-gold uppercase font-semibold block mb-1.5">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-sans text-luxury-ivory hover:text-luxury-gold transition-colors font-light leading-relaxed"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-sm font-sans text-luxury-ivory font-light leading-relaxed">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}

          {/* Hours Card */}
          <motion.div variants={itemVariants}>
            <GlassPanel className="p-8 md:p-10 border-white/5 bg-white/[0.01] h-full group hover:border-luxury-gold/20 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-none text-luxury-gold group-hover:border-luxury-gold/40 group-hover:bg-luxury-gold/5 transition-all duration-500">
                  <Clock size={16} className="shrink-0" />
                </div>
                <div className="w-full">
                  <span className="text-[10px] tracking-widest text-luxury-gold uppercase font-semibold block mb-2">
                    Salon Hours
                  </span>
                  <div className="space-y-1.5 w-full">
                    {CONTACT_INFO.hours.map((h, i) => (
                      <div key={i} className="flex justify-between text-sm text-luxury-ivory font-sans font-light">
                        <span>{h.days}</span>
                        <span className="text-luxury-gold">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
