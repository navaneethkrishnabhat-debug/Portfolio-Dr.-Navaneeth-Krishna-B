import { Award } from 'lucide-react';
import { UiDictionary } from '../data/translations';
import { ConferenceItem, ResearchProjectItem } from '../types/portfolio';

interface ResearchSectionProps {
  projects: ResearchProjectItem[];
  conferences: ConferenceItem[];
  t: UiDictionary['research'];
}

export function ResearchSection({ projects, conferences, t }: ResearchSectionProps) {
  return (
    <section id="research" className="no-print border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            {t.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950 [text-wrap:balance]">
            {t.heading}
          </h2>
          <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">{t.subheading}</p>
        </div>

        {/* Core Academic Research Projects */}
        <div className="mt-10">
          <h3 className="text-sm font-semibold tracking-wide text-slate-900">
            {t.projectsHeading}
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {projects.map((proj, index) => (
              <article
                key={proj.id}
                className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-mono font-medium text-teal-700">
                      0{index + 1}. {proj.program}
                    </span>
                    <span className="font-mono tabular-nums">{proj.duration}</span>
                  </div>
                  <h4 className="mt-3 font-display text-xl font-semibold leading-snug text-slate-950 [text-wrap:balance]">
                    {proj.title}
                  </h4>

                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700">
                    {proj.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <div className="text-xs font-medium text-slate-500">{t.toolsLabel}</div>
                  <div className="mt-1 font-mono text-xs text-slate-800">{proj.tools}</div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Conference Presentations & Awards Ledger */}
        <div className="mt-14">
          <h3 className="text-sm font-semibold tracking-wide text-slate-900">
            {t.conferencesHeading}
          </h3>

          <div className="mt-5 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {conferences.map((conf) => (
              <div
                key={conf.id}
                className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-12 sm:items-baseline"
              >
                <div className="font-mono text-sm font-semibold tabular-nums text-slate-900 sm:col-span-2">
                  {conf.year}
                </div>

                <div className="sm:col-span-7">
                  <h4 className="text-base font-semibold leading-snug text-slate-950">
                    {conf.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">
                    {conf.event} · {conf.location} · {conf.type}
                  </p>
                </div>

                <div className="sm:col-span-3 sm:text-right">
                  {conf.award ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                      <Award className="h-3.5 w-3.5 shrink-0" />
                      <span>{conf.award}</span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">{conf.type}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
