export type Locale = 'en' | 'kn' | 'hi';

export interface LocalizedText {
  en: string;
  kn?: string;
  hi?: string;
}

export interface ProfileData {
  name: string;
  credentialLine: string;
  location: string;
  phone: string;
  email: string;
  linkedinHandle: string;
  linkedinUrl: string;
  photoUrl: string;
  cvPdfUrl: string;
  onePageCvPdfUrl: string;
  tagline: LocalizedText;
  subtitle: LocalizedText;
  summary: LocalizedText;
  membership: string;
  languagesSpoken: string[];
}

export interface ResearchMetrics {
  articles: number;
  citations: number;
  hIndex: number;
  pharmdPercentage: string;
  researchOutputSummary?: string;
  underPeerReview?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  score: string;
  highlights: string;
}

export interface ResearchProjectItem {
  id: string;
  program: string;
  title: string;
  duration: string;
  tools: string;
  highlights: string[];
}

export interface ConferenceItem {
  id: string;
  title: string;
  event: string;
  year: string;
  location: string;
  award?: string;
  type: string;
}

export type PublicationCategory =
  | 'Systematic Review Protocol'
  | 'Clinical & Pharmacology'
  | 'Formulation & Phytochemistry'
  | 'Medicinal Chemistry';

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  indexing: string;
  category: PublicationCategory;
}

export type ExperienceCategory = 'Clinical' | 'Research' | 'Industrial';

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  category: ExperienceCategory;
  departments?: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  detail?: string;
}

export interface SkillCategoryItem {
  id: string;
  category: string;
  details: string;
}

export interface PortfolioData {
  profile: ProfileData;
  metrics: ResearchMetrics;
  education: EducationItem[];
  projects: ResearchProjectItem[];
  conferences: ConferenceItem[];
  publications: PublicationItem[];
  experiences: ExperienceItem[];
  certifications: CertificationItem[];
  skills: SkillCategoryItem[];
  updatedAt: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  organization: string;
  email: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}
