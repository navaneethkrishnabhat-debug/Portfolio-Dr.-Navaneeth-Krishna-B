import { useEffect, useState } from 'react';
import { CmsDrawer } from './components/CmsDrawer';
import { ContactSection } from './components/ContactSection';
import { CredentialsSection } from './components/CredentialsSection';
import { HeroSection } from './components/HeroSection';
import { MetricsStrip } from './components/MetricsStrip';
import { Navbar } from './components/Navbar';
import { PrintCvView } from './components/PrintCvView';
import { PublicationsSection } from './components/PublicationsSection';
import { ResearchSection } from './components/ResearchSection';
import { TimelineSection } from './components/TimelineSection';
import { INITIAL_PORTFOLIO_DATA } from './data/initialPortfolio';
import { TRANSLATIONS } from './data/translations';
import { Locale, PortfolioData } from './types/portfolio';
import {
  loadPortfolioData,
  resetPortfolioData,
  savePortfolioData,
} from './utils/portfolioStorage';

const LOCALE_STORAGE_KEY = 'navaneeth_portfolio_locale';

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return saved === 'kn' || saved === 'hi' || saved === 'en' ? saved : 'en';
  });

  const [portfolio, setPortfolio] = useState<PortfolioData>(INITIAL_PORTFOLIO_DATA);
  const [cmsOpen, setCmsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  useEffect(() => {
    let active = true;
    loadPortfolioData().then((loaded) => {
      if (active) {
        setPortfolio(loaded);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleSaveCms = async (updated: PortfolioData) => {
    const saved = await savePortfolioData(updated);
    setPortfolio(saved);
  };

  const handleResetCms = async () => {
    const resetData = await resetPortfolioData();
    setPortfolio(resetData);
  };

  const t = TRANSLATIONS[locale];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        t={t.nav}
        name={portfolio.profile.name}
        cvPdfUrl={portfolio.profile.onePageCvPdfUrl || portfolio.profile.cvPdfUrl}
      />

      <main>
        <HeroSection
          profile={portfolio.profile}
          locale={locale}
          onLocaleChange={setLocale}
          t={t.hero}
          onOpenCms={() => setCmsOpen(true)}
          onPrintCv={() => window.print()}
        />

        <MetricsStrip metrics={portfolio.metrics} t={t.metrics} />

        <TimelineSection
          experiences={portfolio.experiences}
          education={portfolio.education}
          t={t.timeline}
        />

        <ResearchSection
          projects={portfolio.projects}
          conferences={portfolio.conferences}
          t={t.research}
        />

        <PublicationsSection
          publications={portfolio.publications}
          researchOutputSummary={portfolio.metrics.researchOutputSummary}
          underPeerReview={portfolio.metrics.underPeerReview}
          t={t.publications}
        />

        <CredentialsSection
          skills={portfolio.skills}
          certifications={portfolio.certifications}
          membership={portfolio.profile.membership}
          languagesSpoken={portfolio.profile.languagesSpoken}
          t={t.credentials}
        />

        <ContactSection profile={portfolio.profile} t={t.contact} />
      </main>

      <footer className="no-print border-t border-slate-200 bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-400">{t.footer.rights}</p>

          <div className="flex flex-wrap items-center gap-5 text-xs">
            <a
              href={portfolio.profile.onePageCvPdfUrl}
              download="Dr_Navaneeth_Krishna_B_1Page_Resume.pdf"
              className="text-slate-300 transition-colors hover:text-white"
            >
              {t.footer.downloadOnePagePdf}
            </a>
            <a
              href={portfolio.profile.cvPdfUrl}
              download="Dr_Navaneeth_Krishna_B_4Page_CV.pdf"
              className="text-slate-300 transition-colors hover:text-white"
            >
              {t.footer.downloadPdf}
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="text-slate-300 transition-colors hover:text-white"
            >
              {t.footer.printSheet}
            </button>
            <button
              type="button"
              onClick={() => setCmsOpen(true)}
              className="font-medium text-teal-400 transition-colors hover:text-teal-300"
            >
              {t.footer.manageCms}
            </button>
          </div>
        </div>
      </footer>

      <CmsDrawer
        open={cmsOpen}
        onClose={() => setCmsOpen(false)}
        data={portfolio}
        onSave={handleSaveCms}
        onReset={handleResetCms}
        t={t.cms}
      />

      <PrintCvView data={portfolio} locale={locale} />
    </div>
  );
}
