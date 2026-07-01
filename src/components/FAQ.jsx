import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const FAQS = [
  {
    question: "How do I secure an appointment with a specific master stylist?",
    answer:
      "Appointments can be requested via our contact form, through our online scheduling portal, or by calling our concierge desk directly. We advise reserving slots 2 to 3 weeks in advance, especially for our Creative Director, Alexandra Devigne.",
  },
  {
    question: "What is the salon's cancellation and late-arrival policy?",
    answer:
      "We request a minimum of 24 hours notice for rescheduling or cancellations. Cancellations received under 24 hours may incur a fee equal to 50% of the scheduled service value. Late arrivals exceeding 15 minutes may require rescheduling to preserve the pacing of other guests.",
  },
  {
    question: "Do you accommodate walk-in appointments?",
    answer:
      "To ensure an unhurried, private, and royalty-tier treatment for all clients, we operate primarily on a pre-booked basis. However, we do occasionally have same-day openings due to schedule adjustments. We recommend calling ahead to check availability.",
  },
  {
    question: "What coloring formulas and skincare lines do you use?",
    answer:
      "We curate only the finest dermatological and hair products globally. Our primary styling lines include Oribe, Kérastase, and customized biodynamic treatment systems. All color lines are low-ammonia or ammonia-free, maintaining structural hair fiber health.",
  },
  {
    question: "Are gift cards available for custom salon packages?",
    answer:
      "Yes. We offer gold-embossed linen physical gift cards, as well as instant e-gift vouchers. Gift packages can be customized for specific rituals (such as the Deluxe Royal Experience) or loaded with custom balances.",
  },
  {
    question: "What sanitation and hygiene protocols are practiced?",
    answer:
      "We maintain medical-grade hygiene standards. All metal shears, manicure clippers, and micro-current equipment undergo autoclave sterilization between sessions. Stations and linens are fully sanitized after each appointment.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0); // Open first by default

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative py-24 md:py-36 bg-luxury-surface overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      {/* Background vector accents */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[900px] mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="The Details"
          title="Frequently Asked Questions"
          align="center"
        />

        {/* FAQ Accordion List */}
        <div className="space-y-4 mt-12 md:mt-20">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border-b border-white/5 pb-4 last:border-none transition-all duration-300"
              >
                {/* Accordion Header Trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex justify-between items-center py-4 text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base md:text-lg font-light font-serif text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-luxury-gold/60 group-hover:text-luxury-gold shrink-0 ml-4"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                {/* Accordion Body Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm font-sans font-light text-luxury-muted leading-relaxed pb-4 pr-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
