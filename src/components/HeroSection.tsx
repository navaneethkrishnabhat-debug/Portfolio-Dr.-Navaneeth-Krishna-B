import { Download, Mail, Printer, SlidersHorizontal, User } from 'lucide-react';
import { useState } from 'react';
import { UiDictionary } from '../data/translations';
import { Locale, ProfileData } from '../types/portfolio';

interface HeroSectionProps {
  profile: ProfileData;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  t: UiDictionary['hero'];
  onOpenCms: () => void;
  onPrintCv: () => void;
}

const LOCALE_OPTIONS: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'हिन्दी' },
];

export function HeroSection({
  profile,
  locale,
  onLocaleChange,
  t,
  onOpenCms,
  onPrintCv,
}: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  const tagline = profile.tagline[locale] || profile.tagline.en;
  const subtitle = profile.subtitle[locale] || profile.subtitle.en;
  const summary = profile.summary[locale] || profile.summary.en;

  return (
    <section
      id="top"
      className="no-print relative overflow-hidden bg-[#0B1528] text-white"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Typography & Actions */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="font-mono text-xs tracking-wide text-teal-300/90">
                {profile.credentialLine}
              </p>

              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-[3.35rem]">
                {tagline}
              </h1>

              <p className="mt-3 text-lg font-medium leading-snug text-teal-200/95 sm:text-xl">
                {subtitle}
              </p>

              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-300 tracking-[0.005em]">
                {summary}
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={profile.onePageCvPdfUrl}
                  download="Dr_Navaneeth_Krishna_B_1Page_Resume.pdf"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-teal-500 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1528]"
                >
                  <Download className="h-4 w-4" />
                  <span>{t.downloadOnePagePdf}</span>
                </a>

                <a
                  href={profile.cvPdfUrl}
                  download="Dr_Navaneeth_Krishna_B_4Page_CV.pdf"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-md border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/10 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <Download className="h-4 w-4" />
                  <span>{t.downloadOriginalPdf}</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors duration-150 hover:border-white/35 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <Mail className="h-4 w-4" />
                  <span>{t.contactMe}</span>
                </a>

                <button
                  type="button"
                  onClick={onPrintCv}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-150 hover:border-white/30 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <Printer className="h-4 w-4" />
                  <span>{t.printCv}</span>
                </button>
              </div>

              {/* Integrated Multilingual Switcher + CMS Utility Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400">{t.languageLabel}</span>
                  <div
                    role="group"
                    aria-label="Language selection"
                    className="inline-flex items-center rounded-md border border-white/15 bg-slate-900/70 p-0.5"
                  >
                    {LOCALE_OPTIONS.map((item) => {
                      const active = locale === item.code;
                      return (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => onLocaleChange(item.code)}
                          aria-pressed={active}
                          className={`rounded px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                            active
                              ? 'bg-teal-600 text-white'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenCms}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 transition-colors duration-150 hover:text-teal-300 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>{t.editCms}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Portrait at matching height */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-lg border border-white/15 bg-slate-900 lg:min-h-[460px]">
              {!imgError ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center bg-slate-900 p-8 text-center">
                  <User className="h-12 w-12 text-teal-400" />
                  <p className="mt-3 font-display text-lg font-medium text-white">{profile.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{profile.location}</p>
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-5 pt-14">
                <p className="text-sm font-semibold text-white">{t.portraitCaption}</p>
                <p className="mt-0.5 font-mono text-xs text-slate-300">
                  {profile.location} · {profile.membership}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
