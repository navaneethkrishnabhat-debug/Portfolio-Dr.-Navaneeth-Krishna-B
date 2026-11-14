import { Locale, PortfolioData } from '../types/portfolio';

interface PrintCvViewProps {
  data: PortfolioData;
  locale: Locale;
}

export function PrintCvView({ data, locale }: PrintCvViewProps) {
  const { profile, metrics, education, projects, conferences, publications, experiences, certifications, skills } =
    data;

  return (
    <div className="hidden print:block p-8 text-slate-900 max-w-4xl mx-auto text-[11pt] leading-snug">
      <header className="border-b-2 border-slate-900 pb-4">
        <h1 className="font-display text-2xl font-bold uppercase tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-sm font-medium text-slate-700">{profile.credentialLine}</p>
        <p className="mt-1 text-xs text-slate-600">
          {profile.location} · {profile.phone} · {profile.email} · linkedin.com/in/
          {profile.linkedinHandle}
        </p>
      </header>

      <section className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
          Profile
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-800">
          {profile.summary[locale] || profile.summary.en}
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
          Education
        </h2>
        <div className="mt-2 space-y-1.5 text-xs">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between">
              <span>
                <strong>{edu.degree}</strong> · {edu.institution}
              </span>
              <span className="font-mono">
                {edu.year} · {edu.score}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
          Professional Experience
        </h2>
        <div className="mt-2 space-y-3 text-xs">
          {experiences.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between font-semibold">
                <span>
                  {exp.role} — {exp.organization} ({exp.location})
                </span>
                <span className="font-mono">{exp.period}</span>
              </div>
              <ul className="mt-1 list-disc pl-5 space-y-0.5 text-slate-800">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
          Research Projects
        </h2>
        <div className="mt-2 space-y-2.5 text-xs">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between font-semibold">
                <span>
                  {proj.program}: {proj.title}
                </span>
                <span className="font-mono">{proj.duration}</span>
              </div>
              <ul className="mt-1 list-disc pl-5 space-y-0.5 text-slate-800">
                {proj.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
          Publications ({metrics.articles} Articles · {metrics.citations} Citations · H-Index:{' '}
          {metrics.hIndex})
        </h2>
        <ol className="mt-2 list-decimal pl-5 space-y-1 text-xs text-slate-800">
          {publications.map((pub) => (
            <li key={pub.id}>
              “{pub.title}” — <em>{pub.journal}</em> ({pub.indexing})
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
          Conference Presentations
        </h2>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-xs text-slate-800">
          {conferences.map((conf) => (
            <li key={conf.id}>
              <strong>{conf.year}:</strong> {conf.title} ({conf.event}, {conf.location})
              {conf.award ? ` — ${conf.award}` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
          Certifications
        </h2>
        <ul className="mt-2 list-disc pl-5 space-y-0.5 text-xs text-slate-800">
          {certifications.map((cert) => (
            <li key={cert.id}>
              {cert.title} — {cert.issuer}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
          Core & Technical Skills
        </h2>
        <div className="mt-2 space-y-1 text-xs text-slate-800">
          {skills.map((sk) => (
            <div key={sk.id}>
              <strong>{sk.category}:</strong> {sk.details}
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-4 border-t border-slate-300 pt-2 text-xs text-slate-700">
        <strong>Professional Membership:</strong> {profile.membership} ·{' '}
        <strong>Languages:</strong> {profile.languagesSpoken.join(', ')}
      </footer>
    </div>
  );
}
