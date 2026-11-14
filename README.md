# Dr. Navaneeth Krishna B — Clinical Pharmacy & Research Portfolio

Multilingual (English, Kannada, Hindi) portfolio presenting Dr. Navaneeth Krishna B's PharmD (Post-Baccalaureate) and B.Pharm credentials, clinical pharmacy rotations, pharmacovigilance experience, peer-reviewed publications, Recharts competency radar, downloadable 1-page & 4-page PDF CVs, and built-in CMS editor.

## Hosting on GitHub Pages

This project includes a preconfigured GitHub Actions workflow (`.github/workflows/deploy.yml`) and relative asset paths (`base: './'`) so it runs seamlessly on GitHub Pages—whether hosted at a user domain (`https://<username>.github.io/`) or a project subpath (`https://<username>.github.io/<repo-name>/`).

### Steps to Deploy

1. **Create a GitHub repository** (e.g. `navaneeth-portfolio`).
2. **Push this codebase to the `main` branch**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Open your repository on GitHub and go to **Settings → Pages**.
   - Under **Build and deployment → Source**, select **GitHub Actions**.
4. GitHub Actions will automatically install dependencies, run `npm run build`, and publish the site. Your live URL will appear in **Settings → Pages** and under the **Actions** workflow summary.

> **Static Hosting Behavior**: When hosted statically on GitHub Pages (without a Node backend), CMS edits persist in the visitor's browser `localStorage` (with JSON export available anytime), and the recruiter contact form provides a direct `mailto:` email launch alongside local confirmation.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
