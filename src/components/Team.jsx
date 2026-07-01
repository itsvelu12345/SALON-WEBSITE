import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin } from "./ui/SocialIcons";
import SectionHeading from "./ui/SectionHeading";

const TEAM = [
  {
    name: "Alexandra Devigne",
    role: "Creative Director & Master Colorist",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Dimitri Vance",
    role: "Lead Stylist & Hair Architect",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Elena Rostova",
    role: "Master Aesthetician & Skincare Expert",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    instagram: "#",
    linkedin: "#",
  },
  {
    name: "Marcus Sterling",
    role: "Editorial Nail Couturier",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    instagram: "#",
    linkedin: "#",
  },
];

export default function Team() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="team"
      className="relative py-24 md:py-36 bg-luxury-surface overflow-hidden"
      aria-label="Salon Stylists Team"
    >
      {/* Decorative gradient overlays */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="The Visionaries"
          title="Meet Our Elite Stylists"
          description="A group of world-renowned beauty architects who treat hair and skin design as canvas art."
          align="left"
        />

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 md:mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TEAM.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col relative group select-none"
            >
              {/* Portrait Container */}
              <div className="relative overflow-hidden aspect-[3/4] bg-luxury-bg shadow-md mb-6">
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 z-10 group-hover:opacity-85 transition-opacity duration-300" />
                <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/30 transition-colors duration-500 z-20 pointer-events-none" />

                {/* Portrait Photo */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Social Icon Drawer (Fades/Slides up on hover) */}
                <div className="absolute inset-x-0 bottom-6 flex justify-center gap-4 z-20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href={member.instagram}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 border border-white/10 hover:border-luxury-gold hover:text-luxury-gold text-luxury-ivory transition-colors duration-300"
                    aria-label={`${member.name} Instagram`}
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href={member.linkedin}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 border border-white/10 hover:border-luxury-gold hover:text-luxury-gold text-luxury-ivory transition-colors duration-300"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>

              {/* Text Info */}
              <div className="text-left">
                <h4 className="text-xl md:text-2xl font-light text-luxury-ivory font-serif group-hover:text-luxury-gold transition-colors duration-300">
                  {member.name}
                </h4>
                <span className="text-[10px] sm:text-xs font-sans text-luxury-gold tracking-widest uppercase font-semibold block mt-1">
                  {member.role}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
