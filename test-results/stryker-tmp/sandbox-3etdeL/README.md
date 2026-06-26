# NDAFlow AI

Premium AI-powered NDA management demo built with **Next.js 14 (App Router) + Tailwind CSS**.
All data is mocked locally and the "AI" risk engine runs client-side — no backend required.

## Features

- 🔐 Login page (Microsoft Entra / SSO mock)
- 📊 Dashboard with metrics, charts, recent requests, pending approvals, awaiting signature, priority requests, open collaborations
- ➕ New Request page with NDA type picker
- 🧭 7-step Guided Intake wizard with live AI risk scoring
- ⚖️ Legal Review Queue with AI triage suggestions
- 🗃️ Repository (search, filter, export)
- 🏢 Parties management
- 🔀 Auto-assignment & routing Rules
- 📄 NDA Templates library
- ⚙️ Admin settings (org, AI, security, users, notifications, integrations)

## Risk Engine

Local "AI" computes:
- **Risk score** (0–100) from 12 weighted questions + combo amplifiers
- **Risk level**: Low / Medium / High
- **Risk flags** with categories (Strategic, IP, Privacy, Geographic, Data)
- **AI explanation** narrative
- **Recommended template**, **approval workflow**, and **clause set**
- **Mock generated NDA preview**

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll land on the login page; any credentials route to the dashboard.

## Stack

- Next.js 14, React 18
- Tailwind CSS 3 (custom dark navy/indigo theme, glass cards, gradient accents)
- Recharts for charts
- lucide-react for icons
