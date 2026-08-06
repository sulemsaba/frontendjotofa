"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "./scroll-reveal";
import { usePage, PageId } from "@/lib/page-context";
import { submitContact } from "@/lib/api";

const contactInfo = [
  {
    icon: MapPin,
    label: "Head Office",
    value: "HT House, 2nd Floor, Ubungo, Simu 2000 Road, P.O. Box 75075, Dar es Salaam",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "0773 383 800",
    href: "tel:+255773383800",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@jotofagroup.co.tz",
    href: "mailto:info@jotofagroup.co.tz",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday to Friday - 8:00am – 6:00pm",
  },
  {
    icon: Clock,
    label: "Weekends",
    value: "Closed",
  },
];

const subsidiaryLinks: { name: string; color: string; page: PageId }[] = [
  { name: "UTEC Solutions", color: "bg-utec-cyan", page: "businesses" },
  { name: "Courier & Logistics", color: "bg-courier-orange", page: "businesses" },
  { name: "Cleaning & Maids", color: "bg-cleaning-green", page: "businesses" },
  { name: "Security", color: "bg-security-red", page: "businesses" },
  { name: "Staffing & Labour", color: "bg-staffing-purple", page: "businesses" },
];

export function Contact() {
  const { setActivePage } = usePage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    subsidiary: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitContact(formState);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", company: "", subsidiary: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="relative py-24 sm:py-32 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-jotofa-accent/5 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-jotofa-accent/20 bg-jotofa-accent/5 mb-6">
            <span className="text-jotofa-accent text-sm font-medium">
              Get in Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Let&apos;s Build{" "}
            <span className="text-jotofa-accent">Together</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Whether you&apos;re looking for a partnership, service inquiry, or
            just want to learn more — we&apos;re here to help.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
          {/* Contact form */}
          <ScrollReveal direction="left">
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-cleaning-green/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-cleaning-green" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We&apos;ll get back to you
                    shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground/80 mb-2"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-jotofa-accent/40 focus:ring-jotofa-accent/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground/80 mb-2"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-jotofa-accent/40 focus:ring-jotofa-accent/20"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-foreground/80 mb-2"
                      >
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-jotofa-accent/40 focus:ring-jotofa-accent/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subsidiary"
                        className="block text-sm font-medium text-foreground/80 mb-2"
                      >
                        Interested In
                      </label>
                      <select
                        id="subsidiary"
                        name="subsidiary"
                        value={formState.subsidiary}
                        onChange={handleChange}
                        className="w-full h-9 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:border-jotofa-accent/40 focus:ring-1 focus:ring-jotofa-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent cursor-pointer"
                      >
                        <option value="">
                          Select a subsidiary
                        </option>
                        <option value="utec">
                          UTEC Solutions (ICT & Telecom)
                        </option>
                        <option value="courier">
                          JOTOFA Courier & Logistics
                        </option>
                        <option value="cleaning">
                          JOTOFA Cleaning & Maids
                        </option>
                        <option value="security">
                          JOTOFA Security
                        </option>
                        <option value="staffing">
                          Staffing & Labour Supply
                        </option>
                        <option value="general">
                          General Inquiry
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground/80 mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your needs..."
                      className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-jotofa-accent/40 focus:ring-jotofa-accent/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-jotofa-accent hover:bg-jotofa-accent-light text-black font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-jotofa-accent/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Contact info sidebar */}
          <ScrollReveal direction="right" className="space-y-6">
            {/* Contact details */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-jotofa-accent/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-jotofa-accent" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">
                        {info.label}
                      </div>
                      <div className="text-sm text-foreground font-medium">
                        {"href" in info ? (
                          <a href={info.href} className="hover:text-jotofa-accent transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          info.value
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsidiary quick links */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Our Subsidiaries
              </h3>
              <div className="space-y-3">
                {subsidiaryLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => setActivePage(link.page)}
                    className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${link.color}`}
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
