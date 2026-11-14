import { Check, Copy, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { UiDictionary } from '../data/translations';
import { PublicationCategory, PublicationItem } from '../types/portfolio';

interface PublicationsSectionProps {
  publications: PublicationItem[];
  researchOutputSummary?: string;
  underPeerReview?: string;
  t: UiDictionary['publications'];
}

const CATEGORIES: PublicationCategory[] = [
  'Systematic Review Protocol',
  'Clinical & Pharmacology',
  'Formulation & Phytochemistry',
  'Medicinal Chemistry',
];

export function PublicationsSection({
  publications,
  researchOutputSummary,
  underPeerReview,
  t,
}: PublicationsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | PublicationCategory>('all');
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((pub) => {
      const matchesCat = selectedCategory === 'all' || pub.category === selectedCategory;
      const matchesQuery =
        !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.journal.toLowerCase().includes(q) ||
        pub.indexing.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [publications, selectedCategory, query]);

  const handleCopy = async (pub: PublicationItem) => {
    const citation = `Krishna B N. "${pub.title}." ${pub.journal} (${pub.indexing}).`;
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedId(pub.id);
      window.setTimeout(() => setCopiedId((curr) => (curr === pub.id ? null : curr)), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <section id="publications" className="no-print border-b border-slate-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              {t.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950 [text-wrap:balance]">
              {t.heading}
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{t.subheading}</p>
          </div>

          <div className="w-full max-w-xs">
            <label htmlFor="pub-search" className="sr-only">
              {t.searchPlaceholder}
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="pub-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-md border border-slate-300 bg-white py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
              />
            </div>
          </div>
        </div>

        {(researchOutputSummary || underPeerReview) && (
          <div className="mt-6 flex flex-col justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-xs text-slate-700 sm:flex-row sm:items-center">
            {researchOutputSummary && (
              <span className="font-mono text-slate-800">{researchOutputSummary}</span>
            )}
            {underPeerReview && (
              <span className="font-medium text-teal-800">{underPeerReview}</span>
            )}
          </div>
        )}

        {/* Interactive Category Tabs */}
        <div
          role="group"
          aria-label="Filter publications by domain"
          className="mt-6 flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 w-fit"
        >
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            aria-pressed={selectedCategory === 'all'}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
              selectedCategory === 'all'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            {t.allCategories}
          </button>
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={active}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                  active
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Publications List */}
        {filtered.length === 0 ? (
          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-600">
            {t.emptyState}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {filtered.map((pub, index) => {
              const isCopied = copiedId === pub.id;
              return (
                <article
                  key={pub.id}
                  className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-slate-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                      <span className="font-mono font-semibold tabular-nums text-teal-700">
                        {String(index + 1).padStart(2, '0')} · {pub.category}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-semibold leading-snug text-slate-950">
                      {pub.title}
                    </h3>

                    <p className="mt-2 font-display text-sm italic text-slate-700">
                      {pub.journal}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-500">{pub.indexing}</span>

                    <button
                      type="button"
                      onClick={() => handleCopy(pub)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors duration-150 hover:border-teal-600 hover:text-teal-700 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-teal-600" />
                          <span className="text-teal-700">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>{t.copyCitation}</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
