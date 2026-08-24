"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  X,
  MapPin,
  Briefcase,
  Building2,
  Clock,
  Upload,
  FileText,
  Check,
  AlertCircle,
  Calendar,
  AlertTriangle,
  Trash2,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitApplication } from "@/lib/api";

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */

interface Job {
  id: string;
  backendId?: string;
  title: string;
  category: string;
  company: string;
  location: string;
  remote: boolean;
  type: string;
  deadline: string;
}

interface JobApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */

function formatDeadline(deadline: string) {
  return new Date(deadline).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diff = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/* ─────────────────────────────────────────────
   DEADLINE BADGE (outside render)
   ───────────────────────────────────────────── */

function DeadlineBadge({ deadline }: { deadline: string }) {
  const daysUntil = getDaysUntilDeadline(deadline);
  const isPassed = daysUntil < 0;
  const isSoon = daysUntil >= 0 && daysUntil <= 7;

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
        isPassed
          ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
          : isSoon
          ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
          : "bg-jotofa-accent/10 dark:bg-jotofa-accent/15 text-jotofa-accent-dark dark:text-jotofa-accent-light border border-jotofa-accent/25 dark:border-jotofa-accent/30"
      }`}
    >
      {isPassed || isSoon ? (
        <AlertTriangle className="w-3.5 h-3.5" />
      ) : (
        <Calendar className="w-3.5 h-3.5" />
      )}
      <span>
        {isPassed
          ? "Deadline passed"
          : isSoon
          ? `Closes in ${daysUntil} day${daysUntil !== 1 ? "s" : ""}`
          : `Closes ${formatDeadline(deadline)}`}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FILE UPLOAD FIELD (outside render)
   ───────────────────────────────────────────── */

function FileUploadField({
  label,
  required,
  accept,
  file,
  onFileChange,
  onFileRemove,
  error,
  helperText,
  allowMultiple,
  files,
  onRemoveCertificate,
}: {
  label: string;
  required?: boolean;
  accept: string;
  file?: File | null;
  onFileChange?: (f: File) => void;
  onFileRemove?: () => void;
  error?: string;
  helperText: string;
  allowMultiple?: boolean;
  files?: File[];
  onRemoveCertificate?: (index: number) => void;
}) {
  const displayFiles = allowMultiple && files ? files : file ? [file] : [];

  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-foreground mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {displayFiles.length > 0 ? (
        <div className="space-y-2">
          {displayFiles.map((f, i) => (
            <div
              key={`file-${i}-${f.name}`}
              className="flex items-center gap-3 p-3 rounded-lg border-2 border-jotofa-accent/40 bg-jotofa-accent/10 dark:bg-jotofa-accent/15"
            >
              <FileText className="w-4 h-4 text-jotofa-accent-dark dark:text-jotofa-accent-light shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-foreground truncate block">
                  {f.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({(f.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (allowMultiple && onRemoveCertificate) {
                    onRemoveCertificate(i);
                  } else if (onFileRemove) {
                    onFileRemove();
                  }
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {allowMultiple && (
            <label tabIndex={0} className="flex items-center gap-2 p-2.5 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (e.target as HTMLElement).click(); } }}>
              <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground">Add another file</span>
              <input
                type="file"
                accept={accept}
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFileChange?.(f);
                }}
              />
            </label>
          )}
        </div>
      ) : (
        <label
          tabIndex={0}
          className={`flex items-center gap-3 p-4 rounded-lg border-2 border-dashed cursor-pointer hover:bg-secondary/50 transition-colors ${
            error ? "border-red-500" : "border-input"
          }`}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (e.target as HTMLElement).click(); } }}
        >
          <Upload className="w-5 h-5 text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground">{helperText}</span>
          <input
            type="file"
            accept={accept}
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFileChange?.(f);
            }}
          />
        </label>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   JOB SUMMARY SIDEBAR (outside render)
   ───────────────────────────────────────────── */

function JobSummarySidebar({ job }: { job: Job }) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-secondary/50 dark:bg-jotofa-navy/30 border border-border">
        <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
          Position Summary
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-muted-foreground">Location</span>
              <p className="text-sm font-medium text-foreground">
                {job.location}, Tanzania
                {job.remote && (
                  <span className="ml-1.5 text-xs text-jotofa-accent-dark dark:text-jotofa-accent-light font-medium">
                    (Remote)
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-muted-foreground">Category</span>
              <p className="text-sm font-medium text-foreground">{job.category}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-muted-foreground">Company</span>
              <p className="text-sm font-medium text-foreground">{job.company}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-muted-foreground">Job Type</span>
              <p className="text-sm font-medium text-foreground">{job.type}</p>
            </div>
          </div>
          {job.deadline && (
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground">Deadline</span>
                <p className="text-sm font-medium text-foreground">{formatDeadline(job.deadline)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {job.deadline && <DeadlineBadge deadline={job.deadline} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE JOB SUMMARY (outside render)
   ───────────────────────────────────────────── */

function MobileJobSummary({ job }: { job: Job }) {
  return (
    <div className="space-y-3 mb-5">
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/50 dark:bg-jotofa-navy/30 border border-border">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">
            {job.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {job.company} · {job.location}
            {job.remote && " · Remote"} · {job.type}
          </p>
        </div>
      </div>
      {job.deadline && <DeadlineBadge deadline={job.deadline} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */

export function JobApplyModal({ job, isOpen, onClose }: JobApplyModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    coverLetterText: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const isDeadlinePassed = job.deadline ? getDaysUntilDeadline(job.deadline) < 0 : false;

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!cvFile) newErrors.cv = "CV/Resume is required";
    if (isDeadlinePassed) newErrors.deadline = "The application deadline has passed";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, cvFile, isDeadlinePassed]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      setSubmitError("");
      try {
        const payload = new FormData();
        payload.append("job_id", job.backendId || job.id);
        payload.append("first_name", formData.firstName);
        payload.append("last_name", formData.lastName);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        if (cvFile) payload.append("resume", cvFile);
        if (coverLetterFile) payload.append("cover_letter", coverLetterFile);
        if (formData.coverLetterText.trim()) {
          payload.append("cover_letter_text", formData.coverLetterText.trim());
        }
        certificateFiles.forEach((file) => {
          payload.append("certificates", file);
        });
        await submitApplication(payload);
        setSubmitted(true);
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Could not submit your application. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [certificateFiles, coverLetterFile, cvFile, formData, job.backendId, job.id, validate]
  );

  const handleReset = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      coverLetterText: "",
    });
    setCvFile(null);
    setCoverLetterFile(null);
    setCertificateFiles([]);
    setSubmitted(false);
    setSubmitError("");
    setErrors({});
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(handleReset, 300);
  }, [onClose, handleReset]);

  const modalPanelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = modalPanelRef.current;
    // Move focus into modal shortly after open animation
    const t = setTimeout(() => {
      const first = panel?.querySelector<HTMLElement>('input, button, [tabindex]:not([tabindex="-1"])');
      first?.focus();
    }, 100);
    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); handleClose(); return; }
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", trap);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", trap);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [isOpen, handleClose]);

  const addCertificateFile = useCallback((f: File) => {
    setCertificateFiles((prev) => [...prev, f]);
  }, []);

  const removeCertificateFile = useCallback((index: number) => {
    setCertificateFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
            role="dialog"
            aria-modal="true"
            aria-label={`Apply for ${job.title} at ${job.company}`}
          >
            <div ref={modalPanelRef} className="relative w-full max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-jotofa-navy-deep shadow-2xl border border-border">
              {/* ─── Header ─── */}
              <div className="sticky top-0 z-10 bg-white dark:bg-jotofa-navy-deep border-b border-border px-5 sm:px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    {submitted ? "Application Submitted" : `Apply: ${job.title}`}
                  </h2>
                  {!submitted && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Req ID: {job.id} · {job.company}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ─── Content ─── */}
              {submitted ? (
                /* ═══ SUCCESS STATE ═══ */
                <div className="p-8 sm:p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-jotofa-accent/10 dark:bg-jotofa-accent/15 mb-5">
                    <Check className="w-8 h-8 text-jotofa-accent-dark dark:text-jotofa-accent-light" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Thank you for applying!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
                    Your application for <strong>{job.title}</strong> at{" "}
                    <strong>{job.company}</strong> has been received. Our HR team
                    will review it and get back to you soon.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 text-sm font-semibold rounded-full bg-jotofa-navy text-white hover:bg-jotofa-navy-mid transition-colors"
                    >
                      Browse More Jobs
                    </button>
                  </div>
                </div>
              ) : (
                /* ═══ APPLICATION FORM ═══ */
                <div className="p-5 sm:p-6">
                  {/* ─── Desktop: Two-column layout ─── */}
                  <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-6">
                    <JobSummarySidebar job={job} />

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {submitError && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <span className="text-sm text-red-600 dark:text-red-400">{submitError}</span>
                        </div>
                      )}
                      {/* First / Last Name */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="apply-firstName" className="block text-xs font-medium text-foreground mb-1.5">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="apply-firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            className={`w-full px-3 py-2 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 focus:border-jotofa-navy/40 transition-all ${
                              errors.firstName ? "border-red-500" : "border-input"
                            }`}
                            placeholder="John"
                            aria-invalid={errors.firstName ? "true" : undefined}
                            aria-describedby={errors.firstName ? "apply-firstName-error" : undefined}
                          />
                          {errors.firstName && (
                            <p id="apply-firstName-error" className="text-xs text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="apply-lastName" className="block text-xs font-medium text-foreground mb-1.5">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="apply-lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({ ...formData, lastName: e.target.value })
                            }
                            className={`w-full px-3 py-2 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 focus:border-jotofa-navy/40 transition-all ${
                              errors.lastName ? "border-red-500" : "border-input"
                            }`}
                            placeholder="Doe"
                            aria-invalid={errors.lastName ? "true" : undefined}
                            aria-describedby={errors.lastName ? "apply-lastName-error" : undefined}
                          />
                          {errors.lastName && (
                            <p id="apply-lastName-error" className="text-xs text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="apply-email" className="block text-xs font-medium text-foreground mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="apply-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={`w-full px-3 py-2 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 focus:border-jotofa-navy/40 transition-all ${
                            errors.email ? "border-red-500" : "border-input"
                          }`}
                          placeholder="john.doe@email.com"
                          aria-invalid={errors.email ? "true" : undefined}
                          aria-describedby={errors.email ? "apply-email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="apply-email-error" className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="apply-phone" className="block text-xs font-medium text-foreground mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="apply-phone"
                          type="tel"
                          inputMode="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className={`w-full px-3 py-2 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 focus:border-jotofa-navy/40 transition-all ${
                            errors.phone ? "border-red-500" : "border-input"
                          }`}
                          placeholder="+255 7XX XXX XXX"
                          aria-invalid={errors.phone ? "true" : undefined}
                          aria-describedby={errors.phone ? "apply-phone-error" : undefined}
                        />
                        {errors.phone && (
                          <p id="apply-phone-error" className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Location */}
                      <div>
                        <label htmlFor="apply-location" className="block text-xs font-medium text-foreground mb-1.5">
                          Current Location
                        </label>
                        <input
                          id="apply-location"
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-input text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 focus:border-jotofa-navy/40 transition-all"
                          placeholder="Dar es Salaam, Tanzania"
                        />
                      </div>

                      {/* CV/Resume Upload */}
                      <FileUploadField
                        label="CV / Resume"
                        required
                        accept=".pdf,.doc,.docx"
                        file={cvFile}
                        onFileChange={(f) => setCvFile(f)}
                        onFileRemove={() => setCvFile(null)}
                        error={errors.cv}
                        helperText="Click to upload PDF, DOC, or DOCX (max 5MB)"
                      />

                      {/* Cover Letter - Upload or Type */}
                      <div>
                        <label htmlFor="apply-coverLetter" className="block text-xs font-medium text-foreground mb-1.5">
                          Cover Letter
                        </label>
                        <div className="space-y-3">
                          <FileUploadField
                            label=""
                            accept=".pdf,.doc,.docx"
                            file={coverLetterFile}
                            onFileChange={(f) => setCoverLetterFile(f)}
                            onFileRemove={() => setCoverLetterFile(null)}
                            helperText="Upload cover letter (PDF, DOC, or DOCX, max 5MB)"
                          />
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-border" />
                            <span className="text-xs text-muted-foreground font-medium">OR</span>
                            <div className="flex-1 h-px bg-border" />
                          </div>
                          <textarea
                            id="apply-coverLetter"
                            value={formData.coverLetterText}
                            onChange={(e) =>
                              setFormData({ ...formData, coverLetterText: e.target.value })
                            }
                            rows={4}
                            className="w-full px-3 py-2 rounded-lg border border-input text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 focus:border-jotofa-navy/40 transition-all resize-none"
                            placeholder="Type your cover letter here..."
                          />
                        </div>
                      </div>

                      {/* Academic Certificates Upload */}
                      <div>
                        <label htmlFor="apply-certificates-desktop" className="block text-xs font-medium text-foreground mb-1.5">
                          Academic Certificates
                        </label>
                        {certificateFiles.length > 0 ? (
                          <div className="space-y-2">
                            {certificateFiles.map((f, i) => (
                              <div
                                key={`cert-${i}-${f.name}`}
                                className="flex items-center gap-3 p-2.5 rounded-lg border border-jotofa-accent/25 dark:border-jotofa-accent/30 bg-jotofa-accent/10 dark:bg-jotofa-accent/10"
                              >
                                <FileText className="w-4 h-4 text-jotofa-accent-dark dark:text-jotofa-accent-light shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <span className="text-sm font-medium text-foreground truncate block">
                                    {f.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    ({(f.size / 1024).toFixed(0)} KB)
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeCertificateFile(i)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                            <label tabIndex={0} className="flex items-center gap-2 p-2.5 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (e.target as HTMLElement).click(); } }}>
                              <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
                              <span className="text-xs text-muted-foreground">Add another certificate</span>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                className="sr-only"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) addCertificateFile(f);
                                }}
                              />
                            </label>
                          </div>
                        ) : (
                           <label
                             tabIndex={0}
                             className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors"
                             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (e.target as HTMLElement).click(); } }}
                           >
                            <Upload className="w-5 h-5 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              Upload academic certificates (PDF, DOC, DOCX, JPG, PNG, max 5MB each)
                            </span>
                            <input
                              id="apply-certificates-desktop"
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              className="sr-only"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) addCertificateFile(f);
                              }}
                            />
                          </label>
                        )}
                      </div>

                      {/* Deadline error */}
                      {errors.deadline && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                          <span className="text-sm text-red-600 dark:text-red-400">{errors.deadline}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || isDeadlinePassed}
                          className="flex-1 py-3 text-sm font-semibold rounded-full bg-jotofa-navy text-white hover:bg-jotofa-navy-mid transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Submitting..." : isDeadlinePassed ? "Deadline Passed" : "Submit Application"}
                        </button>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="px-6 py-3 text-sm font-medium rounded-full border border-input text-foreground hover:bg-secondary transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* ─── Mobile: Single-column layout ─── */}
                  <div className="lg:hidden">
                    <MobileJobSummary job={job} />

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {submitError && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <span className="text-xs text-red-600 dark:text-red-400">{submitError}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="apply-firstName-m" className="block text-xs font-medium text-foreground mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="apply-firstName-m"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 transition-all ${
                              errors.firstName ? "border-red-500" : "border-input"
                            }`}
                            placeholder="John"
                            aria-invalid={errors.firstName ? "true" : undefined}
                            aria-describedby={errors.firstName ? "apply-firstName-m-error" : undefined}
                          />
                          {errors.firstName && (
                            <p id="apply-firstName-m-error" className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="apply-lastName-m" className="block text-xs font-medium text-foreground mb-1">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="apply-lastName-m"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({ ...formData, lastName: e.target.value })
                            }
                            className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 transition-all ${
                              errors.lastName ? "border-red-500" : "border-input"
                            }`}
                            placeholder="Doe"
                            aria-invalid={errors.lastName ? "true" : undefined}
                            aria-describedby={errors.lastName ? "apply-lastName-m-error" : undefined}
                          />
                          {errors.lastName && (
                            <p id="apply-lastName-m-error" className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="apply-email-m" className="block text-xs font-medium text-foreground mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="apply-email-m"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 transition-all ${
                            errors.email ? "border-red-500" : "border-input"
                          }`}
                          placeholder="john@email.com"
                          aria-invalid={errors.email ? "true" : undefined}
                          aria-describedby={errors.email ? "apply-email-m-error" : undefined}
                        />
                        {errors.email && (
                          <p id="apply-email-m-error" className="text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="apply-phone-m" className="block text-xs font-medium text-foreground mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="apply-phone-m"
                          type="tel"
                          inputMode="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 transition-all ${
                            errors.phone ? "border-red-500" : "border-input"
                          }`}
                          placeholder="+255 7XX XXX XXX"
                          aria-invalid={errors.phone ? "true" : undefined}
                          aria-describedby={errors.phone ? "apply-phone-m-error" : undefined}
                        />
                        {errors.phone && (
                          <p id="apply-phone-m-error" className="text-xs text-red-500 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* CV/Resume Upload */}
                      <FileUploadField
                        label="CV / Resume"
                        required
                        accept=".pdf,.doc,.docx"
                        file={cvFile}
                        onFileChange={(f) => setCvFile(f)}
                        onFileRemove={() => setCvFile(null)}
                        error={errors.cv}
                        helperText="Upload PDF/DOC (max 5MB)"
                      />

                      {/* Cover Letter */}
                      <div>
                        <label htmlFor="apply-coverLetter-m" className="block text-xs font-medium text-foreground mb-1">
                          Cover Letter
                        </label>
                        <div className="space-y-3">
                          <FileUploadField
                            label=""
                            accept=".pdf,.doc,.docx"
                            file={coverLetterFile}
                            onFileChange={(f) => setCoverLetterFile(f)}
                            onFileRemove={() => setCoverLetterFile(null)}
                            helperText="Upload cover letter (PDF, DOC, DOCX)"
                          />
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-border" />
                            <span className="text-xs text-muted-foreground font-medium">OR</span>
                            <div className="flex-1 h-px bg-border" />
                          </div>
                          <textarea
                            id="apply-coverLetter-m"
                            value={formData.coverLetterText}
                            onChange={(e) =>
                              setFormData({ ...formData, coverLetterText: e.target.value })
                            }
                            rows={3}
                            className="w-full px-3 py-2.5 rounded-lg border border-input text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 transition-all resize-none"
                            placeholder="Type your cover letter here..."
                          />
                        </div>
                      </div>

                      {/* Academic Certificates */}
                      <div>
                        <label htmlFor="apply-certificates-mobile" className="block text-xs font-medium text-foreground mb-1">
                          Academic Certificates
                        </label>
                        {certificateFiles.length > 0 ? (
                          <div className="space-y-2">
                            {certificateFiles.map((f, i) => (
                              <div
                                key={`cert-m-${i}-${f.name}`}
                                className="flex items-center gap-2 p-2 rounded-lg border border-jotofa-accent/25 dark:border-jotofa-accent/30 bg-jotofa-accent/10 dark:bg-jotofa-accent/10"
                              >
                                <FileText className="w-4 h-4 text-jotofa-accent-dark dark:text-jotofa-accent-light shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <span className="text-xs font-medium text-foreground truncate block">
                                    {f.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeCertificateFile(i)}
                                  className="w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors shrink-0"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <label tabIndex={0} className="flex items-center gap-2 p-2 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors">
                              <Plus className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              <span className="text-xs text-muted-foreground">Add more</span>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                className="sr-only"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) addCertificateFile(f);
                                }}
                              />
                            </label>
                          </div>
                        ) : (
                           <label
                             tabIndex={0}
                             className="flex items-center gap-2 p-3 rounded-lg border-2 border-dashed border-input cursor-pointer hover:bg-secondary/50 transition-colors"
                             onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (e.target as HTMLElement).click(); } }}
                           >
                            <Upload className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="text-xs text-muted-foreground">
                              Upload certificates (PDF, DOCX, JPG, PNG)
                            </span>
                            <input
                              id="apply-certificates-mobile"
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              className="sr-only"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) addCertificateFile(f);
                              }}
                            />
                          </label>
                        )}
                      </div>

                      {/* Deadline error */}
                      {errors.deadline && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                          <span className="text-xs text-red-600 dark:text-red-400">{errors.deadline}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting || isDeadlinePassed}
                        className="w-full py-3 text-sm font-semibold rounded-full bg-jotofa-navy text-white hover:bg-jotofa-navy-mid transition-colors disabled:opacity-60"
                      >
                        {isSubmitting ? "Submitting..." : isDeadlinePassed ? "Deadline Passed" : "Submit Application"}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
