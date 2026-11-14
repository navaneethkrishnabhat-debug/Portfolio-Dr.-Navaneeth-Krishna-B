import { Locale } from '../types/portfolio';

export interface UiDictionary {
  nav: {
    experience: string;
    research: string;
    publications: string;
    credentials: string;
    contact: string;
    downloadCv: string;
  };
  hero: {
    contactMe: string;
    printCv: string;
    downloadOnePagePdf: string;
    downloadOriginalPdf: string;
    editCms: string;
    languageLabel: string;
    portraitCaption: string;
  };
  metrics: {
    articlesLabel: string;
    articlesContext: string;
    citationsLabel: string;
    citationsContext: string;
    hIndexLabel: string;
    hIndexContext: string;
    pharmdLabel: string;
    pharmdContext: string;
  };
  timeline: {
    eyebrow: string;
    heading: string;
    subheading: string;
    filters: {
      all: string;
      clinical: string;
      research: string;
      industrial: string;
      education: string;
    };
    educationHeading: string;
    experienceHeading: string;
    presentLabel: string;
  };
  research: {
    eyebrow: string;
    heading: string;
    subheading: string;
    projectsHeading: string;
    conferencesHeading: string;
    toolsLabel: string;
  };
  publications: {
    eyebrow: string;
    heading: string;
    subheading: string;
    searchPlaceholder: string;
    allCategories: string;
    copyCitation: string;
    copied: string;
    emptyState: string;
  };
  credentials: {
    eyebrow: string;
    heading: string;
    subheading: string;
    skillsHeading: string;
    radarHeading: string;
    radarSubheading: string;
    radarScaleNote: string;
    radarEvidenceLabel: string;
    certificationsHeading: string;
    membershipHeading: string;
    languagesHeading: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    subheading: string;
    directTitle: string;
    copyEmail: string;
    emailCopied: string;
    phoneLabel: string;
    locationLabel: string;
    linkedinLabel: string;
    availabilityNote: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    orgLabel: string;
    orgPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    focusLabel: string;
    focusOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submittingButton: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    validationError: string;
  };
  footer: {
    rights: string;
    manageCms: string;
    downloadOnePagePdf: string;
    downloadPdf: string;
    printSheet: string;
  };
  cms: {
    title: string;
    subtitle: string;
    close: string;
    saveChanges: string;
    saving: string;
    savedSuccess: string;
    exportJson: string;
    resetDefaults: string;
    tabs: {
      profile: string;
      experiences: string;
      publications: string;
      conferences: string;
      projects: string;
      credentials: string;
      inbox: string;
    };
  };
}

export const TRANSLATIONS: Record<Locale, UiDictionary> = {
  en: {
    nav: {
      experience: 'Experience',
      research: 'Research',
      publications: 'Publications',
      credentials: 'Credentials',
      contact: 'Contact',
      downloadCv: 'Download CV',
    },
    hero: {
      contactMe: 'Contact & Recruit',
      printCv: 'Print Formatted CV',
      downloadOnePagePdf: '1-Page Resume (PDF)',
      downloadOriginalPdf: '4-Page Full CV (PDF)',
      editCms: 'Edit Portfolio CMS',
      languageLabel: 'Language',
      portraitCaption: 'Dr. Navaneeth Krishna B · PharmD (PB), B.Pharm',
    },
    metrics: {
      articlesLabel: 'Published Works',
      articlesContext: '12 Research · 5 Reviews · 3 Case Series · 2 Case Reports · 2 Systematic Reviews',
      citationsLabel: 'Academic Citations',
      citationsContext: 'Indexed Scholarly Impact',
      hIndexLabel: 'H-Index',
      hIndexContext: 'Research Citation Depth',
      pharmdLabel: 'PharmD (PB) Aggregate',
      pharmdContext: 'Srinivas College of Pharmacy (2024–2026)',
    },
    timeline: {
      eyebrow: 'Clinical & Academic Chronology',
      heading: 'Experience & Education',
      subheading:
        'Hospital pharmacy practice, pharmacovigilance, scholarly editorial training, and GLP analytical quality systems.',
      filters: {
        all: 'All Milestones',
        clinical: 'Clinical Pharmacy',
        research: 'Research Training',
        industrial: 'Industrial QA/QC',
        education: 'Education',
      },
      educationHeading: 'Academic Qualifications',
      experienceHeading: 'Professional Experience',
      presentLabel: 'Present',
    },
    research: {
      eyebrow: 'Empirical Investigations & Honors',
      heading: 'Research Projects & Conferences',
      subheading:
        'Retrospective hospital outcome analytics, phytochemical antibacterial screening, and national/international scientific presentations.',
      projectsHeading: 'Core Academic Research Projects',
      conferencesHeading: 'Conference Presentations & Awards',
      toolsLabel: 'Methodology & Tools',
    },
    publications: {
      eyebrow: 'Peer-Reviewed Literature',
      heading: 'Research & Publications',
      subheading:
        'Authored 8 peer-reviewed articles and systematic review protocols spanning clinical pharmacotherapy, rare syndromes, medicinal chemistry, and herbal formulations.',
      searchPlaceholder: 'Filter by title, syndrome, drug, or journal...',
      allCategories: 'All Works',
      copyCitation: 'Copy Citation',
      copied: 'Copied',
      emptyState: 'No publications match your current filter.',
    },
    credentials: {
      eyebrow: 'Competencies & Compliance',
      heading: 'Skills, Certifications & Licensure',
      subheading:
        'Cross-functional mastery spanning bedside medication safety, statistical tools (SPSS, R, Excel), ICH/GMP/GCP frameworks, and AI-enabled research.',
      skillsHeading: 'Core & Technical Skills',
      radarHeading: 'Competency Proficiency Matrix',
      radarSubheading:
        'Calibrated against hospital clinical rotations, LSSSDC/NIDA/IMWA certifications, regulatory SOP exposure, and peer-reviewed publications.',
      radarScaleNote: 'Scale 1–5 · 1 Foundational · 3 Proficient · 5 Applied Clinical & Research Practice',
      radarEvidenceLabel: 'Verified CV Evidence',
      certificationsHeading: 'Verified Certifications',
      membershipHeading: 'Professional Registration',
      languagesHeading: 'Languages Spoken',
    },
    contact: {
      eyebrow: 'Recruitment & Collaboration',
      heading: 'Initiate a Conversation',
      subheading:
        'Open to opportunities across Clinical Pharmacy, Pharmacovigilance, Clinical Research (CRO), Regulatory Affairs, and Quality Assurance.',
      directTitle: 'Direct Coordinates',
      copyEmail: 'Copy Email',
      emailCopied: 'Email Copied',
      phoneLabel: 'Phone',
      locationLabel: 'Location',
      linkedinLabel: 'LinkedIn Profile',
      availabilityNote:
        'Available for Clinical Pharmacist, Drug Safety Associate (PV), Clinical Research Coordinator/Associate, and Regulatory Affairs roles.',
      formTitle: 'Recruiter & Collaboration Inquiry',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g., Priya Nair, Talent Acquisition',
      orgLabel: 'Organization / Hospital / CRO',
      orgPlaceholder: 'e.g., Syneos Health, Narayana Health',
      emailLabel: 'Work Email',
      emailPlaceholder: 'name@organization.com',
      focusLabel: 'Role or Inquiry Focus',
      focusOptions: [
        'Pharmacovigilance & Drug Safety',
        'Clinical Pharmacy Practice',
        'Clinical Research / CRO',
        'Regulatory Affairs & QA/QC',
        'Research Collaboration / Medical Writing',
      ],
      messageLabel: 'Message',
      messagePlaceholder: 'Share role details, interview availability, or research collaboration scope...',
      submitButton: 'Send Inquiry',
      submittingButton: 'Sending...',
      successTitle: 'Inquiry Recorded',
      successBody:
        'Thank you for reaching out. Your message has been saved to Dr. Navaneeth Krishna B’s portfolio inbox.',
      sendAnother: 'Send Another Message',
      validationError: 'Please complete your name, valid email address, and message.',
    },
    footer: {
      rights: 'Dr. Navaneeth Krishna B · PharmD (Post-Baccalaureate), B.Pharm · Yekkur, Mangalore, India',
      manageCms: 'Manage Portfolio CMS',
      downloadOnePagePdf: '1-Page Resume (PDF)',
      downloadPdf: '4-Page Full CV (PDF)',
      printSheet: 'Print CV',
    },
    cms: {
      title: 'Portfolio CMS & Recruiter Inbox',
      subtitle: 'Edit collections directly, export Webflow-compatible JSON, or review incoming inquiries.',
      close: 'Close',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      savedSuccess: 'Saved to server',
      exportJson: 'Export CMS JSON',
      resetDefaults: 'Reset to CV Baseline',
      tabs: {
        profile: 'Profile & Metrics',
        experiences: 'Experiences',
        publications: 'Publications',
        conferences: 'Conferences',
        projects: 'Projects',
        credentials: 'Skills & Certs',
        inbox: 'Recruiter Inbox',
      },
    },
  },
  kn: {
    nav: {
      experience: 'ಅನುಭವ',
      research: 'ಸಂಶೋಧನೆ',
      publications: 'ಪ್ರಕಟಣೆಗಳು',
      credentials: 'ಪ್ರಮಾಣಪತ್ರಗಳು',
      contact: 'ಸಂಪರ್ಕಿಸಿ',
      downloadCv: 'CV ಡೌನ್‌ಲೋಡ್',
    },
    hero: {
      contactMe: 'ಸಂಪರ್ಕಿಸಿ ಮತ್ತು ನೇಮಕಾತಿ',
      printCv: 'CV ಮುದ್ರಿಸಿ',
      downloadOnePagePdf: '1-ಪುಟದ ರೆಸ್ಯೂಮ್ (PDF)',
      downloadOriginalPdf: '4-ಪುಟಗಳ ಪೂರ್ಣ CV (PDF)',
      editCms: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೋ CMS ಸಂಪಾದಿಸಿ',
      languageLabel: 'ಭಾಷೆ',
      portraitCaption: 'ಡಾ. ನವನೀತ್ ಕೃಷ್ಣ ಬಿ · ಫಾರ್ಮ್.ಡಿ (PB), ಬಿ.ಫಾರ್ಮ್',
    },
    metrics: {
      articlesLabel: 'ಪ್ರಕಟಿತ ಸಂಶೋಧನಾ ಕೃತಿಗಳು',
      articlesContext: '12 ಸಂಶೋಧನೆ · 5 ವಿಮರ್ಶೆ · 3 ಕೇಸ್ ಸೀರೀಸ್ · 2 ಕೇಸ್ ರಿಪೋರ್ಟ್ · 2 ವ್ಯವಸ್ಥಿತ ವಿಮರ್ಶೆ',
      citationsLabel: 'ಶೈಕ್ಷಣಿಕ ಉಲ್ಲೇಖಗಳು',
      citationsContext: 'ಸೂಚ್ಯಂಕಿತ ಸಂಶೋಧನಾ ಪ್ರಭಾವ',
      hIndexLabel: 'H-ಸೂಚ್ಯಂಕ',
      hIndexContext: 'ಸಂಶೋಧನಾ ಉಲ್ಲೇಖದ ಆಳ',
      pharmdLabel: 'ಫಾರ್ಮ್.ಡಿ (PB) ಶೇಕಡಾವಾರು',
      pharmdContext: 'ಶ್ರೀನಿವಾಸ್ ಕಾಲೇಜ್ ಆಫ್ ಫಾರ್ಮಸಿ (2024–2026)',
    },
    timeline: {
      eyebrow: 'ಕ್ಲಿನಿಕಲ್ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಇತಿಹಾಸ',
      heading: 'ವೃತ್ತಿಪರ ಅನುಭವ ಮತ್ತು ಶಿಕ್ಷಣ',
      subheading:
        'ಆಸ್ಪತ್ರೆ ಫಾರ್ಮಸಿ ಅಭ್ಯಾಸ, ಫಾರ್ಮಕೋವಿಜಿಲೆನ್ಸ್, ವೈಜ್ಞಾನಿಕ ಸಂಪಾದಕೀಯ ತರಬೇತಿ ಮತ್ತು GLP ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಗುಣಮಟ್ಟ ವ್ಯವಸ್ಥೆಗಳು.',
      filters: {
        all: 'ಎಲ್ಲಾ ಹಂತಗಳು',
        clinical: 'ಕ್ಲಿನಿಕಲ್ ಫಾರ್ಮಸಿ',
        research: 'ಸಂಶೋಧನಾ ತರಬೇತಿ',
        industrial: 'ಕೈಗಾರಿಕಾ QA/QC',
        education: 'ಶಿಕ್ಷಣ',
      },
      educationHeading: 'ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆಗಳು',
      experienceHeading: 'ವೃತ್ತಿಪರ ಅನುಭವ',
      presentLabel: 'ಪ್ರಸ್ತುತ',
    },
    research: {
      eyebrow: 'ವೈಜ್ಞಾನಿಕ ಅಧ್ಯಯನಗಳು ಮತ್ತು ಗೌರವಗಳು',
      heading: 'ಸಂಶೋಧನಾ ಯೋಜನೆಗಳು ಮತ್ತು ಸಮ್ಮೇಳನಗಳು',
      subheading:
        'ಹಿಂದಿನ ಆಸ್ಪತ್ರೆ ದತ್ತಾಂಶ ವಿಶ್ಲೇಷಣೆ, ಫೈಟೊಕೆಮಿಕಲ್ ಆಂಟಿಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಪರೀಕ್ಷೆ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ/ಅಂತರರಾಷ್ಟ್ರೀಯ ಸಮ್ಮೇಳನ ಪ್ರಸ್ತುತಿಗಳು.',
      projectsHeading: 'ಪ್ರಮುಖ ಶೈಕ್ಷಣಿಕ ಸಂಶೋಧನಾ ಯೋಜನೆಗಳು',
      conferencesHeading: 'ಸಮ್ಮೇಳನ ಪ್ರಸ್ತುತಿಗಳು ಮತ್ತು ಪ್ರಶಸ್ತಿಗಳು',
      toolsLabel: 'ವಿಧಾನ ಮತ್ತು ಸಾಧನಗಳು',
    },
    publications: {
      eyebrow: 'ಪೀರ್-ರಿವ್ಯೂಡ್ ವೈಜ್ಞಾನಿಕ ಸಾಹಿತ್ಯ',
      heading: 'ಸಂಶೋಧನೆ ಮತ್ತು ಪ್ರಕಟಣೆಗಳು',
      subheading:
        'ಕ್ಲಿನಿಕಲ್ ಫಾರ್ಮಕೋಥೆರಪಿ, ಅಪರೂಪದ ಸಿಂಡ್ರೋಮ್‌ಗಳು, ಔಷಧೀಯ ರಸಾಯನಶಾಸ್ತ್ರ ಮತ್ತು ಗಿಡಮೂಲಿಕೆ ಸೂತ್ರೀಕರಣಗಳಲ್ಲಿ 8 ಪೀರ್-ರಿವ್ಯೂಡ್ ಲೇಖನಗಳು ಮತ್ತು ಪ್ರೋಟೋಕಾಲ್‌ಗಳು.',
      searchPlaceholder: 'ಶೀರ್ಷಿಕೆ, ಜರ್ನಲ್ ಅಥವಾ ವಿಷಯದ ಮೂಲಕ ಹುಡುಕಿ...',
      allCategories: 'ಎಲ್ಲಾ ಪ್ರಕಟಣೆಗಳು',
      copyCitation: 'ಉಲ್ಲೇಖ ನಕಲಿಸಿ',
      copied: 'ನಕಲಿಸಲಾಗಿದೆ',
      emptyState: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಪ್ರಕಟಣೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    },
    credentials: {
      eyebrow: 'ಸಾಮರ್ಥ್ಯ ಮತ್ತು ನಿಯಂತ್ರಣ ಅನುಸರಣೆ',
      heading: 'ಕೌಶಲ್ಯಗಳು, ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ನೋಂದಣಿ',
      subheading:
        'ರೋಗಿಗಳ ಔಷಧ ಸುರಕ್ಷತೆ, ಸಂಖ್ಯಾಶಾಸ್ತ್ರೀಯ ಸಾಧನಗಳು (SPSS, R, Excel), ICH/GMP/GCP ಚೌಕಟ್ಟುಗಳು ಮತ್ತು AI-ಆಧಾರಿತ ಸಂಶೋಧನೆಯಲ್ಲಿ ಪರಿಣತಿ.',
      skillsHeading: 'ಮುಖ್ಯ ಮತ್ತು ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯಗಳು',
      radarHeading: 'ಸಾಮರ್ಥ್ಯದ ಪ್ರಾವೀಣ್ಯತೆ ಮ್ಯಾಟ್ರಿಕ್ಸ್',
      radarSubheading:
        'ಆಸ್ಪತ್ರೆ ಕ್ಲಿನಿಕಲ್ ತರಬೇತಿ, LSSSDC/NIDA/IMWA ಪ್ರಮಾಣಪತ್ರಗಳು, ನಿಯಂತ್ರಣ SOP ಅನುಭವ ಮತ್ತು ಪ್ರಕಟಿತ ಸಂಶೋಧನೆಗಳ ಆಧಾರದ ಮೇಲೆ ಮೌಲ್ಯಮಾಪನ.',
      radarScaleNote: 'ಪ್ರಮಾಣ 1–5 · 1 ಮೂಲಭೂತ · 3 ಪ್ರಾವೀಣ್ಯ · 5 ಪ್ರಾಯೋಗಿಕ ಕ್ಲಿನಿಕಲ್ ಮತ್ತು ಸಂಶೋಧನಾ ಅಭ್ಯಾಸ',
      radarEvidenceLabel: 'ಪರಿಶೀಲಿಸಿದ CV ಪುರಾವೆ',
      certificationsHeading: 'ಪರಿಶೀಲಿಸಿದ ಪ್ರಮಾಣಪತ್ರಗಳು',
      membershipHeading: 'ವೃತ್ತಿಪರ ನೋಂದಣಿ',
      languagesHeading: 'ತಿಳಿದಿರುವ ಭಾಷೆಗಳು',
    },
    contact: {
      eyebrow: 'ನೇಮಕಾತಿ ಮತ್ತು ಸಹಯೋಗ',
      heading: 'ಸಂಪರ್ಕ ಪ್ರಾರಂಭಿಸಿ',
      subheading:
        'ಕ್ಲಿನಿಕಲ್ ಫಾರ್ಮಸಿ, ಫಾರ್ಮಕೋವಿಜಿಲೆನ್ಸ್, ಕ್ಲಿನಿಕಲ್ ರಿಸರ್ಚ್ (CRO), ನಿಯಂತ್ರಣ ವ್ಯವಹಾರಗಳು (Regulatory Affairs) ಮತ್ತು ಗುಣಮಟ್ಟ ಭರವಸೆ (QA) ಅವಕಾಶಗಳಿಗೆ ಲಭ್ಯವಿದೆ.',
      directTitle: 'ನೇರ ಸಂಪರ್ಕ ವಿವರಗಳು',
      copyEmail: 'ಇಮೇಲ್ ನಕಲಿಸಿ',
      emailCopied: 'ಇಮೇಲ್ ನಕಲಿಸಲಾಗಿದೆ',
      phoneLabel: 'ದೂರವಾಣಿ',
      locationLabel: 'ಸ್ಥಳ',
      linkedinLabel: 'ಲಿಂಕ್ಡ್‌ಇನ್ ಪ್ರೊಫೈಲ್',
      availabilityNote:
        'ಕ್ಲಿನಿಕಲ್ ಫಾರ್ಮಸಿಸ್ಟ್, ಡ್ರಗ್ ಸೇಫ್ಟಿ ಅಸೋಸಿಯೇಟ್ (PV), ಕ್ಲಿನಿಕಲ್ ರಿಸರ್ಚ್ ಅಸೋಸಿಯೇಟ್ ಮತ್ತು ರೆಗ್ಯುಲೇಟರಿ ಅಫೇರ್ಸ್ ಹುದ್ದೆಗಳಿಗೆ ಲಭ್ಯ.',
      formTitle: 'ನೇಮಕಾತಿ ಮತ್ತು ಸಹಯೋಗ ವಿಚಾರಣೆ',
      nameLabel: 'ನಿಮ್ಮ ಹೆಸರು',
      namePlaceholder: 'ಉದಾ., ಪ್ರಿಯಾ ನಾಯರ್',
      orgLabel: 'ಸಂಸ್ಥೆ / ಆಸ್ಪತ್ರೆ / CRO',
      orgPlaceholder: 'ಉದಾ., ನಾರಾಯಣ ಹೆಲ್ತ್, ಸಿನಿಯೋಸ್ ಹೆಲ್ತ್',
      emailLabel: 'ಕೆಲಸದ ಇಮೇಲ್',
      emailPlaceholder: 'name@organization.com',
      focusLabel: 'ಹುದ್ದೆ ಅಥವಾ ವಿಚಾರಣೆಯ ವಿಷಯ',
      focusOptions: [
        'ಫಾರ್ಮಕೋವಿಜಿಲೆನ್ಸ್ ಮತ್ತು ಔಷಧ ಸುರಕ್ಷತೆ',
        'ಕ್ಲಿನಿಕಲ್ ಫಾರ್ಮಸಿ ಅಭ್ಯಾಸ',
        'ಕ್ಲಿನಿಕಲ್ ಸಂಶೋಧನೆ / CRO',
        'ನಿಯಂತ್ರಣ ವ್ಯವಹಾರಗಳು ಮತ್ತು QA/QC',
        'ಸಂಶೋಧನಾ ಸಹಯೋಗ / ವೈದ್ಯಕೀಯ ಬರವಣಿಗೆ',
      ],
      messageLabel: 'ಸಂದೇಶ',
      messagePlaceholder: 'ಹುದ್ದೆಯ ವಿವರಗಳು ಅಥವಾ ಸಂದರ್ಶನದ ಸಮಯವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ...',
      submitButton: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
      submittingButton: 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
      successTitle: 'ವಿಚಾರಣೆ ದಾಖಲಾಗಿದೆ',
      successBody: 'ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಡಾ. ನವನೀತ್ ಕೃಷ್ಣ ಬಿ ಅವರ ಇನ್‌ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ.',
      sendAnother: 'ಮತ್ತೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ',
      validationError: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು, ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸ ಮತ್ತು ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ.',
    },
    footer: {
      rights: 'ಡಾ. ನವನೀತ್ ಕೃಷ್ಣ ಬಿ · ಫಾರ್ಮ್.ಡಿ (ಪೋಸ್ಟ್-ಬ್ಯಾಕಲೌರಿಯೇಟ್), ಬಿ.ಫಾರ್ಮ್ · ಮಂಗಳೂರು, ಭಾರತ',
      manageCms: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೋ CMS ನಿರ್ವಹಿಸಿ',
      downloadOnePagePdf: '1-ಪುಟದ ರೆಸ್ಯೂಮ್ (PDF)',
      downloadPdf: '4-ಪುಟಗಳ CV (PDF)',
      printSheet: 'CV ಮುದ್ರಿಸಿ',
    },
    cms: {
      title: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೋ CMS ಮತ್ತು ಇನ್‌ಬಾಕ್ಸ್',
      subtitle: 'ಮಾಹಿತಿಯನ್ನು ನೇರವಾಗಿ ಸಂಪಾದಿಸಿ, JSON ರಫ್ತು ಮಾಡಿ ಅಥವಾ ನೇಮಕಾತಿ ಸಂದೇಶಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
      close: 'ಮುಚ್ಚಿ',
      saveChanges: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
      saving: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
      savedSuccess: 'ಸರ್ವರ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ',
      exportJson: 'CMS JSON ರಫ್ತು ಮಾಡಿ',
      resetDefaults: 'ಮೂಲ CV ಗೆ ಮರುಹೊಂದಿಸಿ',
      tabs: {
        profile: 'ಪ್ರೊಫೈಲ್ ಮತ್ತು ಅಂಕಿಅಂಶಗಳು',
        experiences: 'ಅನುಭವಗಳು',
        publications: 'ಪ್ರಕಟಣೆಗಳು',
        conferences: 'ಸಮ್ಮೇಳನಗಳು',
        projects: 'ಯೋಜನೆಗಳು',
        credentials: 'ಕೌಶಲ್ಯ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರಗಳು',
        inbox: 'ನೇಮಕಾತಿ ಇನ್‌ಬಾಕ್ಸ್',
      },
    },
  },
  hi: {
    nav: {
      experience: 'अनुभव',
      research: 'अनुसंधान',
      publications: 'प्रकाशन',
      credentials: 'योग्यताएं',
      contact: 'संपर्क',
      downloadCv: 'CV डाउनलोड',
    },
    hero: {
      contactMe: 'संपर्क एवं भर्ती',
      printCv: 'CV प्रिंट करें',
      downloadOnePagePdf: '1-पृष्ठ रेज़्यूमे (PDF)',
      downloadOriginalPdf: '4-पृष्ठ पूर्ण CV (PDF)',
      editCms: 'पोर्टफोलियो CMS संपादित करें',
      languageLabel: 'भाषा',
      portraitCaption: 'डॉ. नवनीत कृष्ण बी · फार्म.डी (PB), बी.फार्म',
    },
    metrics: {
      articlesLabel: 'प्रकाशित शोध कार्य',
      articlesContext: '12 शोध · 5 रिव्यू · 3 केस सीरीज़ · 2 केस रिपोर्ट · 2 सिस्टेमैटिक रिव्यू',
      citationsLabel: 'शैक्षणिक उद्धरण (Citations)',
      citationsContext: 'इंडेक्स्ड शोध प्रभाव',
      hIndexLabel: 'H-इंडेक्स',
      hIndexContext: 'अनुसंधान उद्धरण स्तर',
      pharmdLabel: 'फार्म.डी (PB) प्रतिशत',
      pharmdContext: 'श्रीनिवास कॉलेज ऑफ फार्मेसी (2024–2026)',
    },
    timeline: {
      eyebrow: 'नैदानिक एवं शैक्षणिक यात्रा',
      heading: 'अनुभव एवं शिक्षा',
      subheading:
        'अस्पताल फार्मेसी अभ्यास, फार्माकोविजिलेंस, संपादकीय शोध प्रशिक्षण और GLP विश्लेषणात्मक गुणवत्ता प्रणालियाँ।',
      filters: {
        all: 'सभी चरण',
        clinical: 'क्लिनिकल फार्मेसी',
        research: 'अनुसंधान प्रशिक्षण',
        industrial: 'औद्योगिक QA/QC',
        education: 'शिक्षा',
      },
      educationHeading: 'शैक्षणिक योग्यताएं',
      experienceHeading: 'व्यावसायिक अनुभव',
      presentLabel: 'वर्तमान',
    },
    research: {
      eyebrow: 'वैज्ञानिक अध्ययन एवं सम्मान',
      heading: 'अनुसंधान परियोजनाएं एवं सम्मेलन',
      subheading:
        'रेट्रोस्पेक्टिव अस्पताल परिणाम विश्लेषण, फाइटोकेमिकल एंटीबैक्टीरियल परीक्षण और राष्ट्रीय/अंतरराष्ट्रीय वैज्ञानिक प्रस्तुतियाँ।',
      projectsHeading: 'प्रमुख शैक्षणिक अनुसंधान परियोजनाएं',
      conferencesHeading: 'सम्मेलन प्रस्तुतियाँ एवं पुरस्कार',
      toolsLabel: 'पद्धति एवं उपकरण',
    },
    publications: {
      eyebrow: 'पीयर-रिव्यूड वैज्ञानिक साहित्य',
      heading: 'अनुसंधान एवं प्रकाशन',
      subheading:
        'क्लिनिकल फार्माकोथेरेपी, दुर्लभ सिंड्रोम, औषधीय रसायन विज्ञान और हर्बल फॉर्मूलेशन पर 8 पीयर-रिव्यूड लेख और प्रोटोकॉल।',
      searchPlaceholder: 'शीर्षक, जर्नल या विषय द्वारा खोजें...',
      allCategories: 'सभी प्रकाशन',
      copyCitation: 'उद्धरण कॉपी करें',
      copied: 'कॉपी किया गया',
      emptyState: 'वर्तमान फ़िल्टर से कोई प्रकाशन मेल नहीं खाता।',
    },
    credentials: {
      eyebrow: 'दक्षताएं एवं नियामक अनुपालन',
      heading: 'कौशल, प्रमाणपत्र एवं पंजीकरण',
      subheading:
        'रोगी औषधि सुरक्षा, सांख्यिकीय विश्लेषण (SPSS, R, Excel), ICH/GMP/GCP ढांचे और AI-सक्षम अनुसंधान में दक्षता।',
      skillsHeading: 'मुख्य एवं तकनीकी कौशल',
      radarHeading: 'दक्षता स्तर मैट्रिक्स',
      radarSubheading:
        'अस्पताल क्लिनिकल रोटेशन, LSSSDC/NIDA/IMWA प्रमाणपत्र, नियामक SOP अनुभव और पीयर-रिव्यूड प्रकाशनों के आधार पर मूल्यांकित।',
      radarScaleNote: 'स्केल 1–5 · 1 आधारभूत · 3 दक्ष · 5 व्यावहारिक क्लिनिकल एवं शोध अभ्यास',
      radarEvidenceLabel: 'सत्यापित CV प्रमाण',
      certificationsHeading: 'सत्यापित प्रमाणपत्र',
      membershipHeading: 'व्यावसायिक पंजीकरण',
      languagesHeading: 'भाषा ज्ञान',
    },
    contact: {
      eyebrow: 'भर्ती एवं सहयोग',
      heading: 'संपर्क करें',
      subheading:
        'क्लिनिकल फार्मेसी, फार्माकोविजिलेंस, क्लिनिकल रिसर्च (CRO), रेगुलेटरी अफेयर्स और क्वालिटी एश्योरेंस अवसरों के लिए उपलब्ध।',
      directTitle: 'सीधा संपर्क विवरण',
      copyEmail: 'ईमेल कॉपी करें',
      emailCopied: 'ईमेल कॉपी हुआ',
      phoneLabel: 'फ़ोन',
      locationLabel: 'स्थान',
      linkedinLabel: 'लिंक्डइन प्रोफ़ाइल',
      availabilityNote:
        'क्लिनिकल फार्मासिस्ट, ड्रग सेफ्टी एसोसिएट (PV), क्लिनिकल रिसर्च एसोसिएट और रेगुलेटरी अफेयर्स भूमिकाओं के लिए उपलब्ध।',
      formTitle: 'भर्ती एवं सहयोग संदेश',
      nameLabel: 'आपका नाम',
      namePlaceholder: 'जैसे, प्रिया नायर, टैलेंट एक्विजिशन',
      orgLabel: 'संगठन / अस्पताल / CRO',
      orgPlaceholder: 'जैसे, नारायण हेल्थ, सिनियोस हेल्थ',
      emailLabel: 'कार्य ईमेल',
      emailPlaceholder: 'name@organization.com',
      focusLabel: 'भूमिका या पूछताछ विषय',
      focusOptions: [
        'फार्माकोविजिलेंस एवं औषधि सुरक्षा',
        'क्लिनिकल फार्मेसी अभ्यास',
        'क्लिनिकल रिसर्च / CRO',
        'रेगुलेटरी अफेयर्स एवं QA/QC',
        'अनुसंधान सहयोग / मेडिकल राइटिंग',
      ],
      messageLabel: 'संदेश',
      messagePlaceholder: 'भूमिका का विवरण, साक्षात्कार समय या अनुसंधान सहयोग की जानकारी साझा करें...',
      submitButton: 'संदेश भेजें',
      submittingButton: 'भेजा जा रहा है...',
      successTitle: 'संदेश सहेजा गया',
      successBody: 'संपर्क करने के लिए धन्यवाद। आपका संदेश डॉ. नवनीत कृष्ण बी के पोर्टफोलियो इनबॉक्स में सहेज लिया गया है।',
      sendAnother: 'एक और संदेश भेजें',
      validationError: 'कृपया अपना नाम, मान्य ईमेल पता और संदेश दर्ज करें।',
    },
    footer: {
      rights: 'डॉ. नवनीत कृष्ण बी · फार्म.डी (पोस्ट-बैकलॉरिएट), बी.फार्म · मंगलुरु, भारत',
      manageCms: 'पोर्टफोलियो CMS प्रबंधित करें',
      downloadOnePagePdf: '1-पृष्ठ रेज़्यूमे (PDF)',
      downloadPdf: '4-पृष्ठ CV (PDF)',
      printSheet: 'CV प्रिंट करें',
    },
    cms: {
      title: 'पोर्टफोलियो CMS एवं रिक्रूटर इनबॉक्स',
      subtitle: 'संग्रह संपादित करें, Webflow-संगत JSON निर्यात करें या प्राप्त संदेश देखें।',
      close: 'बंद करें',
      saveChanges: 'परिवर्तन सहेजें',
      saving: 'सहेजा जा रहा है...',
      savedSuccess: 'सर्वर पर सहेजा गया',
      exportJson: 'CMS JSON निर्यात करें',
      resetDefaults: 'मूल CV पर रीसेट करें',
      tabs: {
        profile: 'प्रोफ़ाइल और आंकड़े',
        experiences: 'अनुभव',
        publications: 'प्रकाशन',
        conferences: 'सम्मेलन',
        projects: 'परियोजनाएं',
        credentials: 'कौशल और प्रमाणपत्र',
        inbox: 'रिक्रूटर इनबॉक्स',
      },
    },
  },
};
