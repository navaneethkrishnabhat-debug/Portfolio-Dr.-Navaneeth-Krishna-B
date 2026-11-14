import { Download, Plus, RotateCcw, Save, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UiDictionary } from '../data/translations';
import {
  ExperienceCategory,
  InquiryItem,
  PortfolioData,
  PublicationCategory,
} from '../types/portfolio';
import { loadInquiries, removeInquiry } from '../utils/portfolioStorage';

interface CmsDrawerProps {
  open: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (updated: PortfolioData) => Promise<void>;
  onReset: () => Promise<void>;
  t: UiDictionary['cms'];
}

type CmsTab =
  | 'profile'
  | 'experiences'
  | 'publications'
  | 'conferences'
  | 'projects'
  | 'credentials'
  | 'inbox';

export function CmsDrawer({ open, onClose, data, onSave, onReset, t }: CmsDrawerProps) {
  const [activeTab, setActiveTab] = useState<CmsTab>('profile');
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loadingInbox, setLoadingInbox] = useState(false);

  useEffect(() => {
    setDraft(data);
  }, [data, open]);

  useEffect(() => {
    if (!open || activeTab !== 'inbox') return;
    setLoadingInbox(true);
    loadInquiries()
      .then((items) => setInquiries(items))
      .catch(() => setInquiries([]))
      .finally(() => setLoadingInbox(false));
  }, [open, activeTab]);

  if (!open) return null;

  const handleSaveClick = async () => {
    setSaving(true);
    setStatusMsg(null);
    try {
      await onSave(draft);
      setStatusMsg(t.savedSuccess);
      window.setTimeout(() => setStatusMsg(null), 2500);
    } catch {
      setStatusMsg('Error saving changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'navaneeth-portfolio-cms.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteInquiry = async (id: string) => {
    await removeInquiry(id);
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const tabs: { key: CmsTab; label: string }[] = [
    { key: 'profile', label: t.tabs.profile },
    { key: 'experiences', label: t.tabs.experiences },
    { key: 'publications', label: t.tabs.publications },
    { key: 'conferences', label: t.tabs.conferences },
    { key: 'projects', label: t.tabs.projects },
    { key: 'credentials', label: t.tabs.credentials },
    { key: 'inbox', label: t.tabs.inbox },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      className="no-print fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs"
    >
      <div className="flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="font-display text-xl font-semibold text-slate-950">{t.title}</h2>
            <p className="mt-1 text-xs text-slate-500">{t.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 px-6 py-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={draft.profile.name}
                    onChange={(e) =>
                      setDraft({ ...draft, profile: { ...draft.profile, name: e.target.value } })
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">Location</label>
                  <input
                    type="text"
                    value={draft.profile.location}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        profile: { ...draft.profile, location: e.target.value },
                      })
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    value={draft.profile.email}
                    onChange={(e) =>
                      setDraft({ ...draft, profile: { ...draft.profile, email: e.target.value } })
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={draft.profile.phone}
                    onChange={(e) =>
                      setDraft({ ...draft, profile: { ...draft.profile, phone: e.target.value } })
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Profile Summary (English)
                </label>
                <textarea
                  rows={4}
                  value={draft.profile.summary.en}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      profile: {
                        ...draft.profile,
                        summary: { ...draft.profile.summary, en: e.target.value },
                      },
                    })
                  }
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="border-t border-slate-200 pt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Research Metrics
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700">Articles</label>
                    <input
                      type="number"
                      value={draft.metrics.articles}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          metrics: { ...draft.metrics, articles: Number(e.target.value) || 0 },
                        })
                      }
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">Citations</label>
                    <input
                      type="number"
                      value={draft.metrics.citations}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          metrics: { ...draft.metrics, citations: Number(e.target.value) || 0 },
                        })
                      }
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">H-Index</label>
                    <input
                      type="number"
                      value={draft.metrics.hIndex}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          metrics: { ...draft.metrics, hIndex: Number(e.target.value) || 0 },
                        })
                      }
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">PharmD Score</label>
                    <input
                      type="text"
                      value={draft.metrics.pharmdPercentage}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          metrics: { ...draft.metrics, pharmdPercentage: e.target.value },
                        })
                      }
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experiences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  Experiences ({draft.experiences.length})
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      experiences: [
                        {
                          id: `exp-${Date.now()}`,
                          role: 'New Role',
                          organization: 'Institution Name',
                          location: 'City, India',
                          period: '2026',
                          category: 'Clinical',
                          highlights: ['Key clinical or research responsibility.'],
                        },
                        ...draft.experiences,
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              {draft.experiences.map((exp, idx) => (
                <div key={exp.id} className="space-y-3 rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-slate-500">#{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          experiences: draft.experiences.filter((item) => item.id !== exp.id),
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs text-rose-600 hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={exp.role}
                      placeholder="Role"
                      onChange={(e) => {
                        const next = [...draft.experiences];
                        next[idx] = { ...exp, role: e.target.value };
                        setDraft({ ...draft, experiences: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={exp.organization}
                      placeholder="Organization"
                      onChange={(e) => {
                        const next = [...draft.experiences];
                        next[idx] = { ...exp, organization: e.target.value };
                        setDraft({ ...draft, experiences: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={exp.period}
                      placeholder="Period"
                      onChange={(e) => {
                        const next = [...draft.experiences];
                        next[idx] = { ...exp, period: e.target.value };
                        setDraft({ ...draft, experiences: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    />
                    <select
                      value={exp.category}
                      onChange={(e) => {
                        const next = [...draft.experiences];
                        next[idx] = { ...exp, category: e.target.value as ExperienceCategory };
                        setDraft({ ...draft, experiences: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    >
                      <option value="Clinical">Clinical</option>
                      <option value="Research">Research</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                  <textarea
                    rows={3}
                    value={exp.highlights.join('\n')}
                    onChange={(e) => {
                      const next = [...draft.experiences];
                      next[idx] = {
                        ...exp,
                        highlights: e.target.value.split('\n').filter(Boolean),
                      };
                      setDraft({ ...draft, experiences: next });
                    }}
                    placeholder="One responsibility per line"
                    className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'publications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  Publications ({draft.publications.length})
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      publications: [
                        {
                          id: `pub-${Date.now()}`,
                          title: 'New Peer-Reviewed Article Title',
                          journal: 'Journal Name',
                          indexing: 'Peer-Reviewed Journal Article',
                          category: 'Clinical & Pharmacology',
                        },
                        ...draft.publications,
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Publication</span>
                </button>
              </div>

              {draft.publications.map((pub, idx) => (
                <div key={pub.id} className="space-y-3 rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-500">#{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          publications: draft.publications.filter((item) => item.id !== pub.id),
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs text-rose-600 hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={pub.title}
                    onChange={(e) => {
                      const next = [...draft.publications];
                      next[idx] = { ...pub, title: e.target.value };
                      setDraft({ ...draft, publications: next });
                    }}
                    className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <input
                      type="text"
                      value={pub.journal}
                      placeholder="Journal"
                      onChange={(e) => {
                        const next = [...draft.publications];
                        next[idx] = { ...pub, journal: e.target.value };
                        setDraft({ ...draft, publications: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs"
                    />
                    <input
                      type="text"
                      value={pub.indexing}
                      placeholder="Indexing"
                      onChange={(e) => {
                        const next = [...draft.publications];
                        next[idx] = { ...pub, indexing: e.target.value };
                        setDraft({ ...draft, publications: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs"
                    />
                    <select
                      value={pub.category}
                      onChange={(e) => {
                        const next = [...draft.publications];
                        next[idx] = { ...pub, category: e.target.value as PublicationCategory };
                        setDraft({ ...draft, publications: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs"
                    >
                      <option value="Systematic Review Protocol">Systematic Review Protocol</option>
                      <option value="Clinical & Pharmacology">Clinical & Pharmacology</option>
                      <option value="Formulation & Phytochemistry">
                        Formulation & Phytochemistry
                      </option>
                      <option value="Medicinal Chemistry">Medicinal Chemistry</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'conferences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  Conferences ({draft.conferences.length})
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      conferences: [
                        {
                          id: `conf-${Date.now()}`,
                          title: 'New Conference Presentation',
                          event: 'Conference Name',
                          year: '2026',
                          location: 'India',
                          type: 'Presentation',
                        },
                        ...draft.conferences,
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Presentation</span>
                </button>
              </div>

              {draft.conferences.map((conf, idx) => (
                <div key={conf.id} className="space-y-3 rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-500">#{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          conferences: draft.conferences.filter((item) => item.id !== conf.id),
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs text-rose-600 hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={conf.title}
                    onChange={(e) => {
                      const next = [...draft.conferences];
                      next[idx] = { ...conf, title: e.target.value };
                      setDraft({ ...draft, conferences: next });
                    }}
                    className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <input
                      type="text"
                      value={conf.event}
                      placeholder="Event"
                      onChange={(e) => {
                        const next = [...draft.conferences];
                        next[idx] = { ...conf, event: e.target.value };
                        setDraft({ ...draft, conferences: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs"
                    />
                    <input
                      type="text"
                      value={conf.year}
                      placeholder="Year"
                      onChange={(e) => {
                        const next = [...draft.conferences];
                        next[idx] = { ...conf, year: e.target.value };
                        setDraft({ ...draft, conferences: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs"
                    />
                    <input
                      type="text"
                      value={conf.award ?? ''}
                      placeholder="Award (optional)"
                      onChange={(e) => {
                        const next = [...draft.conferences];
                        next[idx] = { ...conf, award: e.target.value || undefined };
                        setDraft({ ...draft, conferences: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">
                  Research Projects ({draft.projects.length})
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      projects: [
                        ...draft.projects,
                        {
                          id: `proj-${Date.now()}`,
                          program: 'Research Study',
                          title: 'New Research Project Title',
                          duration: '2026',
                          tools: 'Excel · SPSS',
                          highlights: ['Study methodology and findings.'],
                        },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {draft.projects.map((proj, idx) => (
                <div key={proj.id} className="space-y-3 rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-500">#{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          projects: draft.projects.filter((item) => item.id !== proj.id),
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs text-rose-600 hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={proj.program}
                      onChange={(e) => {
                        const next = [...draft.projects];
                        next[idx] = { ...proj, program: e.target.value };
                        setDraft({ ...draft, projects: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={proj.duration}
                      onChange={(e) => {
                        const next = [...draft.projects];
                        next[idx] = { ...proj, duration: e.target.value };
                        setDraft({ ...draft, projects: next });
                      }}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => {
                      const next = [...draft.projects];
                      next[idx] = { ...proj, title: e.target.value };
                      setDraft({ ...draft, projects: next });
                    }}
                    className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={proj.tools}
                    onChange={(e) => {
                      const next = [...draft.projects];
                      next[idx] = { ...proj, tools: e.target.value };
                      setDraft({ ...draft, projects: next });
                    }}
                    className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'credentials' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Skills ({draft.skills.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        skills: [
                          ...draft.skills,
                          {
                            id: `skill-${Date.now()}`,
                            category: 'New Competency',
                            details: 'Description of tools and capabilities',
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-md bg-teal-600 px-2.5 py-1 text-xs font-semibold text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Skill</span>
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {draft.skills.map((sk, idx) => (
                    <div key={sk.id} className="grid grid-cols-1 gap-2 sm:grid-cols-12">
                      <input
                        type="text"
                        value={sk.category}
                        onChange={(e) => {
                          const next = [...draft.skills];
                          next[idx] = { ...sk, category: e.target.value };
                          setDraft({ ...draft, skills: next });
                        }}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium sm:col-span-4"
                      />
                      <input
                        type="text"
                        value={sk.details}
                        onChange={(e) => {
                          const next = [...draft.skills];
                          next[idx] = { ...sk, details: e.target.value };
                          setDraft({ ...draft, skills: next });
                        }}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-xs sm:col-span-7"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            skills: draft.skills.filter((item) => item.id !== sk.id),
                          })
                        }
                        aria-label="Remove skill"
                        className="inline-flex items-center justify-center rounded-md border border-slate-200 text-rose-600 hover:bg-rose-50 sm:col-span-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Certifications ({draft.certifications.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        certifications: [
                          ...draft.certifications,
                          {
                            id: `cert-${Date.now()}`,
                            title: 'New Certification Title',
                            issuer: 'Issuing Organization',
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-md bg-teal-600 px-2.5 py-1 text-xs font-semibold text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Certification</span>
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {draft.certifications.map((cert, idx) => (
                    <div key={cert.id} className="grid grid-cols-1 gap-2 sm:grid-cols-12">
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => {
                          const next = [...draft.certifications];
                          next[idx] = { ...cert, title: e.target.value };
                          setDraft({ ...draft, certifications: next });
                        }}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-xs sm:col-span-7"
                      />
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => {
                          const next = [...draft.certifications];
                          next[idx] = { ...cert, issuer: e.target.value };
                          setDraft({ ...draft, certifications: next });
                        }}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-xs sm:col-span-4"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            certifications: draft.certifications.filter(
                              (item) => item.id !== cert.id
                            ),
                          })
                        }
                        aria-label="Remove certification"
                        className="inline-flex items-center justify-center rounded-md border border-slate-200 text-rose-600 hover:bg-rose-50 sm:col-span-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Recruiter & Collaboration Inquiries ({inquiries.length})
              </h3>
              {loadingInbox ? (
                <p className="text-sm text-slate-500">Loading inquiries...</p>
              ) : inquiries.length === 0 ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                  No inquiries submitted yet. Messages submitted via the Contact form will appear
                  here.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="rounded-lg border border-slate-200 bg-white p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-950">{inq.name}</div>
                          <div className="mt-0.5 text-xs text-slate-500">
                            {inq.organization ? `${inq.organization} · ` : ''}
                            {inq.email} · {inq.inquiryType}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{inq.message}</p>
                      <div className="mt-2 font-mono text-[11px] text-slate-400">
                        {new Date(inq.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{t.exportJson}</span>
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.resetDefaults}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {statusMsg && <span className="text-xs font-medium text-teal-700">{statusMsg}</span>}
            {activeTab !== 'inbox' && (
              <button
                type="button"
                disabled={saving}
                onClick={handleSaveClick}
                className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? t.saving : t.saveChanges}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
