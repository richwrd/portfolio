# 🚀 Portfolio

> Modern portfolio built with Next.js 16, React 19, GSAP animations, and real-time status tracking.

<div align="center">

[![Vibe Coded](https://img.shields.io/badge/100%25-Vibe%20Coded-06B6D4?style=for-the-badge&logo=openai&logoColor=white&labelColor=0D1117)](https://github.com/richwrd/portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

## ✨ Features

-  **GSAP & Three.js** - Advanced animations and 3D effects
- 🎯 **Real-time Status** - Live availability tracking
- � **i18n** - Multi-language support (EN/PT-BR)
- � **Contact Form** - Cloudflare Turnstile integration
- ⚡ **Performance** - Vercel Analytics & Speed Insights

## � Quick Start

```bash
git clone https://github.com/richwrd/portfolio.git
cd portfolio
npm install
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Status API
STATUS_API_SECRET=your_secret

# SMTP (Contact Form)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
SMTP_FROM=your_email
SMTP_TO=recipient_email

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_key
TURNSTILE_SECRET_KEY=your_secret

# Social Links
NEXT_PUBLIC_SOCIAL_GITHUB=https://github.com/username
NEXT_PUBLIC_SOCIAL_LINKEDIN=https://linkedin.com/in/profile
```

## � Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## 🛠️ Tech Stack

**Core:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

**Animation:** GSAP · Three.js · Lenis · Lottie

**Tools:** React Hook Form · Axios · Nodemailer · Vercel Analytics

## 📄 License

MIT License - [Eduardo Richard](https://github.com/richwrd)

---

<div align="center">

**100% Vibe Coded** ✨

</div>
