"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./scroll-reveal";
import { submitContact } from "@/lib/api";

export function Contact() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.consent) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await submitContact({
        name: `${formState.firstName} ${formState.lastName}`.trim(),
        email: formState.email,
        company: formState.company,
        subsidiary: formState.service,
        message: formState.message,
      });
      setIsSubmitted(true);
      setFormState({ firstName: "", lastName: "", email: "", company: "", phone: "", service: "", message: "", consent: false });
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
    const target = e.target;
    if (target.type === "checkbox") {
      setFormState((prev) => ({ ...prev, consent: (target as HTMLInputElement).checked }));
    } else {
      setFormState((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  return (
    <section className="contact-section pt-20 sm:pt-24">
      <div className="container-page">
        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-left">
            <div className="section-label">
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Get in Touch
            </div>
            <h1>Let Us Know How We<br />Can Help</h1>
            <p>JOTOFA GROUP maintains a focused and selective approach to communication. Our team reviews all submissions and responds where appropriate.</p>

            <div className="space-y-6 mt-10">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-foreground/80">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Head Office</div>
                  <div className="mt-1 text-sm leading-relaxed text-foreground">HT House, 2nd Floor, Ubungo, Simu 2000 Road, P.O. Box 75075, Dar es Salaam</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-foreground/80">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phone</div>
                  <a href="tel:+255773383800" className="mt-1 block text-sm text-foreground hover:text-jotofa-accent transition-colors">0773 383 800</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-foreground/80">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</div>
                  <a href="mailto:info@jotofagroup.co.tz" className="mt-1 block text-sm text-foreground hover:text-jotofa-accent transition-colors">info@jotofagroup.co.tz</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-foreground/80">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Business Hours</div>
                  <div className="mt-1 text-sm text-foreground">Monday to Friday, 8:00am - 6:00pm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-jotofa-navy/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-jotofa-navy" />
                </div>
                <h3 className="text-xl font-bold text-jotofa-navy mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {submitError && (
                  <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-6">
                    {submitError}
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name <span aria-label="required">*</span></label>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" required autoComplete="given-name" value={formState.firstName} onChange={handleChange} aria-required="true" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name <span aria-label="required">*</span></label>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" required autoComplete="family-name" value={formState.lastName} onChange={handleChange} aria-required="true" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span aria-label="required">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Email Address" required autoComplete="email" value={formState.email} onChange={handleChange} aria-required="true" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" name="company" placeholder="Company" autoComplete="organization" value={formState.company} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="phone">Phone Number <span aria-label="required">*</span></label>
                  <input type="tel" id="phone" name="phone" placeholder="Phone Number" required autoComplete="tel" value={formState.phone} onChange={handleChange} aria-required="true" />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="service">Service Interested In <span aria-label="required">*</span></label>
                  <select id="service" name="service" value={formState.service} onChange={handleChange} required aria-required="true">
                    <option value="" disabled>What services are you interested in?</option>
                    <option value="consulting">Business Consulting</option>
                    <option value="investment">Investment Services</option>
                    <option value="logistics">Logistics &amp; Supply Chain</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message <span aria-label="required">*</span></label>
                  <textarea id="message" name="message" placeholder="Describe your inquiry..." required rows={5} value={formState.message} onChange={handleChange} aria-required="true"></textarea>
                </div>

                <div className="checkbox-group">
                  <input type="checkbox" id="consent" name="consent" checked={formState.consent} onChange={handleChange} required />
                  <label htmlFor="consent">By clicking submit, I agree to the <a href="/privacy">processing of personal data</a>.</label>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : <>Submit Inquiry <Send className="w-3.5 h-3.5" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="map-section">
        <div className="container-page">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Discover JOTOFA GROUP Office
          </div>
          <h2 className="text-center">How to Find Us</h2>

          <div className="map-wrapper">
            <iframe
              src="https://maps.google.com/maps?q=HT+House%2C+Ubungo%2C+Simu+2000+Road%2C+Dar+es+Salaam&t=m&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JOTOFA GROUP Office Location"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
