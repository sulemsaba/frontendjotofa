"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./scroll-reveal";
import { usePage } from "@/lib/page-context";
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
    value: "Monday to Friday, 8:00am – 6:00pm",
  },
];

export function Contact() {
  const { setActivePage } = usePage();
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
    <section className="contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-left">
            <div className="section-label">
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Get in Touch
            </div>
            <h2>Let Us Know How We<br />Can Help</h2>
            <p>JOTOFA GROUP maintains a focused and selective approach to communication. Our team reviews all submissions and responds where appropriate.</p>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#1a237e]/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#1a237e]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a237e] mb-2">Message Sent!</h3>
                <p className="text-[#5c5c8a]">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
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
                    <input type="text" name="firstName" placeholder="First Name*" required value={formState.firstName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" name="lastName" placeholder="Last Name*" required value={formState.lastName} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address*" required value={formState.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" name="company" placeholder="Company (optional)" value={formState.company} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group full-width">
                  <input type="tel" name="phone" placeholder="Phone Number*" required value={formState.phone} onChange={handleChange} />
                </div>

                <div className="form-group full-width">
                  <select name="service" value={formState.service} onChange={handleChange} required>
                    <option value="" disabled>What services are you interested in?</option>
                    <option value="consulting">Business Consulting</option>
                    <option value="investment">Investment Services</option>
                    <option value="logistics">Logistics &amp; Supply Chain</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <textarea name="message" placeholder="Describe your inquiry..." required rows={5} value={formState.message} onChange={handleChange} />
                </div>

                <div className="checkbox-group">
                  <input type="checkbox" id="consent" name="consent" checked={formState.consent} onChange={handleChange} required />
                  <label htmlFor="consent">By clicking submit, I agree to the <a href="#">processing of personal data</a>.</label>
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
        <div className="container">
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
              src="https://maps.google.com/maps?q=HT+House+2nd+Floor+Ubungo+Simu+2000+Road+Dar+es+Salaam&t=&z=16&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Desktop overlay */}
            <div className="map-overlay">
              <h3>Contact Us</h3>
              <div className="info-row">
                <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                <p>HT House, 2nd Floor, Ubungo, Simu 2000 Road, P.O. Box 75075, Dar es Salaam</p>
              </div>
              <div className="info-row">
                <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <a href="tel:+255773383800">0773 383 800</a>
              </div>
              <div className="info-row">
                <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <a href="mailto:info@jotofagroup.co.tz">info@jotofagroup.co.tz</a>
              </div>
              <div className="info-row">
                <svg viewBox="0 0 24 24" className="w-4 h-4"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><polyline points="12 6 12 12 16 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <p>Mon – Fri, 8:00am – 6:00pm</p>
              </div>
            </div>
          </div>

          {/* Mobile contact info */}
          <div className="contact-info-section">
            <h3>Contact Us</h3>
            <div className="info-row">
              <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
              <p>HT House, 2nd Floor, Ubungo, Simu 2000 Road, P.O. Box 75075, Dar es Salaam</p>
            </div>
            <div className="info-row">
              <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <a href="tel:+255773383800">0773 383 800</a>
            </div>
            <div className="info-row">
              <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <a href="mailto:info@jotofagroup.co.tz">info@jotofagroup.co.tz</a>
            </div>
            <div className="info-row">
              <svg viewBox="0 0 24 24" className="w-4 h-4"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><polyline points="12 6 12 12 16 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <p>Mon – Fri, 8:00am – 6:00pm</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
