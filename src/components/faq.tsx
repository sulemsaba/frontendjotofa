"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What industries does JOTOFA GROUP operate in?",
    answer:
      "JOTOFA GROUP operates across four key sectors: ICT & Telecommunications through UTEC Solutions, Courier & Logistics, Professional Cleaning & Maids services, and Staffing & Labour workforce services.",
  },
  {
    question: "Where are JOTOFA GROUP's services available?",
    answer:
      "Our services are primarily available across Tanzania, with our headquarters in Dar es Salaam and operational reach extending to major cities and regions throughout the country.",
  },
  {
    question: "How can I partner with JOTOFA GROUP?",
    answer:
      "We welcome partnership opportunities. Please visit our Contact page or reach out directly to the specific subsidiary you're interested in partnering with. We'll connect you with the right team.",
  },
  {
    question: "Does JOTOFA GROUP offer corporate solutions?",
    answer:
      "Yes, all our subsidiaries offer tailored corporate solutions. From enterprise ICT infrastructure and bulk logistics to corporate cleaning contracts and large-scale staffing, we have dedicated teams for business clients.",
  },
  {
    question: "How do I apply for a job at JOTOFA GROUP?",
    answer:
      "Visit our Careers page to view current openings across all subsidiaries. You can submit your application directly through the portal or send your CV to the relevant subsidiary's HR department.",
  },
  {
    question: "What is JOTOFA GROUP's approach to sustainability?",
    answer:
      "Sustainability is core to our operations. We integrate CSR principles across all subsidiaries, focusing on environmental stewardship, community development, and ethical business practices.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-[60vh] py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-jotofa-navy dark:text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-jotofa-navy/70 dark:text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
            Find answers to common questions about JOTOFA GROUP, our subsidiaries, and how we serve Tanzania.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full text-left px-5 py-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent rounded-xl"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm sm:text-base font-medium text-jotofa-navy dark:text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 text-jotofa-navy/60 dark:text-white/60 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 pt-0">
                  <p className="text-sm text-jotofa-navy/70 dark:text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
