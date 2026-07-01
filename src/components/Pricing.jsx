import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import Button from "./ui/Button";

const TIERS = [
  {
    name: "Signature Ritual",
    price: "150",
    description: "Curated essential care for a regular polished elegance.",
    features: [
      "Precision Haircut & Blow-dry styling",
      "Organic Botanical Conditioning mask",
      "Express Hydration Scalp massage",
      "Complimentary Champagne service",
    ],
    cta: "Book Signature",
    featured: false,
  },
  {
    name: "Deluxe Royal Experience",
    price: "290",
    description: "Our recommended signature ceremony for deep rejuvenation.",
    features: [
      "Precision Cut & Balayage or Full Color",
      "Deep-Infusion Molecular Hair therapy",
      "Celestial Mini-Facial & Gua Sha lifting",
      "Sculpted Manicure with milk bath",
      "Sommelier Champagne & Caviar bites",
    ],
    cta: "Book Deluxe",
    featured: true,
  },
  {
    name: "Imperial VIP Indulgence",
    price: "580",
    description: "Full-day absolute cosmetic transformation in private suite.",
    features: [
      "Bespoke Couture Styling & Highlights",
      "Olaplex/K18 Reconstruction treatment",
      "24K Gold-Leaf Skincare Facial Ritual",
      "90-min Aromatherapy Hot Stone massage",
      "Signature Manicure & Royal Pedicure",
      "Private VIP Suite & Gourmet dining",
    ],
    cta: "Book Imperial",
    featured: false,
  },
];

export default function Pricing() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-cta");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-36 bg-luxury-bg overflow-hidden"
      aria-label="Pricing Packages"
    >
      {/* Decorative luxury circles */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[500px] h-[500px] bg-luxury-accent/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="The Pricing"
          title="Curated Luxury Packages"
          description="Invest in yourself with our bespoke care bundles, designed for absolute visual and sensory excellence."
          align="center"
        />

        {/* Pricing Tiers Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-12 md:mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TIERS.map((tier, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <Card
                className={`h-full p-8 md:p-12 flex flex-col justify-between ${
                  tier.featured
                    ? "border-luxury-gold/40 bg-white/[0.03] shadow-[0_15px_40px_rgba(201,162,75,0.08)]"
                    : "border-white/5 bg-white/[0.01]"
                }`}
                hoverGlow={true}
              >
                {/* Header info */}
                <div>
                  {tier.featured && (
                    <span className="text-[9px] font-sans tracking-widest text-luxury-gold font-bold uppercase bg-luxury-gold/10 py-1 px-3 mb-6 inline-block">
                      Most Requested
                    </span>
                  )}

                  <h3 className="text-2xl md:text-3xl font-light text-luxury-ivory font-serif mb-2">
                    {tier.name}
                  </h3>

                  <p className="text-xs text-luxury-muted font-sans font-light min-h-[32px] mb-6">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline mb-8">
                    <span className="text-sm font-sans font-medium text-luxury-gold mr-1">
                      $
                    </span>
                    <span className="text-5xl md:text-6xl font-light font-serif text-luxury-ivory">
                      {tier.price}
                    </span>
                    <span className="text-xs font-sans text-luxury-muted ml-2">
                      / Session
                    </span>
                  </div>

                  {/* List of features */}
                  <ul className="space-y-4 border-t border-white/5 pt-8 mb-10">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check
                          size={14}
                          className="text-luxury-gold mt-0.5 shrink-0 stroke-[2]"
                        />
                        <span className="text-xs sm:text-sm font-light text-luxury-ivory/80 font-sans">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call To Action button */}
                <div className="mt-auto">
                  <Button
                    variant={tier.featured ? "primary" : "ghost"}
                    className="w-full text-center"
                    onClick={scrollToBooking}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
