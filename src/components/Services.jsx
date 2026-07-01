import React from "react";
import { motion } from "framer-motion";
import { Scissors, Droplet, Sparkles, Crown, ArrowRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";

const SERVICE_CATEGORIES = [
  {
    icon: Scissors,
    title: "Hair & Shave",
    items: [
      { name: "Haircut", price: "₹150" },
      { name: "Styling Haircut", price: "₹150" },
      { name: "Children Haircut", price: "₹120" },
      { name: "Shave", price: "₹60" },
      { name: "Royal Shave", price: "₹80" },
    ],
  },
  {
    icon: Droplet,
    title: "Colour & Spa",
    items: [
      { name: "Hair Colour", price: "₹200" },
      { name: "XBS Colouring", price: "₹300" },
      { name: "Hair Spa", price: "₹600" },
      { name: "Hair Straightening", price: "₹1500" },
      { name: "Hair Wash", price: "₹100" },
      { name: "Massage", price: "₹300" },
    ],
  },
  {
    icon: Sparkles,
    title: "Skincare",
    items: [
      { name: "Facial (Royal Pack)", price: "₹600 - ₹1500" },
      { name: "Face Bleach (Anti-Aging)", price: "₹400" },
      { name: "De-Tan", price: "₹450" },
      { name: "Charcoal Face Mask", price: "₹300 - ₹350" },
    ],
  },
  {
    icon: Crown,
    title: "Combo Offers",
    items: [
      { name: "Haircut + Shave + De-Tan", price: "₹550" },
      { name: "Haircut + Shave + Massage", price: "₹350" },
      { name: "Hairstyling + Blow Dry", price: "₹100" },
    ],
  },
];

export default function Services() {
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
      id="services"
      className="relative py-24 md:py-36 bg-luxury-bg overflow-hidden"
      aria-label="Salon Services"
    >
      {/* Decorative vector overlays */}
      <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-luxury-gold/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-luxury-accent/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="The Experience"
          title="Curated Aesthetics & Therapies"
          description="Every service is customized to your unique features, using biodynamic ingredients and state-of-the-art procedures."
          align="center"
        />

        {/* Services Card Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICE_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div key={index} variants={cardVariants} className="h-full">
                <Card className="h-full p-8 md:p-10 flex flex-col group">
                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-none mb-8 group-hover:border-luxury-gold/40 group-hover:bg-luxury-gold/5 transition-all duration-500">
                      <Icon className="text-luxury-gold stroke-[1.2] w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-light text-luxury-ivory font-serif mb-6 group-hover:text-luxury-gold transition-colors duration-300">
                      {category.title}
                    </h3>

                    {/* Service Items List */}
                    <ul className="space-y-4 mb-8">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-end border-b border-white/5 pb-2">
                          <span className="text-sm font-light text-luxury-muted font-sans">
                            {item.name}
                          </span>
                          <span className="text-sm font-sans tracking-wider text-luxury-gold font-medium ml-4">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Reserve footer */}
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <a
                      href="#booking-cta"
                      className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-widest uppercase font-semibold text-luxury-ivory/60 group-hover:text-luxury-gold transition-colors duration-300"
                    >
                      Reserve{" "}
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
