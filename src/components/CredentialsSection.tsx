import { useState } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { UiDictionary } from '../data/translations';
import { CertificationItem, SkillCategoryItem } from '../types/portfolio';

interface CredentialsSectionProps {
  skills: SkillCategoryItem[];
  certifications: CertificationItem[];
  membership: string;
  languagesSpoken: string[];
  t: UiDictionary['credentials'];
}

interface CompetencyAxis {
  id: string;
  domain: string;
  level: number;
  tier: string;
  evidence: string;
}

const COMPETENCY_DATA: CompetencyAxis[] = [
  {
    id: 'pv',
    domain: 'Pharmacovigilance',
    level: 5.0,
    tier: 'Applied Clinical Practice',
    evidence:
      'ADR identification & VigiFlow reporting at Narayana Health & SIMS Mangalore; drug–drug interaction assessment; LSSSDC Certificate Program in Pharmacovigilance.',
  },
  {
    id: 'clinical-pharmacy',
    domain: 'Clinical Pharmacy',
    level: 5.0,
    tier: 'Applied Clinical Practice',
    evidence:
      'OPD & inpatient medication chart review, prescription audits, antimicrobial stewardship (AMS), patient counseling, Oncology & Cardiology rotations, 2 months hospital pharmacy.',
  },
  {
    id: 'clinical-research',
    domain: 'Clinical Research',
    level: 4.5,
    tier: 'Advanced Practice',
    evidence:
      'Retrospective clinical outcome study (Toxemia-Induced Hypertension), NIDA GCP certified, Researium Labs 1-month Clinical Research/CDM/Medical Coding, SCRMP 6-month training.',
  },
  {
    id: 'scientific-writing',
    domain: 'Scientific Writing',
    level: 5.0,
    tier: 'Applied & Published',
    evidence:
      '24 published works (research, reviews, case series, case reports, systematic reviews & Prospera protocols), 23 citations, H-Index 2, IMWA Medical Writing certified.',
  },
  {
    id: 'regulatory',
    domain: 'Regulatory Affairs',
    level: 4.0,
    tier: 'Proficient',
    evidence:
      'IND, NDA & ANDA submission knowledge; CDSCO & ICH Q9 guidelines; GMP/GDP & GLP SOPs (HPLC, UV-Vis, dissolution) at Auriga Research Lab; Researium Labs Regulatory Affairs training.',
  },
  {
    id: 'biostats-ai',
    domain: 'Biostatistics & AI',
    level: 4.0,
    tier: 'Proficient',
    evidence:
      'SPSS (descriptive & chi-square analysis), Microsoft Excel data cleaning/tables, basic R programming, SQL queries, and AI-enabled healthcare & web application tools.',
  },
];

export function CredentialsSection({
  skills,
  certifications,
  membership,
  languagesSpoken,
  t,
}: CredentialsSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(COMPETENCY_DATA[0].id);
  const activeAxis =
    COMPETENCY_DATA.find((item) => item.id === selectedId) ?? COMPETENCY_DATA[0];

  return (
    <section id="credentials" className="no-print border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
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

        {/* Competency Proficiency Radar Chart */}
        <div className="mt-10">
          <div className="mb-4">
            <h3 className="text-sm font-semibold tracking-wide text-slate-900">
              {t.radarHeading}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{t.radarSubheading}</p>
          </div>

          <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-slate-200 bg-white lg:grid-cols-12">
            {/* Radar Canvas */}
            <div className="flex flex-col justify-between border-b border-slate-200 p-6 lg:col-span-7 lg:border-r lg:border-b-0">
              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="72%" data={COMPETENCY_DATA}>
                    <PolarGrid stroke="#CBD5E1" strokeDasharray="2 2" />
                    <PolarAngleAxis
                      dataKey="domain"
                      tick={{ fill: '#0F172A', fontSize: 12, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 5]}
                      tickCount={6}
                      tick={{ fill: '#64748B', fontSize: 10 }}
                      axisLine={false}
                    />
                    <Radar
                      name="Proficiency"
                      dataKey="level"
                      stroke="#0D9488"
                      strokeWidth={2}
                      fill="#0D9488"
                      fillOpacity={0.18}
                      dot={{ r: 4, fill: '#0D9488', strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: '#0F766E' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const entry = payload[0].payload as CompetencyAxis;
                        return (
                          <div className="rounded-md border border-slate-200 bg-slate-950 px-3 py-2 text-xs text-white shadow-md">
                            <div className="font-semibold">{entry.domain}</div>
                            <div className="mt-0.5 font-mono tabular-nums text-teal-300">
                              {entry.level.toFixed(1)} / 5.0 · {entry.tier}
                            </div>
                          </div>
                        );
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="border-t border-slate-100 pt-3 font-mono text-[11px] text-slate-500">
                {t.radarScaleNote}
              </div>
            </div>

            {/* Interactive Competency Inspector */}
            <div className="flex flex-col justify-between p-6 lg:col-span-5">
              <div className="divide-y divide-slate-100">
                {COMPETENCY_DATA.map((item) => {
                  const isActive = item.id === activeAxis.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      aria-pressed={isActive}
                      className={`flex w-full items-center justify-between gap-4 py-3 px-2 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                        isActive ? 'bg-slate-50' : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <div>
                        <div
                          className={`text-sm font-semibold ${
                            isActive ? 'text-teal-700' : 'text-slate-900'
                          }`}
                        >
                          {item.domain}
                        </div>
                        <div className="text-xs text-slate-500">{item.tier}</div>
                      </div>
                      <div className="font-mono text-sm font-semibold tabular-nums text-slate-900">
                        {item.level.toFixed(1)}
                        <span className="text-xs font-normal text-slate-400"> / 5</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                  {t.radarEvidenceLabel} · {activeAxis.domain}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                  {activeAxis.evidence}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core & Technical Skills */}
        <div className="mt-14">
          <h3 className="text-sm font-semibold tracking-wide text-slate-900">{t.skillsHeading}</h3>
          <div className="mt-5 grid grid-cols-1 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
            {skills.map((skill, idx) => (
              <div
                key={skill.id}
                className={`p-5 ${idx >= 3 ? 'lg:border-t lg:border-slate-200' : ''}`}
              >
                <div className="font-mono text-xs font-semibold text-teal-700">
                  {String(idx + 1).padStart(2, '0')} · {skill.category}
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">{skill.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-14">
          <h3 className="text-sm font-semibold tracking-wide text-slate-900">
            {t.certificationsHeading}
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-0 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white md:grid-cols-2">
            {certifications.map((cert, idx) => (
              <div key={cert.id} className="flex items-start gap-4 p-5">
                <span className="font-mono text-xs font-semibold tabular-nums text-slate-400 pt-0.5">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold leading-snug text-slate-950">
                    {cert.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">
                    {cert.issuer}
                    {cert.detail ? ` · ${cert.detail}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership & Languages */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.membershipHeading}
            </h3>
            <p className="mt-2 text-base font-semibold text-slate-950">{membership}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.languagesHeading}
            </h3>
            <p className="mt-2 text-base font-semibold text-slate-950">
              {languagesSpoken.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
