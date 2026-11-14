import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PORTFOLIO_DATA } from './src/data/initialPortfolio.ts';
import type { InquiryItem, PortfolioData } from './src/types/portfolio.ts';

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(process.cwd(), '.data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readPortfolio(): Promise<PortfolioData> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(PORTFOLIO_FILE, 'utf-8');
    return JSON.parse(raw) as PortfolioData;
  } catch {
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(INITIAL_PORTFOLIO_DATA, null, 2), 'utf-8');
    return INITIAL_PORTFOLIO_DATA;
  }
}

async function writePortfolio(data: PortfolioData): Promise<PortfolioData> {
  await ensureDataDir();
  const updated: PortfolioData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}

async function readInquiries(): Promise<InquiryItem[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw) as InquiryItem[];
  } catch {
    await fs.writeFile(INQUIRIES_FILE, '[]', 'utf-8');
    return [];
  }
}

async function writeInquiries(items: InquiryItem[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // Portfolio CMS endpoints
  app.get('/api/portfolio', async (_req, res) => {
    try {
      const portfolio = await readPortfolio();
      res.json(portfolio);
    } catch (err) {
      console.error('Failed to read portfolio:', err);
      res.status(500).json({ error: 'Unable to load portfolio data.' });
    }
  });

  app.put('/api/portfolio', async (req, res) => {
    try {
      const payload = req.body as PortfolioData;
      if (!payload || !payload.profile || !Array.isArray(payload.publications)) {
        res.status(400).json({ error: 'Invalid portfolio payload.' });
        return;
      }
      const saved = await writePortfolio(payload);
      res.json(saved);
    } catch (err) {
      console.error('Failed to save portfolio:', err);
      res.status(500).json({ error: 'Unable to save portfolio updates.' });
    }
  });

  app.post('/api/portfolio/reset', async (_req, res) => {
    try {
      const reset = await writePortfolio(INITIAL_PORTFOLIO_DATA);
      res.json(reset);
    } catch (err) {
      console.error('Failed to reset portfolio:', err);
      res.status(500).json({ error: 'Unable to reset portfolio.' });
    }
  });

  // Recruiter contact inquiries endpoints
  app.get('/api/inquiries', async (_req, res) => {
    try {
      const inquiries = await readInquiries();
      res.json(inquiries);
    } catch (err) {
      console.error('Failed to read inquiries:', err);
      res.status(500).json({ error: 'Unable to load inquiries.' });
    }
  });

  app.post('/api/inquiries', async (req, res) => {
    try {
      const { name, organization, email, inquiryType, message } = req.body ?? {};
      const cleanName = typeof name === 'string' ? name.trim() : '';
      const cleanEmail = typeof email === 'string' ? email.trim() : '';
      const cleanOrg = typeof organization === 'string' ? organization.trim() : '';
      const cleanType = typeof inquiryType === 'string' ? inquiryType.trim() : 'General Inquiry';
      const cleanMessage = typeof message === 'string' ? message.trim() : '';

      if (!cleanName || !cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || !cleanMessage) {
        res.status(400).json({ error: 'Valid name, email, and message are required.' });
        return;
      }

      const existing = await readInquiries();
      const newItem: InquiryItem = {
        id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: cleanName,
        organization: cleanOrg,
        email: cleanEmail,
        inquiryType: cleanType,
        message: cleanMessage,
        createdAt: new Date().toISOString(),
      };

      const next = [newItem, ...existing];
      await writeInquiries(next);
      res.status(201).json(newItem);
    } catch (err) {
      console.error('Failed to store inquiry:', err);
      res.status(500).json({ error: 'Unable to submit inquiry.' });
    }
  });

  app.delete('/api/inquiries/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const existing = await readInquiries();
      const filtered = existing.filter((item) => item.id !== id);
      await writeInquiries(filtered);
      res.json({ ok: true });
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      res.status(500).json({ error: 'Unable to delete inquiry.' });
    }
  });

  // Static & Vite middleware
  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
