<div align="center">

# 🌐 sydcodes — Siddhanta Chandra Portfolio

<p align="center">
  <strong>An interactive, high-performance portfolio crafted with Next.js 16, React 19, Three.js WebGL, and Tailwind CSS v4.</strong>
</p>

<p align="center">
  <a href="https://www.siddhantachandra.com">
    <img src="https://img.shields.io/badge/Live%20Demo-siddhantachandra.com-c23132?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Three.js-WebGL-000000?style=flat-square&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-171717?style=flat-square" alt="Lenis" />
  <img src="https://img.shields.io/badge/Cloudflare-Turnstile-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Turnstile" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features--creative-engineering">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-repository-structure">Structure</a> •
  <a href="#-featured-projects">Projects</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-environment-variables">Environment</a> •
  <a href="#-connect">Connect</a> •
  <a href="#-acknowledgements--credits">Credits</a>
</p>

---

</div>

## 📌 Overview

**`sydcodes`** is the personal portfolio and digital playground of [Siddhanta Chandra](https://www.siddhantachandra.com), a Full-stack Developer based in Kolkata, India.

Built to showcase production-grade web engineering alongside creative frontend interaction, this portfolio blends real-time 3D WebGL rendering, physics-based parallax animations, and seamless serverless backend functionality while maintaining strict accessibility standards and near-instant load speeds.

---

## ✨ Key Features & Creative Engineering

### 🚶 Interactive 3D WebGL Avatar
- **Character Simulation**: Powered by Three.js (`three`) and `GLTFLoader`, loading a custom animated 3D avatar that traverses scenic responsive street backgrounds.
- **Dynamic Interaction Mechanics**: Responds to mouse clicks and keyboard inputs (<kbd>Space</kbd>) with real-time jump and grounded animation transitions managed by a Three.js `AnimationMixer`.
- **Adaptive Viewport Modes**: Scene parameters (camera zoom, movement speed, road elevation) dynamically calibrate across desktop, tablet, and mobile breakpoints with `requestIdleCallback` lazy mounting.

### 🌊 Kinetic Motion & Smooth Scrolling
- **Lenis Smooth Scroll**: Butter-smooth inertial scrolling throughout the experience.
- **Spring-Damped Parallax**: Multi-tier parallax driven by Framer Motion springs (`stiffness`, `damping`, `mass`) that track pointer coordinates and scroll velocity in real-time.
- **Horizontal & Compact Scrollers**: Responsive card containers that gracefully switch between smooth horizontal track layouts on widescreen and ergonomic compact stacks on mobile.

### 🛡️ Secure Contact Pipeline
- **Turnstile Bot Mitigation**: Protected by `@marsidev/react-turnstile` with server-side validation against Cloudflare's siteverify endpoint.
- **Serverless Dispatch**: Built on Next.js Route Handlers (`/api/contact`) sending HTML/text inquiries via **Nodemailer** over authenticated SMTP.

### ♿ Accessibility & Modern Web Standards
- **Motion Preference Awareness**: Comprehensive `useReducedMotion` hooks turn off resource-intensive animations and 3D parallax for users with motion sensitivity.
- **Rich Semantic SEO**: Fully populated `OpenGraph` tags, dynamic `viewport` configuration, and Schema.org structured data (`Person` and `WebSite` JSON-LD graphs).

---

## 🛠 Tech Stack

| Domain | Technologies |
|---|---|
| **Core & Framework** | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Creative Coding & 3D** | [Three.js](https://threejs.org/) (WebGL, GLTFLoader, AnimationMixer, Directional & Ambient Lighting) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/), PostCSS, Google Fonts ([Inter](https://fonts.google.com/specimen/Inter) & [Oswald](https://fonts.google.com/specimen/Oswald)) |
| **Animation & Physics** | [Framer Motion 12](https://motion.dev/), [Lenis](https://lenis.darkroom.engineering/) (Smooth Inertial Scrolling) |
| **Iconography** | [Phosphor Icons](https://phosphoricons.com/) (`@phosphor-icons/react`) |
| **Security & Email** | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (`@marsidev/react-turnstile`), [Nodemailer](https://nodemailer.com/) |
| **Quality & Linting** | [ESLint 9](https://eslint.org/), Next.js ESLint Config |

---

## 📂 Repository Structure

```text
sydcodes/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js           # Turnstile verification & Nodemailer SMTP route
│   ├── components/
│   │   ├── Contact/
│   │   │   └── ContactForm.js     # Form state, turnstile widget, submission status
│   │   ├── Hero/
│   │   │   ├── DesktopScene.js    # Desktop road scene graphics
│   │   │   ├── HeroScene.js       # Responsive 3D scene container & viewport switch
│   │   │   ├── HeroText.js        # Typographic hero headlines with parallax
│   │   │   ├── MobileScene.js     # Mobile road scene graphics
│   │   │   └── TabletScene.js     # Tablet road scene graphics
│   │   ├── Navbar/
│   │   │   └── Navbar.js          # Navigation with sticky state & mobile drawer
│   │   ├── CompactScrollItem.js   # Framer Motion scroll-trigger card wrapper
│   │   ├── Scene3d.js             # Three.js scene: GLTF model, camera, lighting, jump physics
│   │   ├── Scene3dDynamic.js      # Dynamic SSR-safe importer for WebGL scene
│   │   ├── ScrollScene.js         # Scroll progress container & context
│   │   └── SmoothScroll.js        # Lenis smooth-scroll provider
│   ├── sections/
│   │   ├── ContactMe.js           # Contact cards, CV download, outreach form
│   │   ├── Experience.js          # Experience timeline & education cards
│   │   ├── Footer.js              # Footer credits & quick navigation
│   │   ├── Hero.js                # Hero section combining 3D character & headlines
│   │   ├── Projects.js            # Showcase projects with media sliders & tech tags
│   │   └── TechnicalExpertise.js  # Categorized technical skills & agentic AI cards
│   ├── globals.css                # Tailwind CSS v4 directives & theme tokens
│   ├── layout.js                  # Root layout, JSON-LD structured data, metadata
│   ├── page.js                    # Landing page composition
│   ├── robots.js                  # Search crawler directives
│   └── sitemap.js                 # Dynamic XML sitemap generator
├── public/
│   ├── 3d_asset/                  # 3D assets (Animated_Me.glb)
│   ├── company-images/            # Experience company brand marks
│   ├── icons-tech/                # Technology badges and SVGs
│   ├── project-image/             # Showcase project screenshots (WebP)
│   ├── scene/                     # Desktop, tablet, and mobile road background assets
│   └── SiddhantaChandra_CV.pdf    # Downloadable curriculum vitae
├── next.config.mjs                # Next.js build & image optimization configuration
├── package.json                   # Project scripts and dependencies
└── postcss.config.mjs             # PostCSS Tailwind v4 pipeline
```

---

## 🚀 Featured Projects

A preview of the featured works showcased within this portfolio:

<table>
  <thead>
    <tr>
      <th width="28%">Project</th>
      <th width="42%">Highlights</th>
      <th width="30%">Stack</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>Slaysuki TCG</strong><br />
        <em>E-commerce Marketplace</em><br />
        <a href="https://www.slaysuki.com/">🔗 Live Store</a>
      </td>
      <td>
        • Customer storefront with custom inventory & order CMS<br />
        • Real-time inventory reservation & concurrency order locking<br />
        • Razorpay payment gateway & Shiprocket shipping pipelines<br />
        • Automated test coverage with Jest and Playwright
      </td>
      <td>
        <code>TypeScript</code>, <code>Next.js</code>, <code>NestJS</code>, <code>PostgreSQL</code>, <code>Prisma</code>, <code>Redis</code>, <code>BullMQ</code>, <code>Cloudflare R2</code>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Journalist Portfolio & CMS</strong><br />
        <em>Client Work & Editorial Platform</em><br />
        <a href="https://www.urmichakraborty.com/">🔗 Live Site</a> • 
        <a href="https://github.com/SiddhantaChandra/urmi-portfolio-website">💻 GitHub</a>
      </td>
      <td>
        • Public journalism portfolio and article publishing feed<br />
        • Custom headless CMS powered by BlockNote rich-text editor<br />
        • Cloud-based media storage and asset optimization<br />
        • Secure role-based publisher authentication
      </td>
      <td>
        <code>Next.js</code>, <code>React</code>, <code>NestJS</code>, <code>Supabase</code>, <code>Prisma</code>, <code>Cloudflare R2</code>, <code>BlockNote</code>
      </td>
    </tr>
    <tr>
      <td>
        <strong>ZestQuiz</strong><br />
        <em>AI Learning Platform</em><br />
        <a href="https://zest-quiz.vercel.app/">🔗 Live App</a> • 
        <a href="https://github.com/SiddhantaChandra/ZestQuiz">💻 GitHub</a>
      </td>
      <td>
        • Automated quiz generation using the DeepSeek API<br />
        • Interactive AI chat support with persistent context history<br />
        • Quiz management dashboard with JWT role authorization<br />
        • Performance metrics and user attempt tracking
      </td>
      <td>
        <code>Next.js</code>, <code>NestJS</code>, <code>PostgreSQL</code>, <code>Prisma</code>, <code>DeepSeek API</code>, <code>JWT</code>, <code>Docker</code>
      </td>
    </tr>
  </tbody>
</table>

---

## 💻 Getting Started

Follow the steps below to run this project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **npm**, **pnpm**, or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/SiddhantaChandra/sydcodes.git
cd sydcodes
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local 2>/dev/null || touch .env.local
```

Populate the keys as described in the [Environment Variables](#-environment-variables) section below.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the portfolio.

### 5. Production Build & Linting

```bash
# Run code analysis
npm run lint

# Generate production build
npm run build

# Preview production build locally
npm run start
```

---

## 🔐 Environment Variables

The project uses the following environment variables for security and form dispatch:

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public / Client | Cloudflare Turnstile public site key for bot verification widget |
| `TURNSTILE_SECRET_KEY` | Server-only | Cloudflare Turnstile secret key for server-side token validation |
| `GMAIL_USER` | Server-only | Sender and recipient Gmail account for contact submissions |
| `GMAIL_APP_PASSWORD` | Server-only | Google App Password for authenticated Nodemailer SMTP transport |

> [!TIP]
> If you are testing locally without Cloudflare Turnstile or Gmail SMTP, the contact form endpoint requires valid keys to send real emails, but the frontend UI and 3D scenes will run without restriction.

---

## 🎨 Design System & Visual Identity

The project features a carefully curated dark aesthetic built with modern CSS custom variables:

- **Background**: `#1d1d1d` (Deep Slate Charcoal)
- **Primary Text**: `#e7d5c3` (Warm Cream)
- **Accent Brand Color**: `#c23132` (Crimson Carmine)
- **Secondary Accents**:
  - `#f17c52` (Coral Amber)
  - `#78c9ba` (Sage Mint)
  - `#d8b16a` (Warm Ochre)
- **Typography**: [Oswald](https://fonts.google.com/specimen/Oswald) for bold editorial headings and [Inter](https://fonts.google.com/specimen/Inter) for clean, legible body text.

---

## 🤝 Connect

<div align="center">

**Siddhanta Chandra**  
*Full-stack Developer • Kolkata, India*

<p align="center">
  <a href="https://www.siddhantachandra.com">
    <img src="https://img.shields.io/badge/Portfolio-www.siddhantachandra.com-c23132?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" />
  </a>
  <a href="https://www.linkedin.com/in/siddhantachandra/">
    <img src="https://img.shields.io/badge/LinkedIn-siddhantachandra-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/SiddhantaChandra">
    <img src="https://img.shields.io/badge/GitHub-SiddhantaChandra-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="mailto:iamsiddhanta.10@gmail.com">
    <img src="https://img.shields.io/badge/Email-iamsiddhanta.10%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

</div>

---

## 🙏 Acknowledgements & Credits

- Special thanks to [J-Toastie](https://poly.pizza/u/J-Toastie) for the [3D Character Model](https://poly.pizza/m/b2hbNsaTN0) hosted on [Poly Pizza](https://poly.pizza/).

---

<div align="center">
  <sub>Designed & Developed by <a href="https://www.siddhantachandra.com">Siddhanta Chandra</a>. Built with Next.js 16, Three.js, and Tailwind CSS v4.</sub>
</div>

