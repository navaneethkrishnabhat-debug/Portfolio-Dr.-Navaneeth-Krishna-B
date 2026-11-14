import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { UiDictionary } from '../data/translations';
import { EducationItem, ExperienceCategory, ExperienceItem } from '../types/portfolio';

interface TimelineSectionProps {
  experiences: ExperienceItem[];
  education: EducationItem[];
  t: UiDictionary['timeline'];
}

type FilterOption = 'all' | ExperienceCategory | 'education';

export function TimelineSection({ experiences, education, t }: TimelineSectionProps) {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id ?? null);

  const filterButtons: { key: FilterOption; label: string }[] = [
    { key: 'all', label: t.filters.all },
    { key: 'Clinical', label: t.filters.clinical },
    { key: 'Research', label: t.filters.research },
    { key: 'Industrial', label: t.filters.industrial },
    { key: 'education', label: t.filters.education },
  ];

  const showEducation = filter === 'all' || filter === 'education';
  const filteredExperiences =
    filter === 'education'
      ? []
      : filter === 'all'
        ? experiences
        : experiences.filter((item) => item.category === filter);

  return (
    <section id="experience" className="no-print border-b border-slate-200 bg-white py-16 lg:py-20">
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

          <div
            role="group"
            aria-label="Filter timeline milestones"
            className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1"
          >
            {filterButtons.map((btn) => {
              const active = filter === btn.key;
              return (
                <button
                  key={btn.key}
                  type="button"
                  onClick={() => setFilter(btn.key)}
                  aria-pressed={active}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                    active
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Professional Experience Column */}
          {filteredExperiences.length > 0 && (
            <div className={showEducation ? 'lg:col-span-7' : 'lg:col-span-12'}>
              <h3 className="text-sm font-semibold tracking-wide text-slate-900">
                {t.experienceHeading}
              </h3>

              <div className="mt-5 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                {filteredExperiences.map((exp) => {
                  const isOpen = expandedId === exp.id;
                  return (
                    <div key={exp.id} className="transition-colors duration-150 hover:bg-slate-50/70">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isOpen ? null : exp.id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-600"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                            <span className="font-mono tabular-nums text-teal-700 font-medium">
                              {exp.period}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{exp.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{exp.location}</span>
                          </div>
                          <h4 className="mt-1.5 text-base font-semibold text-slate-950">
                            {exp.role}
                          </h4>
                          <p className="mt-0.5 text-sm font-medium text-slate-700">
                            {exp.organization}
                          </p>
                          {exp.departments && (
                            <p className="mt-1 text-xs text-slate-500">{exp.departments}</p>
                          )}
                        </div>
                        <span className="mt-1 shrink-0 text-slate-400">
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
                          <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                            {exp.highlights.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span
                                  aria-hidden="true"
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Education Column */}
          {showEducation && (
            <div className={filteredExperiences.length > 0 ? 'lg:col-span-5' : 'lg:col-span-12'}>
              <h3 className="text-sm font-semibold tracking-wide text-slate-900">
                {t.educationHeading}
              </h3>

              <div className="mt-5 space-y-4">
                {education.map((edu) => (
                  <article
                    key={edu.id}
                    className="rounded-lg border border-slate-200 bg-slate-50/50 p-5"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-xs font-medium tabular-nums text-teal-700">
                        {edu.year}
                      </span>
                      <span className="font-mono text-sm font-semibold tabular-nums text-slate-900">
                        {edu.score}
                      </span>
                    </div>
                    <h4 className="mt-2 text-base font-semibold text-slate-950">{edu.degree}</h4>
                    <p className="mt-0.5 text-sm font-medium text-slate-700">{edu.institution}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                      {edu.highlights}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
