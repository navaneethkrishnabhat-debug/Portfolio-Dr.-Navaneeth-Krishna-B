import { Check, Copy, ExternalLink, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { UiDictionary } from '../data/translations';
import { ProfileData } from '../types/portfolio';
import { submitInquiry } from '../utils/portfolioStorage';

interface ContactSectionProps {
  profile: ProfileData;
  t: UiDictionary['contact'];
  onInquiryCreated?: () => void;
}

export function ContactSection({ profile, t, onInquiryCreated }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState(t.focusOptions[0] ?? 'Pharmacovigilance & Drug Safety');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [lastMailtoHref, setLastMailtoHref] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !message.trim()) {
      setError(t.validationError);
      return;
    }

    setSubmitting(true);
    try {
      const cleanName = name.trim();
      const cleanOrg = organization.trim();
      const cleanEmail = email.trim();
      const cleanMsg = message.trim();

      const { savedToServer } = await submitInquiry({
        name: cleanName,
        organization: cleanOrg,
        email: cleanEmail,
        inquiryType,
        message: cleanMsg,
      });

      if (!savedToServer) {
        const subject = encodeURIComponent(
          `[${inquiryType}] Inquiry from ${cleanName}${cleanOrg ? ` (${cleanOrg})` : ''}`
        );
        const body = encodeURIComponent(
          `Name: ${cleanName}\nOrganization: ${cleanOrg || 'N/A'}\nEmail: ${cleanEmail}\nFocus: ${inquiryType}\n\n${cleanMsg}`
        );
        setLastMailtoHref(`mailto:${profile.email}?subject=${subject}&body=${body}`);
      } else {
        setLastMailtoHref(null);
      }

      setSubmitted(true);
      setName('');
      setOrganization('');
      setEmail('');
      setMessage('');
      onInquiryCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send inquiry right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="no-print bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Direct Coordinates */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              {t.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950 [text-wrap:balance]">
              {t.heading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{t.subheading}</p>

            <div className="mt-8 space-y-5 border-t border-slate-200 pt-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t.directTitle}
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-teal-700"
                  >
                    <Mail className="h-4 w-4 text-teal-700" />
                    <span>{profile.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-teal-600 hover:text-teal-700"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-teal-600" />
                        <span>{t.emailCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{t.copyEmail}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-xs text-slate-500">{t.phoneLabel}</div>
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-sm font-medium text-slate-900 hover:text-teal-700"
                  >
                    <Phone className="h-3.5 w-3.5 text-teal-700" />
                    <span>{profile.phone}</span>
                  </a>
                </div>

                <div>
                  <div className="text-xs text-slate-500">{t.locationLabel}</div>
                  <div className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                    <MapPin className="h-3.5 w-3.5 text-teal-700" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500">{t.linkedinLabel}</div>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:underline"
                >
                  <span>linkedin.com/in/{profile.linkedinHandle}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
                {t.availabilityNote}
              </p>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-950">{t.formTitle}</h3>

              {submitted ? (
                <div className="mt-6 rounded-lg border border-teal-200 bg-white p-6">
                  <div className="flex items-center gap-2 text-base font-semibold text-teal-800">
                    <Check className="h-5 w-5 text-teal-600" />
                    <span>{t.successTitle}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.successBody}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {lastMailtoHref && (
                      <a
                        href={lastMailtoHref}
                        className="inline-flex items-center gap-1.5 rounded-md bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>Send via Email App</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
                    >
                      {t.sendAnother}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
                  {error && (
                    <div
                      role="alert"
                      className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-800"
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inq-name" className="block text-xs font-medium text-slate-700">
                        {t.nameLabel}
                      </label>
                      <input
                        id="inq-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="inq-org" className="block text-xs font-medium text-slate-700">
                        {t.orgLabel}
                      </label>
                      <input
                        id="inq-org"
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={t.orgPlaceholder}
                        className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inq-email" className="block text-xs font-medium text-slate-700">
                        {t.emailLabel}
                      </label>
                      <input
                        id="inq-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="inq-focus" className="block text-xs font-medium text-slate-700">
                        {t.focusLabel}
                      </label>
                      <select
                        id="inq-focus"
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                      >
                        {t.focusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inq-message" className="block text-xs font-medium text-slate-700">
                      {t.messageLabel}
                    </label>
                    <textarea
                      id="inq-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.messagePlaceholder}
                      className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>{submitting ? t.submittingButton : t.submitButton}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
