# Project Handoff — 4ways media

> **Live Website:** [https://reachly-agency-khamid-s-projects.vercel.app](https://reachly-agency-khamid-s-projects.vercel.app)  
> **Secondary Production Alias:** [https://sonic-rowan-g6nwc2r.vercel.app](https://sonic-rowan-g6nwc2r.vercel.app)  
> **GitHub Repository:** [https://github.com/khamidkhl2/reachly-agency](https://github.com/khamidkhl2/reachly-agency)  
> **Local Codebase Path:** `/Users/khamid/.gemini/antigravity/scratch/reachly-agency`  
> **Tech Stack:** React 18, TypeScript, Vite 6, Tailwind CSS, Lucide Icons, Vercel  

---

## 1. Executive Summary & Brand Positioning

**4ways media** is an elite 4-operator embedded growth strike team and direct-response digital architecture studio. The website is inspired by high-end creative studios such as **Off-Menu** ([off-menu.com](https://www.off-menu.com/)), **8020** ([8020.inc](https://8020.inc/)), and **Linear**. 

It completely strips out generic "AI vibe-coded" tropes (no glowing neon green buttons, no icon boxes in floating cards, no rambling buzzwords) in favor of a bespoke editorial aesthetic:
- **Palette:** Rich royal periwinkle blue (`#3643BA`), warm editorial stone/cream (`#FAF9F5`), and matte pitch obsidian (`#0A0A0A`).
- **Positioning:** *"Be unignorable."* — 4 dedicated senior founders who build, write, launch, and scale revenue engines directly with clients without account managers, interns, or agency fluff.

---

## 2. The 4 Founders & Operating Principals

The agency is structured around 4 interconnected disciplines, each led by an operator:

| Operator | Title & Role | Core Focus |
| :--- | :--- | :--- |
| **Umar Insavaliev** | Head of Web Architecture | Sub-second Next.js direct-response sites, conversion funnels, micro-interactions, layout physics. |
| **Khamid Kholmatov** | Head of Pipeline & Outbound | Automated cold email infrastructure, lead scoring, speed-to-lead pipelines, calendar acquisition. |
| **Onur Ahmadov** | Head of SMMA & Distribution | Viral short-form video, founder personal branding, omnichannel organic distribution. |
| **Omar Mammadzade** | Head of Growth & Strategy | Unit economics, pricing strategy, offer repositioning, retention, LTV scaling. |

---

## 3. Bespoke Typography System

The website combines 4 font families loaded via Google Fonts to achieve an editorial luxury studio look:

1. **Display Headlines (`Syne` — 600, 700, 800):**
   - High-impact sculptural geometric grotesque used for primary headlines (*"Be unignorable."*), section titles, and operator names.
2. **Editorial Luxury Serif (`Fraunces` & `Instrument Serif`):**
   - High-contrast variable serif with elegant italic swashes used for pull quotes (*“Why should anyone care?”*), the brand logo accent (`media`), and testimonials.
3. **Architectural Monospace (`JetBrains Mono`):**
   - Precision technical font used for metadata tags (`[ CAPACITY: OCT 2026 ]`), numbering (`[01 // 04]`), and telemetry badges.
4. **Clean Modern UI (`Plus Jakarta Sans`):**
   - High-legibility neutral sans-serif used for body text, form fields, and UI controls.

---

## 4. Key Interactive Components & Sections

### 1. Hero Section (`#home-hero`)
- **Surrealist 3D Floating Elements:** Transparent 3D cumulus clouds, whimsical hot air balloon, and watermelon slice floating on staggered keyframe cycles.
- **Dynamic Mouse Parallax:** Cursor movements across the viewport shift layers with realistic multi-plane depth (`translate3d` and counter-rotation).
- **Dual-Direction Tickers:** Top marquee scrolls partner logos forward; bottom reverse marquee runs tactical value propositions (`✦ 48-HOUR MOBILIZATION ✦ DIRECT FOUNDER SLACK POD...`).
- **Brand Lockup:** Bold `4ways` in *Syne* + `media` in *Fraunces* italic serif.

### 2. Studio Philosophy & Provocative Question (`#philosophy-section`)
- Pitch-black backdrop (`#0A0A0A`) with headline *“Why should anyone care?”*
- 2 Core Discipline cards: *“We find your conversion edge”* and *“We scale your revenue velocity”*.
- Razor-sharp punchline: *“We build the growth engine everyone wants, but few know how to assemble.”*
- **6 Interactive Inflection Rows:** Expandable accordions detailing when to deploy the team (Going to market, category definition, challenging incumbents, revenue leaks, scaling, capital efficiency).

### 3. The 4-Pillar Synchronized Stack (`#engine`)
- Edge-to-edge Swiss Grid cards highlighting the 4 core pillars with smooth hover lift physics (`translateY(-6px)`) and expanding top accent borders.

### 4. Live Telemetry ROI Modeler (`#calculator`)
- Interactive dual sliders for **Monthly Traffic** and **Average Deal Value**.
- Custom-centered circular thumb controls on 6px tracks.
- Dynamic pulse animation on the leaked revenue metrics upon sliding.

### 5. Founder Pod Slack Simulation (`#pod-chat`)
- Realistic UI preview of a client Slack channel with the 4 founders.
- **Live Typing Indicator:** *"David Kross is typing..."* with animated 3-dot bouncing wave.
- **Interactive Emoji Reactions:** Clickable reaction buttons (🔥, 🚀, 👀) with tactile click animations and real-time counter increments.

### 6. Interactive Growth Diagnostic (`#diagnostic`)
- 3-step diagnostic wizard that triages traffic, bottlenecks, and calculates recommended strike configurations.

### 7. Instant Lead Capture Modal & Sticky Telemetry Bar
- Ingestion modal dynamically configured by clicked service.
- Sticky bottom pill bar with capacity indicator (*"2 Spots Remaining"*) that intelligently hides near the footer to prevent overlapping content.

---

## 5. File Structure & Core Code Locations

```
reachly-agency/
├── index.html                   # Fonts (Syne, Fraunces, JetBrains Mono, Plus Jakarta Sans), SEO/OG tags
├── package.json                 # Dependencies: react, react-dom, lucide-react, tailwindcss, vite
├── tailwind.config.js           # Extended fontFamily (display, serif, mono, sans) and colors (periwinkle, cream)
├── vercel.json                  # Vite framework, build command, SPA rewrites (/(.*) -> /index.html)
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── index.css                # Custom keyframes (float, float-slow, marquee, shimmer), typography utilities
│   └── App.tsx                  # Complete single-page application component (~2,280 lines)
└── public/
    └── assets/                  # High-res transparent 3D assets (clouds, balloon, watermelon)
```

---

## 6. How to Run & Deploy

### Run Locally:
```bash
cd /Users/khamid/.gemini/antigravity/scratch/reachly-agency
npm install
npm run dev
# Open http://localhost:3000
```

### Build for Production:
```bash
npm run build
# Runs `tsc && vite build`, outputs to `dist/`
```

### Deploy Updates to Vercel:
```bash
cd /Users/khamid/.gemini/antigravity/scratch/reachly-agency
npx vercel --prod
```
Or trigger a redeploy directly from the [Vercel Dashboard](https://vercel.com/khamid-s-projects/reachly-agency/deployments).
