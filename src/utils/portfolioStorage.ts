import { INITIAL_PORTFOLIO_DATA } from '../data/initialPortfolio';
import { InquiryItem, PortfolioData } from '../types/portfolio';

const CMS_STORAGE_KEY = 'navaneeth_portfolio_cms_v1';
const INQUIRIES_STORAGE_KEY = 'navaneeth_portfolio_inquiries_v1';

async function tryFetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, init);
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function loadPortfolioData(): Promise<PortfolioData> {
  const serverData = await tryFetchJson<PortfolioData>('/api/portfolio');
  if (serverData && serverData.profile) {
    try {
      window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(serverData));
    } catch {
      // ignore storage quota errors
    }
    return serverData;
  }

  try {
    const localRaw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (localRaw) {
      const parsed = JSON.parse(localRaw) as PortfolioData;
      if (parsed && parsed.profile && parsed.profile.onePageCvPdfUrl) {
        return parsed;
      }
    }
  } catch {
    // ignore invalid localStorage data
  }

  return INITIAL_PORTFOLIO_DATA;
}

export async function savePortfolioData(updated: PortfolioData): Promise<PortfolioData> {
  const stamped: PortfolioData = {
    ...updated,
    updatedAt: new Date().toISOString(),
  };

  const serverSaved = await tryFetchJson<PortfolioData>('/api/portfolio', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stamped),
  });

  const finalData = serverSaved && serverSaved.profile ? serverSaved : stamped;
  try {
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(finalData));
  } catch {
    // ignore storage quota errors
  }
  return finalData;
}

export async function resetPortfolioData(): Promise<PortfolioData> {
  const serverReset = await tryFetchJson<PortfolioData>('/api/portfolio/reset', {
    method: 'POST',
  });
  try {
    window.localStorage.removeItem(CMS_STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
  return serverReset && serverReset.profile ? serverReset : INITIAL_PORTFOLIO_DATA;
}

export async function loadInquiries(): Promise<InquiryItem[]> {
  const serverItems = await tryFetchJson<InquiryItem[]>('/api/inquiries');
  if (Array.isArray(serverItems)) {
    return serverItems;
  }
  try {
    const raw = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as InquiryItem[]) : [];
  } catch {
    return [];
  }
}

export async function submitInquiry(payload: {
  name: string;
  organization: string;
  email: string;
  inquiryType: string;
  message: string;
}): Promise<{ item: InquiryItem; savedToServer: boolean }> {
  const serverCreated = await tryFetchJson<InquiryItem>('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (serverCreated && serverCreated.id) {
    return { item: serverCreated, savedToServer: true };
  }

  const localItem: InquiryItem = {
    id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...payload,
    createdAt: new Date().toISOString(),
  };

  try {
    const existingRaw = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
    const existing = existingRaw ? (JSON.parse(existingRaw) as InquiryItem[]) : [];
    window.localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify([localItem, ...existing]));
  } catch {
    // ignore storage errors
  }

  return { item: localItem, savedToServer: false };
}

export async function removeInquiry(id: string): Promise<void> {
  await tryFetchJson<{ ok: boolean }>(`/api/inquiries/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  try {
    const raw = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (raw) {
      const existing = JSON.parse(raw) as InquiryItem[];
      window.localStorage.setItem(
        INQUIRIES_STORAGE_KEY,
        JSON.stringify(existing.filter((item) => item.id !== id))
      );
    }
  } catch {
    // ignore storage errors
  }
}
